package com.ssafy.youniverse.dto.res;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MovieResDto {
    private Integer movieId;
    private String title;
    private String language;
    private String overView;
    private Double rate;
    private Integer runtime;
    private String movieImage;
    private List<OttResDto> ottResDtos;
    private List<KeywordResDto> keywordResDtos;
    private List<HeartMovieResDto> heartMovieResDtos;
    private List<HateMovieResDto> hateMovieResDtos;
    private List<BestMovieResDto> bestMovieResDtos;
    private List<ReviewResDto> reviewResDtos;
    private List<ActorResDto> actorResDtos;
    private List<GenreResDto> genreResDtos;
    private List<DirectorResDto> directorResDtos;
}
