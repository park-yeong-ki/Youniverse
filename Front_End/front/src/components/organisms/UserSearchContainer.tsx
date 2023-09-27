import React, { useState } from "react";
import styled from "styled-components";
import SearchBox from "./SearchBox";
import SearchUserItemList from "../users/SearchUserItemList";
import Wrapper from "../atoms/Wrapper";
import { FlexCenter, FlexColBetween } from "../../commons/style/SharedStyle";
import { SEARCH_SUCCESS, SEARCH_NOTHING } from "../../commons/constants/String";
import Text from "../atoms/Text";
import { getAllMembers, UserSearchParams } from "../../apis/FrontendApi";

export type User = {
  memberId: number;
  nickname: string;
  memberImage: string;
  keywordResDtos: keywords[];
};

export type keywords = {
  keywordId: number;
  keywordName: string;
  source: string;
};

const UserSearchContainer: React.FC = () => {
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = async (
    term: string,
    option: string | null,
    page: number = 0,
    size: number = 15
  ) => {
    setSearchTerm(term);

    let params: UserSearchParams = {
      term,
      option,
      page,
      size,
    };

    // 옵션에 따른 처리
    switch (option) {
      case "keyword":
        params = { ...params, keyword: term };
        break;
      case "nickname":
        params = { ...params, nickname: term };
        break;
      default:
        params.option = "total";
        params = { ...params, total: term };
        break;
    }

    try {
      const response = await getAllMembers(params);
      setSearchResults(response.data.content);
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
          <Text size="X-Small" color="White" fontFamily="YESGothic-Regular">
            {searchTerm.length === 0
              ? ""
              : searchResults.length === 0
              ? SEARCH_NOTHING
              : `${searchResults.length}${SEARCH_SUCCESS}`}
          </Text>
        </StyledTextContainer>
        <StyledUserResultContainer>
          <SearchUserItemList users={searchResults} />
        </StyledUserResultContainer>
      </StyledColBetweenContainer>
    </StyledStandardWhiteGhostWrapper>
  );
};

export default UserSearchContainer;

const StyledStandardWhiteGhostWrapper = styled(Wrapper)`
  ${FlexCenter}
  height: 48.5%;
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
  width: 100%;
  height: 70%;
  overflow-y: auto;
`;
