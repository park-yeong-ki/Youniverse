package com.ssafy.youniverse.dto.res;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewResDto {
    private Integer reviewId;
    private MemberSimpleResDto memberSimpleResDto;
    private MovieSimpleResDto movieSimpleResDto;
    private String reviewContent;
    private float reviewRate;
}
