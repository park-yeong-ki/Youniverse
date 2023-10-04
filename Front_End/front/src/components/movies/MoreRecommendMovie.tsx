import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { UserDetailInfoState } from "./../../pages/store/State";
import Wrapper from "../atoms/Wrapper";
import MovieItemList from "./MovieItemList";
import { getAllMovies } from "../../apis/FrontendApi";
import { MovieType } from "../../types/MovieType";

type MovieProps = {
  selectedOTT: string | null;
  listType?: string | null;
};

const MoreRecommendMovie: React.FC<MovieProps> = ({
  selectedOTT,
  listType,
}) => {
  const memberId = useRecoilValue(UserDetailInfoState).memberId;
  const [page, setPage] = useState(0);
  const [sortMovies, setSortMovies] = useState<MovieType[]>([]);
  const { sort } = useParams<{ sort?: string }>();

  const fetchMovies = async (pageNum: number) => {
    try {
      if (!sort) {
        console.error("Type parameter is missing in the URL");
        return;
      }
      const numericType = parseInt(sort, 10);
      if (isNaN(numericType)) {
        console.error("Type parameter is not a number");
        return;
      }

      const response = await getAllMovies({
        page: pageNum,
        type: numericType,
        "member-id": memberId,
      });

      let fetchedMovies = response.data.content;

      if (selectedOTT && selectedOTT !== "All") {
        fetchedMovies = fetchedMovies.filter((movie: MovieType) =>
          movie.ottResDtos.some((ott) => ott.ottName === selectedOTT)
        );
      }
      setSortMovies((prevMovies) => [...prevMovies, ...fetchedMovies]);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleScroll = (e: any) => {
    const target = e.target;
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    // 초기화 로직: 선택된 OTT가 변경되면 영화 목록과 페이지 번호를 초기화합니다.
    setSortMovies([]);
    setPage(0);
  }, [selectedOTT, listType]);

  useEffect(() => {
    fetchMovies(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, selectedOTT, listType]); // 페이지 번호가 변경될 때마다 새로운 데이터 로드

  return (
    <RecommendPaddingContainer>
      <StyledWrapper
        size="Standard"
        color="WhiteGhost"
        padding="Narrow"
        onScroll={handleScroll}
      >
        <StyledMovieItemList
          filterOTT={selectedOTT}
          listType={listType}
          page={page}
          layout="vertical" // 세로 스크롤로 적용
          movies={sortMovies}
        />
      </StyledWrapper>
    </RecommendPaddingContainer>
  );
};

export default MoreRecommendMovie;

const RecommendPaddingContainer = styled.div`
  width: 100%;
`;

const StyledWrapper = styled(Wrapper)`
  width: 100%;
  border-radius: 28px;
  height: calc(100vh - 320px);
  background-color: #ffffff80;
  overflow-y: auto;
  box-sizing: border-box;
`;

const StyledMovieItemList = styled(MovieItemList)`
  width: 100%;
  height: 100%;
  /* display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between; */
`;
