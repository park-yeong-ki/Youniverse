package com.ssafy.youniverse.dto.res;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BestMovieResDto {
    private Integer bestMovieId;
    private MemberSimpleResDto memberSimpleResDto;
    private MovieSimpleResDto movieSimpleResDto;
}
