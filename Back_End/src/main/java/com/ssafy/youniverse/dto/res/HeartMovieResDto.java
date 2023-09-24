package com.ssafy.youniverse.dto.res;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HeartMovieResDto {
    private Integer heartMovieId;
    private MemberSimpleResDto memberSimpleResDto;
    private MovieSimpleResDto movieSimpleResDto;
}
