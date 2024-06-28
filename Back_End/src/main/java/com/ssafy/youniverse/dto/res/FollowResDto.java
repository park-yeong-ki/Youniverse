package com.ssafy.youniverse.dto.res;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FollowResDto {
    private Long followId;
    private MemberSimpleResDto followerResDto;
    private MemberSimpleResDto followingResDto;
}
