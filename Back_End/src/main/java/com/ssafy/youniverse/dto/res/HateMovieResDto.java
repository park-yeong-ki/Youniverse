package com.ssafy.youniverse.dto.res;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HateMovieResDto {
    private Integer hateMovieId;
    private MemberSimpleResDto memberSimpleResDto;
    private MovieSimpleResDto movieSimpleResDto;
}
