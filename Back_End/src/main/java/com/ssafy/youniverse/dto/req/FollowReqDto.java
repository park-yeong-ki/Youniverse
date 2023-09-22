package com.ssafy.youniverse.dto.req;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FollowReqDto {
    private Integer followerId;
    private Integer followingId;
}
