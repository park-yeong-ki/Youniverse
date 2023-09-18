package com.ssafy.youniverse.mapper;

import com.ssafy.youniverse.dto.req.FollowReqDto;
import com.ssafy.youniverse.dto.res.FollowResDto;
import com.ssafy.youniverse.dto.res.MemberResDto;
import com.ssafy.youniverse.entity.Follow;
import com.ssafy.youniverse.entity.Member;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface FollowMapper {
    default Follow followReqDtoToFollow(FollowReqDto followReqDto){
        if (followReqDto == null) {
            return null;
        }

        Follow follow = new Follow();

        Member follower = new Member();
        follower.setMemberId(followReqDto.getFollowerId());
        follow.setFollower(follower);

        Member following = new Member();
        following.setMemberId(followReqDto.getFollowingId());
        follow.setFollowing(following);

        return follow;
    }

    default FollowResDto followToFollowResDto(Follow follow){
        if (follow == null) {
            return null;
        }

        FollowResDto followResDto = new FollowResDto();
        followResDto.setFollowId(follow.getFollowId());
        followResDto.setFollowerResDto(memberToMemberResDto(follow.getFollower()));
        followResDto.setFollowingResDto(memberToMemberResDto(follow.getFollowing()));

        return followResDto;
    }

    MemberResDto memberToMemberResDto(Member member);

    default List<FollowResDto> followsToFollowResDtos(List<Follow> follows){
        List<FollowResDto> followResDtos = follows.stream()
                .map(follow -> followToFollowResDto(follow))
                .collect(Collectors.toList());

        return followResDtos;
    }
}
