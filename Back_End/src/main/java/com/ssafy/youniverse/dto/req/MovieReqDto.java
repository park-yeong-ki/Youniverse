package com.ssafy.youniverse.dto.req;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MovieReqDto {
    private Long movieId;
    private String title;
    private String language;
    private String overView;
    private Double rate;
    private Integer runtime;
    private String movieImage;
    private List<Long> ottList; //영화와 관련된 Ott 식별자
    private List<Long> keywordList; //영화와 관련된 Keyword 식별자
    private List<Long> actorList; //영화와 관련된 Actor 식별자
    private List<Long> genreList; //영화와 관련된 Genre 식별자
    private List<Long> directorList; //영화와 관련된 Director 식별자
}
