package com.ssafy.youniverse.dto.req;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MemberRecommendMovieReqDto {
    private String email;
    private List<Integer> movieIdList;
}
