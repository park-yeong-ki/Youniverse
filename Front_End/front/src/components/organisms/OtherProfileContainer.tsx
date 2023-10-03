import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { UserDetailInfoState } from "../../pages/store/State";
import styled from "styled-components";
import {
  SEARCH_USER_PAGE,
  FOLLOW,
  FOLLOWING,
  FOLLOWER,
  LIKEIT,
} from "../../commons/constants/String";
import {
  FlexCenter,
  FlexColBetween,
  FlexRowBetween,
} from "../../commons/style/SharedStyle";
import Wrapper from "../atoms/Wrapper";
import Text from "../atoms/Text";
import Img from "../atoms/Img";
import Btn from "../atoms/Btn";
import ProfileReview from "../review/ProfileReview";
import UserZodiacSign from "../users/UserZodiacSign";
import SoulMovieItemList from "../movies/SoulMovieItemList";
import { UserType } from "../../pages/profile/MyProfilePage";
import ProfileFollowWrap from "../users/ProfileFollowWrap";
import { postFollow, FollowParams, deleteFollow } from "../../apis/FrontendApi";

interface ProfileUserInfoProps {
  memberData: UserType | null;
  selectStatus: string;
  setSelectStatus: React.Dispatch<React.SetStateAction<string>>;
  refreshMemberData: () => void;
}

export type FollowerType = {
  followId: number;
  followerResDto?: {
    memberId: number;
    nickname: string;
    memberImage: string | null;
    keywordResDtos: Array<{
      keywordId: number;
      keywordName: string;
    }>;
  };
  followingResDto?: any; // 나중에 정확하게 정의 필요
};

const OtherProfileContainer: React.FC<ProfileUserInfoProps> = ({
  memberData,
  selectStatus,
  setSelectStatus,
  refreshMemberData,
}) => {
  /** 팔로워 보여주는 변화 확인용 */
  useEffect(() => {
    console.log("팔로워 기준 변경: ", selectStatus);
  }, [selectStatus]);

  const currentUserId = useRecoilValue(UserDetailInfoState).memberId;
  const [followerList, setFollowerList] = useState<FollowerType[]>([]);
  useEffect(() => {
    if (memberData && memberData.followers) {
      setFollowerList(memberData.followers);
    }
  }, [memberData]);

  const getCurrentFollowerFollowId = (): number | undefined => {
    const follower = followerList.find(
      (follower) =>
        follower.followerResDto &&
        follower.followerResDto.memberId === currentUserId
    );
    return follower?.followId;
  };

  const isCurrentUserAFollower = () => {
    return followerList.some(
      (follower) =>
        follower.followerResDto &&
        follower.followerResDto.memberId === currentUserId
    );
  };

  const handleFollowToggle = async () => {
    if (currentUserId !== null && memberData !== null) {
      if (isCurrentUserAFollower()) {
        const followId = getCurrentFollowerFollowId();
        if (!followId) {
          console.error("유효하지 않은 followId");
          return;
        }
        // 이미 팔로우 중이라면 언팔로우 처리
        try {
          const response = await deleteFollow(followId);
          if (response.status === 200) {
            console.log("팔로우 취소 성공:", response.data);
            // followerList에서 현재 사용자 제거
            setFollowerList((prevState) =>
              prevState.filter(
                (follower) =>
                  follower.followerResDto?.memberId !== currentUserId
              )
            );
            refreshMemberData();
          } else {
            console.error("팔로우 취소 실패:", response.statusText);
          }
        } catch (error) {
          console.error("팔로우 취소 API 요청 중 에러 발생", error);
        }
      } else {
        // 팔로우 처리
        const followParams: FollowParams = {
          followerId: currentUserId,
          followingId: memberData.memberId,
        };
        try {
          const response = await postFollow(followParams);
          if (response.status === 200) {
            console.log("팔로우 등록 성공:", response.data);
            // followerList에 현재 사용자 추가
            setFollowerList((prevState) => [
              ...prevState,
              {
                followId: response.data.followId,
                followerResDto: {
                  memberId: currentUserId,
                  nickname: "임시 닉네임", // 임시값, 실제로는 API 응답 또는 다른 곳에서 가져와야 합니다.
                  memberImage: null, // 임시값
                  keywordResDtos: [], // 임시값
                },
              },
            ]);
            refreshMemberData();
          } else {
            console.error("팔로우 데이터 전송 실패:", response.statusText);
          }
        } catch (error) {
          console.error("팔로우 등록 API 요청 중 에러 발생", error);
        }
      }
    }
  };
  if (!memberData) {
    return (
      <StyledStandardWhiteGhostWrapper
        size="Standard"
        color="WhiteGhost"
        padding="Medium"
      >
        <Text size="Large" color="Black" fontFamily="PyeongChang-Light">
          {SEARCH_USER_PAGE}
        </Text>
      </StyledStandardWhiteGhostWrapper>
    );
  }

  return (
    <StyledStandardWhiteGhostWrapper
      size="Standard"
      color="WhiteGhost"
      padding="Narrow"
    >
      <StyledOverallColBetween>
        <StyledFirstRowBetween>
          <ProfileImage className="w-1/3">
            <Img
              size="2X-Large"
              src={memberData?.memberImage || "/assets/기본프로필.jpg"}
            />
          </ProfileImage>
          <div className="w-2/3">
            <StyledRowBetween>
              <UserNameContainer>
                <Text size="Large" color="White" fontFamily="PyeongChang-Bold">
                  {memberData?.nickname}
                </Text>
              </UserNameContainer>
              <UserFollowBtnContainer>
                {currentUserId !== memberData?.memberId && (
                  <Btn
                    size="Small"
                    color={isCurrentUserAFollower() ? "White" : "Black"}
                    onClick={handleFollowToggle} // 이 부분을 수정
                  >
                    {isCurrentUserAFollower() ? FOLLOWING : FOLLOW}
                  </Btn>
                )}
              </UserFollowBtnContainer>
            </StyledRowBetween>
            <StyledSmallWhiteGhostWrapper
              size="Small"
              color="WhiteGhost"
              padding="Narrow"
            >
              {memberData?.introduce}
            </StyledSmallWhiteGhostWrapper>
            <StyledRowBetween>
              <StyledColBetween onClick={() => setSelectStatus(LIKEIT)}>
                <div>
                  <StyledText
                    size="Large"
                    color="Black"
                    fontFamily="PyeongChang-Bold"
                  >
                    {memberData?.heartMovieResDtos?.length}
                  </StyledText>
                </div>
                <div>{LIKEIT}</div>
              </StyledColBetween>
              <StyledColBetween onClick={() => setSelectStatus(FOLLOWER)}>
                <StyledText
                  size="Large"
                  color="Black"
                  fontFamily="PyeongChang-Bold"
                >
                  {memberData?.followers.length}
                </StyledText>
                <div>{FOLLOWER}</div>
              </StyledColBetween>
              <StyledColBetween onClick={() => setSelectStatus(FOLLOWING)}>
                <StyledText
                  size="Large"
                  color="Black"
                  fontFamily="PyeongChang-Bold"
                >
                  {memberData?.followings.length}
                </StyledText>
                <div>{FOLLOWING}</div>
              </StyledColBetween>
            </StyledRowBetween>
          </div>
        </StyledFirstRowBetween>
        <StyledChangableComponent>
          {!selectStatus && (
            <>
              <StyledRowBetween>
                <div className="w-1/3">
                  <UserZodiacSign />
                </div>
                <ProfileReview
                  className="w-2/3"
                  memberId={memberData?.memberId}
                />
              </StyledRowBetween>
              <StyledRowBetween>
                <SoulMovieItemList />
              </StyledRowBetween>
            </>
          )}
          {selectStatus && (
            <ProfileFollowWrap
              memberData={memberData}
              followStatus={selectStatus}
              setFollowStatus={setSelectStatus}
            />
          )}
        </StyledChangableComponent>
      </StyledOverallColBetween>
    </StyledStandardWhiteGhostWrapper>
  );
};
export default OtherProfileContainer;

const StyledStandardWhiteGhostWrapper = styled(Wrapper)`
  ${FlexCenter}
  height: 100%;
  width: 78%;
`;

const StyledSmallWhiteGhostWrapper = styled(Wrapper)`
  ${FlexCenter}
  height: 100%;
  width: 100%;
`;

const ProfileImage = styled.div`
  ${FlexCenter}
  padding-right: 5%;
`;

const UserNameContainer = styled.div`
  height: auto;
  align-items: left;
`;

const UserFollowBtnContainer = styled.div`
  height: auto;
  align-items: center;
  width: 20%;
`;

const StyledFirstRowBetween = styled.div`
  ${FlexRowBetween}
  width: 100%;
  height: 35%;
`;

const StyledChangableComponent = styled.div`
  ${FlexColBetween}
  height: 65%;
`;

const StyledRowBetween = styled.div`
  ${FlexRowBetween}
  width: 100%;
`;
const StyledOverallColBetween = styled.div`
  ${FlexColBetween}
  width:95%;
  height: 100%;
`;

const StyledColBetween = styled.div`
  ${FlexColBetween}
  width:95%;
  height: 100%;
`;

const StyledText = styled(Text)`
  &:hover {
    cursor: pointer;
  }
`;
