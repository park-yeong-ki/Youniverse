package com.ssafy.youniverse.dto.res;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RecommendMovieResDto {
    private Long recommendMovieId;
    private MemberSimpleResDto memberSimpleResDto;
    private MovieSimpleResDto movieSimpleResDto;
}
