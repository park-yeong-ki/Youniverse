import { useEffect } from "react";
import styled from "styled-components";
import { SEARCH_USER_PAGE } from "../../commons/constants/String";
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
import {
  FOLLOW,
  FOLLOWING,
  FOLLOWER,
  LIKEIT,
} from "../../commons/constants/String";
import ProfileFollowWrap from "../users/ProfileFollowWrap";

interface ProfileUserInfoProps {
  memberData: UserType | null;
  selectStatus: string;
  setSelectStatus: React.Dispatch<React.SetStateAction<string>>;
}

const OtherProfileContainer: React.FC<ProfileUserInfoProps> = ({
  memberData,
  selectStatus,
  setSelectStatus,
}) => {
  /** 팔로워 보여주는 변화 확인용 */
  useEffect(() => {
    console.log("팔로워 기준 변경: ", selectStatus);
  }, [selectStatus]);
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
                <Btn size="Small" color="Black">
                  {FOLLOW}
                </Btn>
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
