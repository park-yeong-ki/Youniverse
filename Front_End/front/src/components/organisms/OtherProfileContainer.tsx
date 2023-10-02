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

interface ProfileUserInfoProps {
  memberData: UserType | null;
}

const OtherProfileContainer: React.FC<ProfileUserInfoProps> = ({
  memberData,
}) => {
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
      padding="Medium"
    >
      <StyledColBetween>
        <StyledRowBetween>
          <ProfileImage
            size="X-Large"
            src={memberData?.memberImage || "/assets/기본프로필.jpg"}
          ></ProfileImage>
          <BasicUserInfoContainer>
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
              <StyledColBetween>
                <div>
                  <Text
                    size="Large"
                    color="Black"
                    fontFamily="PyeongChang-Bold"
                  >
                    {memberData?.heartMovieResDtos?.length}
                  </Text>
                </div>
                <div>{LIKEIT}</div>
              </StyledColBetween>
              <StyledColBetween>
                <Text size="Large" color="Black" fontFamily="PyeongChang-Bold">
                  {memberData?.followers.length}
                </Text>
                <div>{FOLLOWER}</div>
              </StyledColBetween>
              <StyledColBetween>
                <Text size="Large" color="Black" fontFamily="PyeongChang-Bold">
                  {memberData?.followings.length}
                </Text>
                <div>{FOLLOWING}</div>
              </StyledColBetween>
            </StyledRowBetween>
          </BasicUserInfoContainer>
        </StyledRowBetween>
        <StyledRowBetween>
          <StyledColBetween>
            <UserZodiacSign />
          </StyledColBetween>
          <ProfileReview memberId={memberData?.memberId} />
        </StyledRowBetween>
        <SoulMovieItemList />
      </StyledColBetween>
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

const ProfileImage = styled(Img)`
  width: 35%;
  height: auto;
  margin-right: 2%;
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

const StyledRowBetween = styled.div`
  ${FlexRowBetween}
  width: 100%;
`;

const StyledColBetween = styled.div`
  ${FlexColBetween}
  width:95%;
`;

const BasicUserInfoContainer = styled.div`
  width: 63%;
`;
