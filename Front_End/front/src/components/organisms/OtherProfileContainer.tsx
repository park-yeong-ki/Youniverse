import React from "react";
import styled from "styled-components";
import UserRecommendContainer from "./UserRecommendContainer";
import UserSearchContainer from "./UserSearchContainer";
import { SEARCH_USER_PAGE } from "../../commons/constants/String";
import {
  FlexCenter,
  FlexRowBetween,
  FlexColBetween,
} from "../../commons/style/SharedStyle";
import Wrapper from "../atoms/Wrapper";
import Text from "../atoms/Text";

const OtherProfileContainer = () => {
  return (
    <StyledOtherUserProfile>
      <StyledStandardWhiteGhostWrapper
        size="Standard"
        color="WhiteGhost"
        padding="Medium"
      >
        <Text size="X-Large" color="Black" fontFamily="PyeongChang-Light">
          {SEARCH_USER_PAGE}
        </Text>
      </StyledStandardWhiteGhostWrapper>
      <StyledSearchRecommend>
        <UserSearchContainer />
        <UserRecommendContainer />
      </StyledSearchRecommend>
    </StyledOtherUserProfile>
  );
};
export default OtherProfileContainer;

const StyledOtherUserProfile = styled.div`
  ${FlexRowBetween}
  height: 800px;
`;

const StyledStandardWhiteGhostWrapper = styled(Wrapper)`
  ${FlexCenter}
  height: 100%;
  margin: 0 auto;
`;

const StyledSearchRecommend = styled.div`
  ${FlexColBetween}
`;
