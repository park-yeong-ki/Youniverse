import React, { useState, useEffect } from "react";
import FollowUserItemList from "../users/FollowUserItemList";
import { FOLLOWER, FOLLOWING } from "../../commons/constants/String";
import { getAllFollows } from "../../apis/FrontendApi";
import styled from "styled-components";
import { FlexRowBetween } from "../../commons/style/SharedStyle";

interface KeywordType {
  keywordId: number;
  keywordName: string;
}

interface FollowerResDto {
  memberId: number;
  nickname: string;
  memberImage: string | null;
  keywordResDtos: KeywordType[];
}

interface FollowingResDto {
  memberId: number;
  nickname: string;
  memberImage: string | null;
  keywordResDtos: KeywordType[];
}

interface FollowType {
  followId: number;
  followerResDto: FollowerResDto;
  followingResDto: FollowingResDto;
}

interface UserFollowContainerProps {
  followStatus: string;
  currentUserId: number;
}

const OtherProfileFollowContainer: React.FC<UserFollowContainerProps> = ({
  followStatus,
  currentUserId,
}) => {
  const [allFollowList, setAllFollowList] = useState<FollowType[]>([]);
  const [followingList, setFollowingList] = useState<FollowingResDto[]>([]);
  const [followerList, setFollowerList] = useState<FollowerResDto[]>([]);

  useEffect(() => {
    getAllFollows()
      .then((response) => {
        console.log("전체 팔로우 현황 조회", response.data);
        setAllFollowList(response.data);
      })
      .catch((err) => {
        console.log("모든 팔로우 정보를 가져오지 못했습니다", err);
      });
  }, []);

  useEffect(() => {
    if (followStatus === FOLLOWER) {
      const list = allFollowList
        .filter((follow) => follow.followingResDto.memberId === currentUserId)
        .map((follow) => follow.followerResDto);

      setFollowerList(list);
    } else if (followStatus === FOLLOWING) {
      const list = allFollowList
        .filter((follow) => follow.followerResDto.memberId === currentUserId)
        .map((follow) => follow.followingResDto);

      setFollowingList(list);
    }
  }, [allFollowList, followStatus, currentUserId]);

  return (
    <StyledUserContainer>
      {followStatus === FOLLOWING && (
        <FollowUserItemList
          users={followingList.map((following) => ({
            id: following.memberId,
            nickname: following.nickname,
            image: following.memberImage || "/assets/DefaultProfile.png",
            hashtags: following.keywordResDtos.map(
              (keyword) => keyword.keywordName
            ),
          }))}
        />
      )}

      {followStatus === FOLLOWER && (
        <FollowUserItemList
          users={followerList.map((follower) => ({
            id: follower.memberId,
            nickname: follower.nickname,
            image: follower.memberImage || "/assets/DefaultProfile.png",
            hashtags: follower.keywordResDtos.map(
              (keyword) => keyword.keywordName
            ),
          }))}
        />
      )}
    </StyledUserContainer>
  );
};

export default OtherProfileFollowContainer;

const StyledUserContainer = styled.div`
  margin-top: 5%;
  ${FlexRowBetween}
`;
