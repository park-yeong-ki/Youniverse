import styled from "styled-components";
import OtherProfileContainer from "../../components/organisms/OtherProfileContainer";
import { MainPaddingContainer } from "../../commons/style/layoutStyle";
import UserSearchContainer from "../../components/organisms/UserSearchContainer";
import UserRecommendContainer from "../../components/organisms/UserRecommendContainer";
import {
  FlexRowBetween,
  FlexColBetween,
} from "../../commons/style/SharedStyle";

const OtherUserProfilePage = () => {
  return (
    <MainPaddingContainer>
      <StyledOtherUserProfile>
        <OtherProfileContainer />
        <StyledSearchRecommend>
          <UserSearchContainer />
          <UserRecommendContainer />
        </StyledSearchRecommend>
      </StyledOtherUserProfile>
    </MainPaddingContainer>
  );
};

export default OtherUserProfilePage;

const StyledSearchRecommend = styled.div`
  ${FlexColBetween}
  height: 100%;
  width: 20.5%;
`;

const StyledOtherUserProfile = styled.div`
  ${FlexRowBetween}
  height: 100%;
`;
