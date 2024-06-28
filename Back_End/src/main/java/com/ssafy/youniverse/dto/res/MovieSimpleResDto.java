package com.ssafy.youniverse.dto.res;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MovieSimpleResDto {
    private Long movieId;
    private String title;
    private String movieImage;
    private List<KeywordResDto> keywordResDtos;
    private Double rate;
    private Integer runtime;
}
