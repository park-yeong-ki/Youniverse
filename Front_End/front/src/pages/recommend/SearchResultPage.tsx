import { useState } from "react";
import ResultContainers from "../../components/search/ResultContainers";
import SearchContainer from "../../components/search/SearchContainer";
import { MainPaddingContainer } from "../../commons/style/layoutStyle";
import { MovieType } from "../../components/movies/MovieItemList";

const SearchResultPage = () => {
  const [searchResults, setSearchResults] = useState<MovieType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

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
