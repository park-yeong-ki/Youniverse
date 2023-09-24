package com.ssafy.youniverse.mapper;

import com.ssafy.youniverse.dto.req.FollowReqDto;
import com.ssafy.youniverse.dto.res.FollowResDto;
import com.ssafy.youniverse.dto.res.KeywordResDto;
import com.ssafy.youniverse.entity.Follow;
import com.ssafy.youniverse.entity.Keyword;
import com.ssafy.youniverse.entity.KeywordMember;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface FollowMapper extends CustomMapper {
    @Mapping(source = "followReqDto.followerId", target = "follower.memberId")
    @Mapping(source = "followReqDto.followingId", target = "following.memberId")
    Follow followReqDtoToFollow(FollowReqDto followReqDto);

    @Mapping(source = "follow.follower", target = "followerResDto")
    @Mapping(source = "follow.following", target = "followingResDto")
    FollowResDto followToFollowResDto(Follow follow);

    List<FollowResDto> followsToFollowResDtos(List<Follow> follows);
}
