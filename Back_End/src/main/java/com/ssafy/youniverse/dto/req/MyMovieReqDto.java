package com.ssafy.youniverse.dto.req;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MyMovieReqDto {
    private Integer memberId;
    private Integer movieId;
    private String reviewContent;
    private float reviewRate;
}
