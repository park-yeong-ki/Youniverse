package com.ssafy.youniverse.service;

import com.ssafy.youniverse.entity.Movie;
import com.ssafy.youniverse.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public Page<Movie> readMovies(Pageable pageable) {
        return movieRepository.findAll(pageable);
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

        return updatedMovie;
    }

    //영화 삭제
    public void deleteMovie(int movieId) {
        Movie movie = readMovie(movieId);
        movieRepository.delete(movie);
    }

}
