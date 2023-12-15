package com.ssafy.youniverse.service;

import com.ssafy.youniverse.entity.Movie;
import com.ssafy.youniverse.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.Optional;

@Transactional
@Service
@RequiredArgsConstructor
public class MovieService {
    private final MovieRepository movieRepository;
    private final KeywordService keywordService;
    private final OttService ottService;
    private final KeywordMovieService keywordMovieService;
    private final OttMovieService ottMovieService;
    private final ActorMovieService actorMovieService;
    private final ActorService actorService;
    private final GenreMovieService genreMovieService;
    private final GenreService genreService;
    private final DirectorMovieService directorMovieService;
    private final DirectorService directorService;

    //영화 생성
    public Movie createMovie(Movie movie) {
        Movie createdMovie = movieRepository.save(movie);

        createdMovie.getKeywordMovies().stream().forEach(keywordMovie -> {
            keywordMovie.setMovie(createdMovie);
            keywordMovie.setKeyword(keywordService.readKeyword(keywordMovie.getKeyword().getKeywordId()));
            keywordMovieService.createKeywordMovie(keywordMovie);
        });

        createdMovie.getOttMovies().stream().forEach(ottMovie -> {
            ottMovie.setMovie(createdMovie);
            ottMovie.setOtt(ottService.readOtt(ottMovie.getOtt().getOttId()));
            ottMovieService.createOttMovie(ottMovie);
        });

        createdMovie.getActorMovies().stream().forEach(actorMovie -> {
            actorMovie.setMovie(createdMovie);
            actorMovie.setActor(actorService.readActor(actorMovie.getActor().getActorId()));
            actorMovieService.createActorMovie(actorMovie);
        });

        createdMovie.getGenreMovies().stream().forEach(genreMovie -> {
            genreMovie.setMovie(createdMovie);
            genreMovie.setGenre(genreService.readGenre(genreMovie.getGenre().getGenreId()));
            genreMovieService.createGenreMovie(genreMovie);
        });

        createdMovie.getDirectorMovies().stream().forEach(directorMovie -> {
            directorMovie.setMovie(movie);
            directorMovie.setDirector(directorService.readDirector(directorMovie.getDirector().getDirectorId()));
            directorMovieService.createDirectorMovie(directorMovie);
        });

        return createdMovie;
    }

    //영화 조회
    public Movie readMovie(int movieId) {
        Optional<Movie> optionalMovie = movieRepository.findById(movieId);
        if (!optionalMovie.isPresent()) { //영화 존재하지 않는 경우
            throw new RuntimeException("존재하지 않는 영화입니다."); //임시 예외
        }

        return optionalMovie.get();
    }

    //영화 전체 조회
    public Page<Movie> readMovies(Pageable pageable, Integer memberId, String director, String actor, String title, Integer type, Integer ottId) {
//        Page<Movie> moviePage = null;
//        if (memberId != null) {
//            if (ottId == null) {
//                if (type == 1) { //선호도 조사 -> 로그인 회원 키워드와 일치하는 키워드를 가진 영화 목록 추천
//                    moviePage = movieRepository.findAllByMemberKeyword(memberId, pageable);
//                } else if (type == 2) { //로그인 회원 연령, 성별 추천 영화 목록 -> 비슷한 연령과 성별의 회원이 좋아요한 영화 목록 반환
//                    moviePage = movieRepository.findAllByAgeAndGender(memberId, pageable);
//                } else if (type == 3) { //회원의 유튜브 추천 영화 조회
//                    moviePage = movieRepository.findAllByYoutube(memberId, pageable);
//                }
//            } else {
//                moviePage = movieRepository.findAllByOttId(ottId, memberId, pageable);
//            }
//        } else if (StringUtils.hasText(director)) { //감독 기반
//            moviePage = movieRepository.findAllByDirector(director, pageable);
//        } else if (StringUtils.hasText(actor)) { //배우 기반
//            moviePage = movieRepository.findAllByActor(actor, pageable);
//        } else if (StringUtils.hasText(title)) { //제목 기반 완전히 일치하지 않아도 검색
//            moviePage = movieRepository.findAllByTitleContains(title, pageable);
//        } else { //전체 영화
//            moviePage = movieRepository.findAll(pageable);
//        }

//        return moviePage;
        return movieRepository.findAllQueryDsl(pageable, memberId, director, actor, title, type, ottId);
    }

    //영화 수정
    public Movie updateMovie(Movie movie) {
        Movie findMovie = readMovie(movie.getMovieId());
        findMovie.setMovieImage(movie.getMovieImage());
        findMovie.setLanguage(movie.getLanguage());
        findMovie.setOverView(movie.getOverView());
        findMovie.setRate(movie.getRate());
        findMovie.setRuntime(movie.getRuntime());
        findMovie.setTitle(movie.getTitle());

        Movie updatedMovie = movieRepository.save(findMovie);

        updatedMovie.getKeywordMovies().clear();

        updatedMovie.getOttMovies().clear();

        updatedMovie.getActorMovies().clear();

        updatedMovie.getGenreMovies().clear();

        updatedMovie.getDirectorMovies().clear();

        movie.getKeywordMovies().stream().forEach(keywordMovie -> {
            keywordMovie.setMovie(updatedMovie);
            keywordMovie.setKeyword(keywordService.readKeyword(keywordMovie.getKeyword().getKeywordId()));
            updatedMovie.getKeywordMovies().add(keywordMovie);
        });

        movie.getOttMovies().stream().forEach(ottMovie -> {
            ottMovie.setMovie(updatedMovie);
            ottMovie.setOtt(ottService.readOtt(ottMovie.getOtt().getOttId()));
            updatedMovie.getOttMovies().add(ottMovie);
        });

        movie.getActorMovies().stream().forEach(actorMovie -> {
            actorMovie.setMovie(updatedMovie);
            actorMovie.setActor(actorService.readActor(actorMovie.getActor().getActorId()));
            updatedMovie.getActorMovies().add(actorMovie);
        });

        movie.getGenreMovies().stream().forEach(genreMovie -> {
            genreMovie.setMovie(updatedMovie);
            genreMovie.setGenre(genreService.readGenre(genreMovie.getGenre().getGenreId()));
            updatedMovie.getGenreMovies().add(genreMovie);
        });

        movie.getDirectorMovies().stream().forEach(directorMovie -> {
            directorMovie.setMovie(updatedMovie);
            directorMovie.setDirector(directorService.readDirector(directorMovie.getDirector().getDirectorId()));
            updatedMovie.getDirectorMovies().add(directorMovie);
        });

        return updatedMovie;
    }

    //영화 삭제
    public void deleteMovie(int movieId) {
        Movie movie = readMovie(movieId);
        movieRepository.delete(movie);
    }

}
