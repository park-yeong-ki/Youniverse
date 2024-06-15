package com.ssafy.youniverse.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.youniverse.entity.*;
import com.ssafy.youniverse.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.util.StopWatch;

import java.util.*;
import java.util.concurrent.*;
import java.util.stream.IntStream;

@Service
@Slf4j
@RequiredArgsConstructor
public class TmdbService {
    private final TmdbClient tmdbClient;
    private final ObjectMapper objectMapper;
    private final MovieRepository movieRepository;
    private final GenreRepository genreRepository;
    private final ActorRepository actorRepository;
    private final DirectorRepository directorRepository;
    private final KeywordRepository keywordRepository;

    @Value("${tmdb.language}")
    private String lang;

    @Value("${tmdb.imageUrl}")
    private String imageUrl;

    @Value("${tmdb.ott-list}")
    private Set<Integer> ottList;

    /**
     * 인기 영화 순으로 500페이지 조회(1페이지당 20개 영화 목록)
     * 한 페이지에 스레드 한개
     */
    @EventListener(ApplicationReadyEvent.class)
    public void callApi() throws InterruptedException {
        Queue<Movie> movieList = new ConcurrentLinkedQueue<>();
        Set<Genre> genreSet = ConcurrentHashMap.newKeySet();
        Set<Actor> actorSet = ConcurrentHashMap.newKeySet();
        Set<Director> directorSet = ConcurrentHashMap.newKeySet();
        Set<Keyword> keywordSet = ConcurrentHashMap.newKeySet();

        ExecutorService executorService = Executors.newFixedThreadPool(10);

        IntStream.rangeClosed(1, 500).forEach(page -> {
            executorService.submit(() -> {
                try {
                    JsonNode results = objectMapper.readTree(tmdbClient.getPopularMoviesId(lang, page)).path("results");
                    for (JsonNode result : results) {
                        getMovie(result.path("id").asInt(), movieList, genreSet, actorSet, directorSet, keywordSet);
                    }
                    log.info("Success fetching page {}", page);
                } catch (Exception e) {
                    log.error("Error fetching page {}: {}", page, e.getMessage());
                }

            });
        });

        executorService.shutdown();
        executorService.awaitTermination(30, TimeUnit.MINUTES);

        genreRepository.saveAll(genreSet);
        actorRepository.saveAll(actorSet);
        directorRepository.saveAll(directorSet);
        keywordRepository.saveAll(keywordSet);
        movieRepository.saveAll(movieList);
    }

    /**
     * 영화 관련 정보 모두 조회
     * details 영화 정보, 장르
     * keywords 영화 키워드
     * watch providers OTT 정보
     * credits 영화 배우, 감독
     * 각 객체를 페이지 단위로 담아 DB에 저장(하나의 페이지당 하나의 스레드 담당)
     * @param id
     */
    private void getMovie(int id, Queue<Movie> movieList, Set<Genre> genreSet, Set<Actor> actorSet, Set<Director> directorSet, Set<Keyword> keywordSet) {
        try {
            String details = tmdbClient.getDetails(id, lang);
            Movie movie = toMovieEntity(details);
            List<Genre> genres = toGenreEntity(details);

            String credits = tmdbClient.getCredits(id, lang);
            List<Actor> actors = toActorEntity(credits);
            List<Director> directors = toDirectorEntity(credits);

            List<Keyword> keywords = toKeywordEntity(tmdbClient.getKeywords(id));
            Set<Ott> otts = toOttEntity(tmdbClient.getWatchProviders(id));

            addGenreMovie(genres, movie);
            addActorMovie(actors, movie);
            addDirectorMovie(directors, movie);
            addKeywordMovie(keywords, movie);
            addOttMovie(otts, movie);

            movieList.add(movie);
            genreSet.addAll(genres);
            actorSet.addAll(actors);
            directorSet.addAll(directors);
            keywordSet.addAll(keywords);

            log.info("Success fetching movie {}", id);
        } catch (Exception e) {
            log.error("Error fetching movie {}: {}", id, e.getMessage());
        }
    }

    private void addOttMovie(Set<Ott> otts, Movie movie) {
        otts.forEach(ott -> {
            OttMovie ottMovie = new OttMovie();
            ottMovie.setOtt(ott);
            ottMovie.setMovie(movie);
            movie.getOttMovies().add(ottMovie);
        });
    }

    private void addKeywordMovie(List<Keyword> keywords, Movie movie) {
        keywords.forEach(keyword -> {
            KeywordMovie keywordMovie = new KeywordMovie();
            keywordMovie.setKeyword(keyword);
            keywordMovie.setMovie(movie);
            movie.getKeywordMovies().add(keywordMovie);
        });
    }

    private void addDirectorMovie(List<Director> directors, Movie movie) {
        directors.forEach(director -> {
            DirectorMovie directorMovie = new DirectorMovie();
            directorMovie.setDirector(director);
            directorMovie.setMovie(movie);
            movie.getDirectorMovies().add(directorMovie);
        });
    }

    private void addActorMovie(List<Actor> actors, Movie movie) {
        actors.forEach(actor -> {
            ActorMovie actorMovie = new ActorMovie();
            actorMovie.setActor(actor);
            actorMovie.setMovie(movie);
            movie.getActorMovies().add(actorMovie);
        });
    }

    private void addGenreMovie(List<Genre> genres, Movie movie) {
        genres.forEach(genre -> {
            GenreMovie genreMovie = new GenreMovie();
            genreMovie.setGenre(genre);
            genreMovie.setMovie(movie);
            movie.getGenreMovies().add(genreMovie);
        });
    }

    private Movie toMovieEntity(String json) throws JsonProcessingException {
        JsonNode jsonNode = objectMapper.readTree(json);

        Movie movie = new Movie();
        movie.setMovieId(jsonNode.path("id").asInt());

        /**
         * title의 column type은 varchar(200)이므로 문자열의 길이를 최대 200까지만 저장
         */
        String title = jsonNode.path("title").textValue();
        movie.setTitle(title.substring(0, Math.min(title.length(), 200)));

        movie.setLanguage(jsonNode.path("original_language").textValue());
        movie.setOverView(jsonNode.path("overview").textValue());
        movie.setRate(jsonNode.path("vote_average").asDouble() / 2);
        movie.setRuntime(jsonNode.path("runtime").asInt());
        movie.setMovieImage(imageUrl + jsonNode.path("poster_path").textValue());

        return movie;
    }

    private List<Genre> toGenreEntity(String json) throws JsonProcessingException {
        JsonNode genres = objectMapper.readTree(json).path("genres");

        List<Genre> list = new ArrayList<>();
        for (JsonNode node : genres) {
            Genre genre = new Genre();
            genre.setGenreId(node.path("id").asInt());
            genre.setGenreName(node.path("name").textValue());
            list.add(genre);
        }

        return list;
    }

    private List<Keyword> toKeywordEntity(String json) throws JsonProcessingException {
        JsonNode keywords = objectMapper.readTree(json).path("keywords");

        List<Keyword> list = new ArrayList<>();
        for (JsonNode node : keywords) {
            Keyword keyword = new Keyword();
            keyword.setKeywordId(node.path("id").asInt());
            keyword.setKeywordName(node.path("name").textValue());
            list.add(keyword);
        }

        return list;
    }

    /**
     * 총 5개의 OTT만 포함(Netflix(8), Apple TV(2), wavve(356), Disney Plus(337), Watcha(97))
     * @param json
     * @return
     * @throws JsonProcessingException
     */
    private Set<Ott> toOttEntity(String json) throws JsonProcessingException {
        JsonNode KR = objectMapper.readTree(json).path("results").path("KR");

        List<JsonNode> nodeList = new ArrayList<>();
        nodeList.add(KR.path("buy"));
        nodeList.add(KR.path("rent"));
        nodeList.add(KR.path("flatrate"));

        Set<Ott> set = new LinkedHashSet<>();
        for (JsonNode jsonNode : nodeList) {
            for (JsonNode node : jsonNode) {
                if (!ottList.contains(node.path("provider_id").asInt())) {
                    continue;
                }
                Ott ott = new Ott();
                ott.setOttId(node.path("provider_id").asInt());
                ott.setOttName(node.path("provider_name").textValue());
                ott.setOttImage(imageUrl + node.path("logo_path").textValue());
                set.add(ott);
            }
        }

        return set;
    }

    private List<Actor> toActorEntity(String json) throws JsonProcessingException {
        JsonNode cast = objectMapper.readTree(json).path("cast");
        List<Actor> list = new ArrayList<>();
        for (JsonNode node : cast) {
            if (node.path("known_for_department").textValue().equals("Acting")) {
                Actor actor = new Actor();
                actor.setActorId(node.path("id").asInt());
                actor.setActorName(node.path("name").textValue());
                actor.setActorImage(imageUrl + node.path("profile_path").textValue());
                list.add(actor);
                if (list.size() == 5) break;
            }
        }
        return list;
    }

    private List<Director> toDirectorEntity(String json) throws JsonProcessingException {
        JsonNode crew = objectMapper.readTree(json).path("crew");
        List<Director> list = new ArrayList<>();
        for (JsonNode node : crew) {
            if (node.path("job").textValue().equals("Director")) {
                Director director = new Director();
                director.setDirectorId(node.path("id").asInt());
                director.setDirectorName(node.path("name").textValue());
                director.setDirectorImage(imageUrl + node.path("profile_path").textValue());
                list.add(director);
            }
        }
        return list;
    }
}
