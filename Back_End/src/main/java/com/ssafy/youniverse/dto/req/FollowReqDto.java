package com.ssafy.youniverse.dto.req;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FollowReqDto {
    private Long followerId;
    private Long followingId;
}
