package com.ssafy.youniverse.dto;

import com.ssafy.youniverse.entity.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Getter
@Setter
public class MovieInfo {
    private Movie movie;
    private List<Genre> genres;
    private List<Actor> actors;
    private List<Director> directors;
    private List<Keyword> keywords;
    private Set<Ott> otts;
    private List<OttMovieDto> ottMovies;
    private List<KeywordMovieDto> keywordMovies;
    private List<DirectorMovieDto> directorMovies;
    private List<ActorMovieDto> actorMovies;
    private List<GenreMovieDto> genreMovies;
}
