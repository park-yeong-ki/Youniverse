import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import SearchBox from "./SearchBox";
import SearchUserItemList from "../users/SearchUserItemList";
import Wrapper from "../atoms/Wrapper";
import { FlexCenter, FlexColBetween } from "../../commons/style/SharedStyle";
import { SEARCH_SUCCESS } from "../../commons/constants/String";
import Text from "../atoms/Text";

type User = {
  id: number;
  nickname: string;
  image: string;
  hashtags: string[];
};

const UserSearchForm: React.FC = () => {
  const [searchResults, setSearchResults] = useState<User[]>([]);

  const handleSearch = async (term: string, option: string | null) => {
    try {
      const response = await axios.get(`api 주소/search`, {
        params: {
          term,
          option,
        },
      });
      setSearchResults(response.data.users);
    } catch (error) {
      console.error("검색 실패:", error);
    }
  };
  return (
    <StyledStandardWhiteGhostWrapper
      size="Standard"
      color="WhiteGhost"
      padding="Medium"
    >
      <StyledColBetweenContainer>
        <StyledSearchBoxContainer>
          <SearchBox type="user" onSearch={handleSearch} />
        </StyledSearchBoxContainer>
        <StyledTextContainer>
          <Text size="X-Small" color="Black" fontFamily="YESGothic-Regular">
            {SEARCH_SUCCESS}
          </Text>
        </StyledTextContainer>
        <StyledUserResultContainer>
          <SearchUserItemList users={searchResults} />
          <p>현재는 아무것도 없지만 검색결과가 나올 것이다</p>
        </StyledUserResultContainer>
      </StyledColBetweenContainer>
    </StyledStandardWhiteGhostWrapper>
  );
};

export default UserSearchForm;

const StyledStandardWhiteGhostWrapper = styled(Wrapper)`
  ${FlexCenter}
  height: 800px;
  margin: 0 auto;
`;

const StyledColBetweenContainer = styled.div`
  ${FlexColBetween}
  height: 100%;
`;

const StyledSearchBoxContainer = styled.div`
  height: 10%;
`;

const StyledTextContainer = styled.div``;

const StyledUserResultContainer = styled.div`
  height: 80%;
`;
