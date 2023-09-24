package com.ssafy.youniverse.dto.req;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MovieReqDto {
    private Integer movieId;
    private String title;
    private String language;
    private String overView;
    private Float rate;
    private Integer runtime;
    private String movieImage;
    private List<Integer> ottList; //영화와 관련된 Ott 식별자
    private List<Integer> keywordList; //영화와 관련된 Keyword 식별자
    private List<Integer> actorList; //영화와 관련된 Actor 식별자
    private List<Integer> genreList; //영화와 관련된 Genre 식별자
    private List<Integer> directorList; //영화와 관련된 Director 식별자
}
