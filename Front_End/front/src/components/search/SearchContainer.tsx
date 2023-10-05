import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { SEARCH_PAGE } from "../../commons/constants/String";
import Wrapper from "../atoms/Wrapper";
import SearchBox from "../organisms/SearchBox";
import Text from "../atoms/Text";
import { getAllMovies } from "../../apis/FrontendApi";
import { MovieType } from "../../types/MovieType";
import styled from "styled-components";

const SearchContainer = ({
  setSearchResults,
  setSearchTerm,
}: {
  setSearchResults: (movies: MovieType[]) => void;
  setSearchTerm: (term: string) => void;
}) => {
  const location = useLocation(); // 현재 URL의 정보를 가져옵니다.
  const navigate = useNavigate(); // 라우팅을 위한 함수를 가져옵니다.

  // URL에서 'query' 파라미터를 추출합니다.
  const params = new URLSearchParams(location.search);
  const initialSearchTerm = params.get("query") || "";

  const [localSearchTerm, setLocalSearchTerm] = useState(initialSearchTerm);

  useEffect(() => {
    setLocalSearchTerm(initialSearchTerm);
    if (initialSearchTerm) {
      handleSearch(initialSearchTerm, "all"); // 원하는 검색 유형을 설정합니다.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]); // URL의 query 파라미터가 변경될 때 이 훅을 실행합니다.

  const handleSearch = (term: string, valueType: string | null) => {
    if (!term.trim()) {
      alert("검색어를 입력해주세요.");
      return;
    }
    setLocalSearchTerm(term);
    navigate(`${location.pathname}?query=${term}`); // 검색어를 URL에 추가합니다.
    setSearchTerm(term);

    let filters: any = { page: 0, size: 10 };

    if (valueType === "all" || valueType === null) {
      // 모든 검색 필드에 대해 검색을 수행합니다.
      const searchFields = ["title", "actor", "director"];
      const promises = searchFields.map((field) => {
        const newFilters = { ...filters, [field]: term };
        return getAllMovies(newFilters);
      });

      Promise.all(promises)
        .then((results) => {
          // 모든 결과를 결합합니다.
          console.log("results#################", results);
          const allMovies = results.flatMap((result) => result.data.content);
          // 중복 영화를 제거합니다.
          const uniqueMovies = Array.from(
            new Set(allMovies.map((movie) => movie.movieId))
          ).map((id) => allMovies.find((movie) => movie.movieId === id));
          setSearchResults(uniqueMovies);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // 특정 검색 유형에 따라 필터를 설정합니다.
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
    <StyledSearchContainerWrap
      size="Standard"
      color="WhiteGhost"
      padding="Medium"
    >
      <Text size="Large" color="Black" fontFamily="YESGothic-Bold">
        "{localSearchTerm}" {SEARCH_PAGE}
      </Text>
      <StyledSearchBarWrap>
        <SearchBox theme="dark" type="movie" onSearch={handleSearch} />
      </StyledSearchBarWrap>
    </StyledSearchContainerWrap>
  );
};

export default SearchContainer;

const StyledSearchContainerWrap = styled(Wrapper)`
  overflow: visible;
`;

const StyledSearchBarWrap = styled.div`
  width: 70%;
  margin: 1rem auto 0 auto;
`;
