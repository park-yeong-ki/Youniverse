import { useState } from "react";
import { useLocation } from "react-router-dom";

import ResultContainers from "../../components/search/ResultContainers";
import SearchContainer from "../../components/search/SearchContainer";
import { MainPaddingContainer } from "../../commons/style/layoutStyle";
import { MovieType } from "../../components/movies/MovieItemList";

interface LocationState {
  searchTerm: string;
}

const SearchResultPage = () => {
  const location = useLocation();


  const [searchResults, setSearchResults] = useState<MovieType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>((location.state as LocationState)?.searchTerm || "");


  return (
    <MainPaddingContainer>
      <div>
        <SearchContainer
          setSearchResults={setSearchResults}
          setSearchTerm={setSearchTerm}
        />
        <ResultContainers
          searchResults={searchResults}
          searchTerm={searchTerm}
        />
      </div>
    </MainPaddingContainer>
  );
};

export default SearchResultPage;
