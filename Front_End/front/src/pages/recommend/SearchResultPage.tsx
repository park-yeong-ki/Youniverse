import { useState } from "react";
import { useLocation } from "react-router-dom";

import ResultContainers from "../../components/search/ResultContainers";
import SearchContainer from "../../components/search/SearchContainer";
import { MainPaddingContainer } from "../../commons/style/layoutStyle";
import { MovieType } from "../../types/MovieType";
import styled from "styled-components";
import { FlexColBetween } from "../../commons/style/SharedStyle";

interface LocationState {
  searchTerm: string;
}

const SearchResultPage = () => {
  const location = useLocation();

  const [searchResults, setSearchResults] = useState<MovieType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(
    (location.state as LocationState)?.searchTerm || ""
  );

  return (
    <MainPaddingContainer>
      <StyledSearchResultWrapper>
        <SearchContainer
          setSearchResults={setSearchResults}
          setSearchTerm={setSearchTerm}
        />
        <ResultContainers
          searchResults={searchResults}
          searchTerm={searchTerm}
        />
      </StyledSearchResultWrapper>
    </MainPaddingContainer>
  );
};

export default SearchResultPage;

const StyledSearchResultWrapper = styled.div`
  ${FlexColBetween}
  height: 100%;

  & > *:first-child {
    height: 30%;
  }
  & > *:last-child {
    height: 68%;
  }
`;
