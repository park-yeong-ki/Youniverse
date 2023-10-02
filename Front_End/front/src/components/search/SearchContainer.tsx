import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { SEARCH_PAGE } from "../../commons/constants/String";
import Wrapper from "../atoms/Wrapper";
import SearchBox from "../organisms/SearchBox";
import Text from "../atoms/Text";
import { getAllMovies } from "../../apis/FrontendApi";
import { MovieType } from "../movies/MovieItemList";

const SearchContainer = ({
  setSearchResults,
  setSearchTerm,
}: {
  setSearchResults: (movies: MovieType[]) => void;
  setSearchTerm: (term: string) => void;
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const initialSearchTerm = params.get("query") || "";

  const [localSearchTerm, setLocalSearchTerm] = useState(initialSearchTerm);

  useEffect(() => {
    setLocalSearchTerm(initialSearchTerm);
    if (initialSearchTerm) {
      handleSearch(initialSearchTerm, "all");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const handleSearch = (term: string, valueType: string | null) => {
    valueType = valueType || "all";
    setLocalSearchTerm(term);

    // Update the query parameter in URL
    navigate(`${location.pathname}?query=${term}`);
    setSearchTerm(term);

    let filters: any = { page: 0, size: 10 };

    if (valueType === "all" || valueType === null) {
      const searchFields = ["title", "actor", "director"];
      const promises = searchFields.map((field) => {
        const newFilters = { ...filters, [field]: term };
        return getAllMovies(newFilters);
      });

      Promise.all(promises)
        .then((results) => {
          const allMovies = results.flatMap((result) => result.data.content);
          // 중복 영화 제거
          const uniqueMovies = Array.from(
            new Set(allMovies.map((movie) => movie.movieId))
          ).map((id) => allMovies.find((movie) => movie.movieId === id));
          setSearchResults(uniqueMovies);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      switch (valueType) {
        case "title":
          filters.title = term;
          break;
        case "actor":
          filters.actor = term;
          break;
        case "director":
          filters.director = term;
          break;
        default:
          filters.searchTerm = term;
          break;
      }

      getAllMovies(filters)
        .then((response) => {
          const movies = response.data.content;
          setSearchResults(movies);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Wrapper size="Standard" color="WhiteGhost" padding="Medium">
      <Text size="Large" color="Black" fontFamily="YESGothic-Bold">
        "{localSearchTerm}" {SEARCH_PAGE}
      </Text>
      <SearchBox theme="dark" type="movie" onSearch={handleSearch} />
    </Wrapper>
  );
};

export default SearchContainer;
