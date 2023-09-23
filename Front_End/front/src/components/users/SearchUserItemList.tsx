import React from "react";
import { styled } from "styled-components";
import { SEARCH_USER_RECOMMEND } from "../../commons/constants/String";
import Wrapper from "../atoms/Wrapper";
import Text from "../atoms/Text";
import SearchUserItem from "./SearchUserItem";
import { FlexCenter, FlexColBetween } from "../../commons/style/SharedStyle";

const SearchUserItemList = () => {
  return (
    <StyledStandardWhiteGhostWrapper
      size="Standard"
      color="WhiteGhost"
      padding="Medium"
    >
      <StyledCenter>
        <Text size="Small" color="Black" fontFamily="YESGothic-Regular">
          {SEARCH_USER_RECOMMEND}
        </Text>
        <SearchUserItem />
      </StyledCenter>
    </StyledStandardWhiteGhostWrapper>
  );
};

export default SearchUserItemList;

const StyledStandardWhiteGhostWrapper = styled(Wrapper)`
  ${FlexCenter}
  width: 100%;
  margin: 0 auto;
`;

const StyledCenter = styled.div`
  ${FlexColBetween}
`;
