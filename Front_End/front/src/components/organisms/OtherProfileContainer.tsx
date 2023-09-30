  import styled from "styled-components";
  //import { SEARCH_USER_PAGE } from "../../commons/constants/String";
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
    return (
      <StyledStandardWhiteGhostWrapper
        size="Standard"
        color="WhiteGhost"
        padding="Medium"
      >
        {/* 유저 클릭 전 안내문구 */}
        {/* <Text size="X-Large" color="Black" fontFamily="PyeongChang-Light">
          {SEARCH_USER_PAGE}
        </Text> */}
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
                    {memberData?.nickname} 유저이름
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
                {memberData?.introduce}유저 자기소개
              </StyledSmallWhiteGhostWrapper>
              <StyledRowBetween>
                <StyledColBetween>
                  <div>
                    <Text
                      size="Large"
                      color="Black"
                      fontFamily="PyeongChang-Bold"
                    >
                      좋아요 수
                    </Text>
                    {memberData?.heartMovieResDtos?.length}
                  </div>
                  <div>{LIKEIT}</div>
                </StyledColBetween>
                <StyledColBetween>
                  <Text size="Large" color="Black" fontFamily="PyeongChang-Bold">
                    {memberData?.followers.length}팔로워 수
                  </Text>
                  <div>{FOLLOWER}</div>
                </StyledColBetween>
                <StyledColBetween>
                  <Text size="Large" color="Black" fontFamily="PyeongChang-Bold">
                    {memberData?.followings.length}팔로잉 수
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
            <ProfileReview />
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
    align-item: left;
  `;

  const UserFollowBtnContainer = styled.div`
    height: auto;
    align-item: center;
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
