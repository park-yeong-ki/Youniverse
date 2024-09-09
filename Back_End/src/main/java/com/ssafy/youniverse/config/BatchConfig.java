package com.ssafy.youniverse.config;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.youniverse.dto.*;
import com.ssafy.youniverse.entity.*;
import com.ssafy.youniverse.service.TmdbCallService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.integration.async.AsyncItemProcessor;
import org.springframework.batch.integration.async.AsyncItemWriter;
import org.springframework.batch.item.*;
import org.springframework.batch.item.database.BeanPropertyItemSqlParameterSourceProvider;
import org.springframework.batch.item.database.JdbcBatchItemWriter;
import org.springframework.batch.item.database.builder.JdbcBatchItemWriterBuilder;
import org.springframework.batch.item.support.CompositeItemWriter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.task.TaskExecutor;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;
import java.sql.PreparedStatement;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Future;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class BatchConfig {
    private final JobRepository jobRepository;
    private final PlatformTransactionManager transactionManager;
    private final TmdbCallService callService;
    private final DataSource dataSource;

    @Value("${tmdb.chunkSize}")
    private int chunkSize;

    @Value("${tmdb.startPage}")
    private int startPage;

    @Value("${tmdb.maxPage}")
    private int maxPage;

    @Bean
    public Job tmdbJob() {
        return new JobBuilder("tmdbJob", jobRepository)
                .start(tmdbStep())
                .build();
    }

    @Bean
    public Step tmdbStep() {
        return new StepBuilder("tmdbStep", jobRepository)
                .<List<Integer>, Future<List<MovieInfo>>>chunk(chunkSize, transactionManager)
                .reader(movieIdReader())
                .processor(asyncMovieInfoProcessor())
                .writer(asyncMovieInfoWriter())
                .build();
    }

    @Bean
    public TaskExecutor tmdbTaskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(3);
        executor.setMaxPoolSize(4);
        executor.setThreadNamePrefix("tmdb-task-");
        return executor;
    }

    /**
     * 페이지별 약 20개의 영화 정보를 가져온 후 파싱하는 processor
     */
    @Bean
    public AsyncItemProcessor<List<Integer>, List<MovieInfo>> asyncMovieInfoProcessor() {
        AsyncItemProcessor<List<Integer>, List<MovieInfo>> asyncItemProcessor = new AsyncItemProcessor<>();
        asyncItemProcessor.setDelegate(movieInfoProcessor());
        asyncItemProcessor.setTaskExecutor(tmdbTaskExecutor());
        return asyncItemProcessor;
    }
    @Bean
    public ItemProcessor<List<Integer>, List<MovieInfo>> movieInfoProcessor() {
        return item -> {
            List<MovieInfo> movieInfoList = new ArrayList<>();

            MovieInfoStr str;
            for (int movieId : item) {
                log.info("{} 번 영화 정보 가져오기 시도", movieId);
                str = callService.fetchMovie(movieId);

                MovieInfo movieInfo = new MovieInfo();

                movieInfo.setMovie(callService.toMovieEntity(str.getDetails()));
                movieInfo.setGenres(callService.toGenreEntity(str.getDetails()));
                movieInfo.setActors(callService.toActorEntity(str.getCredits()));
                movieInfo.setDirectors(callService.toDirectorEntity(str.getCredits()));
                movieInfo.setKeywords(callService.toKeywordEntity(str.getKeywords()));
                movieInfo.setOtts(callService.toOttEntity(str.getWatchProviders()));

                movieInfo.setOttMovies(callService.makeOttMovie(movieInfo.getOtts(), movieInfo.getMovie()));
                movieInfo.setKeywordMovies(callService.makeKeywordMovie(movieInfo.getKeywords(), movieInfo.getMovie()));
                movieInfo.setDirectorMovies(callService.makeDirectorMovie(movieInfo.getDirectors(), movieInfo.getMovie()));
                movieInfo.setActorMovies(callService.makeActorMovie(movieInfo.getActors(), movieInfo.getMovie()));
                movieInfo.setGenreMovies(callService.makeGenreMovie(movieInfo.getGenres(), movieInfo.getMovie()));

                movieInfoList.add(movieInfo);
            }

            return movieInfoList;
        };
    }
/*
    @Bean
    public AsyncItemWriter<List<MovieInfo>> asyncMovieInfoPrintWriter() {
        AsyncItemWriter<List<MovieInfo>> asyncItemWriter = new AsyncItemWriter<>();
        asyncItemWriter.setDelegate(movieInfoPrintWriter());
        return asyncItemWriter;
    }
    @Bean
    public ItemWriter<List<MovieInfo>> movieInfoPrintWriter() {
        return items -> {
            for (List<MovieInfo> item : items) {
                for (MovieInfo movieInfo : item) {
                    log.info("영화 정보: {}", movieInfo.getMovie());
                    log.info("영화 배우: {}", movieInfo.getActors());
                    log.info("영화 감독: {}", movieInfo.getDirectors());
                    log.info("영화 OTT: {}", movieInfo.getOtts());
                    log.info("영화 장르: {}", movieInfo.getGenres());
                    log.info("영화 키워드: {}", movieInfo.getKeywords());
                }
            }
        };
    }*/

    /**
     * chunkSize 크기만큼의 페이지안에 담긴 영화 정보 저장
     * 페이지당 영화 개수: 20개
     *
     * @return
     */
    @Bean
    public AsyncItemWriter<List<MovieInfo>> asyncMovieInfoWriter() {
        AsyncItemWriter<List<MovieInfo>> asyncItemWriter = new AsyncItemWriter<>();
        asyncItemWriter.setDelegate(compositeItemWriter());
        return asyncItemWriter;
    }

    /**
     * 장르, 배우, 감독, 키워드 중복 제거 하면 ignore into 대신 on duplicate key update 사용하기
     * @return
     */
    @Bean
    public CompositeItemWriter compositeItemWriter() {
        List<ItemWriter> writers = new ArrayList<>();
        writers.add(movieJdbcBatchItemWriter());
        writers.add(genreJdbcBatchItemWriter());
        writers.add(actorJdbcBatchItemWriter());
        writers.add(directorJdbcBatchItemWriter());
        writers.add(keywordJdbcBatchItemWriter());
        writers.add(genreMovieJdbcBatchItemWriter());
        writers.add(actorMovieJdbcBatchItemWriter());
        writers.add(directorMovieJdbcBatchItemWriter());
        writers.add(keywordMovieJdbcBatchItemWriter());
        writers.add(ottMovieJdbcBatchItemWriter());

        CompositeItemWriter itemWriter = new CompositeItemWriter<>();
        itemWriter.setDelegates(writers);
        return itemWriter;
    }

    private JdbcBatchItemWriter<List<MovieInfo>> movieJdbcBatchItemWriter() {
        return new JdbcBatchItemWriterBuilder<List<MovieInfo>>()
                .dataSource(dataSource)
                .sql("INSERT INTO movie (movie_id, rate, runtime, language, title, movie_image, over_view, created_date, last_modified_date) " +
                        "VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())" +
                        "ON DUPLICATE KEY UPDATE " +
                        "rate = VALUES(rate), " +
                        "runtime = VALUES(runtime), " +
                        "language = VALUES(language), " +
                        "title = VALUES(title), " +
                        "movie_image = VALUES(movie_image), " +
                        "over_view = VALUES(over_view), " +
                        "last_modified_date = NOW()")
                .itemPreparedStatementSetter((item, ps) -> {
                    for (MovieInfo movieInfo : item) {
                        ps.setLong(1, movieInfo.getMovie().getMovieId());
                        ps.setDouble(2, movieInfo.getMovie().getRate());
                        ps.setInt(3, movieInfo.getMovie().getRuntime());
                        ps.setString(4, movieInfo.getMovie().getLanguage());
                        ps.setString(5, movieInfo.getMovie().getTitle());
                        ps.setString(6, movieInfo.getMovie().getMovieImage());
                        ps.setString(7, movieInfo.getMovie().getOverView());
                        ps.addBatch();
                    }
                })
                .build();
    }

    private JdbcBatchItemWriter<List<MovieInfo>> genreJdbcBatchItemWriter() {
        return new JdbcBatchItemWriterBuilder<List<MovieInfo>>()
                .dataSource(dataSource)
                .sql("INSERT IGNORE INTO genre (genre_id, genre_name) " +
                        "VALUES (?, ?)")
                .itemPreparedStatementSetter(((item, ps) -> {
                    for (MovieInfo movieInfo : item) {
                        for (Genre genre : movieInfo.getGenres()) {
                            ps.setLong(1, genre.getGenreId());
                            ps.setString(2, genre.getGenreName());
                            ps.addBatch();
                        }
                    }
                }))
                .assertUpdates(false)
                .build();
    }

    private JdbcBatchItemWriter<List<MovieInfo>> actorJdbcBatchItemWriter() {
        return new JdbcBatchItemWriterBuilder<List<MovieInfo>>()
                .dataSource(dataSource)
                .sql("INSERT IGNORE INTO actor (actor_id, actor_name, actor_image) " +
                        "VALUES (?, ?, ?)")
                .itemPreparedStatementSetter(((item, ps) -> {
                    for (MovieInfo movieInfo : item) {
                        for (Actor actor : movieInfo.getActors()) {
                            ps.setLong(1, actor.getActorId());
                            ps.setString(2, actor.getActorName());
                            ps.setString(3, actor.getActorImage());
                            ps.addBatch();
                        }
                    }
                }))
                .assertUpdates(false)
                .build();
    }

    private JdbcBatchItemWriter<List<MovieInfo>> directorJdbcBatchItemWriter() {
        return new JdbcBatchItemWriterBuilder<List<MovieInfo>>()
                .dataSource(dataSource)
                .sql("INSERT IGNORE INTO director (director_id, director_name, director_image) " +
                        "VALUES (?, ?, ?)")
                .itemPreparedStatementSetter(((item, ps) -> {
                    for (MovieInfo movieInfo : item) {
                        for (Director director : movieInfo.getDirectors()) {
                            ps.setLong(1, director.getDirectorId());
                            ps.setString(2, director.getDirectorName());
                            ps.setString(3, director.getDirectorImage());
                            ps.addBatch();
                        }
                    }
                }))
                .assertUpdates(false)
                .build();
    }

    private JdbcBatchItemWriter<List<MovieInfo>> keywordJdbcBatchItemWriter() {
        return new JdbcBatchItemWriterBuilder<List<MovieInfo>>()
                .dataSource(dataSource)
                .sql("INSERT IGNORE INTO keyword (keyword_id, keyword_name) " +
                                "VALUES (?, ?)")
                .itemPreparedStatementSetter((item, ps) -> {
                    for (MovieInfo movieInfo : item) {
                        for (Keyword keyword : movieInfo.getKeywords()) {
                            ps.setLong(1, keyword.getKeywordId());
                            ps.setString(2, keyword.getKeywordName());
                            ps.addBatch();
                        }
                    }
                })
                .assertUpdates(false)
                .build();
    }

    private JdbcBatchItemWriter<List<MovieInfo>> genreMovieJdbcBatchItemWriter() {
        return new JdbcBatchItemWriterBuilder<List<MovieInfo>>()
                .dataSource(dataSource)
                .sql("INSERT IGNORE INTO genre_movie (genre_id, movie_id) " +
                        "VALUES (?, ?)")
                .itemPreparedStatementSetter((item, ps) -> {
                    for (MovieInfo movieInfo : item) {
                        for (GenreMovieDto genreMovieDto : movieInfo.getGenreMovies()) {
                            ps.setLong(1, genreMovieDto.getGenreId());
                            ps.setLong(2, genreMovieDto.getMovieId());
                            ps.addBatch();
                        }
                    }
                })
                .assertUpdates(false)
                .build();
    }

    private JdbcBatchItemWriter<List<MovieInfo>> actorMovieJdbcBatchItemWriter() {
        return new JdbcBatchItemWriterBuilder<List<MovieInfo>>()
                .dataSource(dataSource)
                .sql("INSERT IGNORE INTO actor_movie (actor_id, movie_id) " +
                        "VALUES (?, ?)")
                .itemPreparedStatementSetter((item, ps) -> {
                    for (MovieInfo movieInfo : item) {
                        for (ActorMovieDto actorMovieDto : movieInfo.getActorMovies()) {
                            ps.setLong(1, actorMovieDto.getActorId());
                            ps.setLong(2, actorMovieDto.getMovieId());
                            ps.addBatch();
                        }
                    }
                })
                .assertUpdates(false)
                .build();
    }

    private JdbcBatchItemWriter<List<MovieInfo>> directorMovieJdbcBatchItemWriter() {
        return new JdbcBatchItemWriterBuilder<List<MovieInfo>>()
                .dataSource(dataSource)
                .sql("INSERT IGNORE INTO director_movie (director_id, movie_id) " +
                        "VALUES (?, ?)")
                .itemPreparedStatementSetter((item, ps) -> {
                    for (MovieInfo movieInfo : item) {
                        for (DirectorMovieDto directorMovieDto : movieInfo.getDirectorMovies()) {
                            ps.setLong(1, directorMovieDto.getDirectorId());
                            ps.setLong(2, directorMovieDto.getMovieId());
                            ps.addBatch();
                        }
                    }
                })
                .assertUpdates(false)
                .build();
    }

    private JdbcBatchItemWriter<List<MovieInfo>> keywordMovieJdbcBatchItemWriter() {
        return new JdbcBatchItemWriterBuilder<List<MovieInfo>>()
                .dataSource(dataSource)
                .sql("INSERT IGNORE INTO keyword_movie (keyword_id, movie_id) " +
                        "VALUES (?, ?)")
                .itemPreparedStatementSetter((item, ps) -> {
                    for (MovieInfo movieInfo : item) {
                        for (KeywordMovieDto keywordMovieDto : movieInfo.getKeywordMovies()) {
                            ps.setLong(1, keywordMovieDto.getKeywordId());
                            ps.setLong(2, keywordMovieDto.getMovieId());
                            ps.addBatch();
                        }
                    }
                })
                .assertUpdates(false)
                .build();
    }

    private JdbcBatchItemWriter<List<MovieInfo>> ottMovieJdbcBatchItemWriter() {
        return new JdbcBatchItemWriterBuilder<List<MovieInfo>>()
                .dataSource(dataSource)
                .sql("INSERT IGNORE INTO ott_movie (ott_id, movie_id) " +
                        "VALUES (?, ?)")
                .itemPreparedStatementSetter((item, ps) -> {
                    for (MovieInfo movieInfo : item) {
                        for (OttMovieDto ottMovieDto : movieInfo.getOttMovies()) {
                            ps.setLong(1, ottMovieDto.getOttId());
                            ps.setLong(2, ottMovieDto.getMovieId());
                            ps.addBatch();
                        }
                    }
                })
                .assertUpdates(false)
                .build();
    }

    /**
     * 페이지당 20개씩 영화 목록의 정보 읽기
     * @return List<MovieInfo>
     */
    @Bean
    @StepScope
    public ItemReader<List<Integer>> movieIdReader() {
        return new ItemReader<>() {
            private int currentPage = startPage;

            @Override
            public List<Integer> read() throws UnexpectedInputException, ParseException, NonTransientResourceException, JsonProcessingException {
                if (currentPage > maxPage) {
                    return null;
                }

                log.info("{} 페이지에서 영화 아이디 목록 가져오기 시도", currentPage);
                List<Integer> list = callService.fetchPage(currentPage);

                currentPage++;
                return list;
            }
        };
    }
}
