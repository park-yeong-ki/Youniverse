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
  const [sortMovies, setSortMovies] = useState<MovieType[]>([]); // 영화 정보 상태

  const { sort } = useParams<{ sort?: string }>();

  const fetchMovies = async () => {
    try {
      // 만약 sort 파라미터가 URL에 존재하지 않으면 기본값이나 에러 처리를 수행할 수 있습니다.
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
        page: page,
        type: numericType, // URL에서 가져온 type을 요청의 파라미터로 사용합니다.
        "member-id": memberId,
      });
      console.log(response);
      setSortMovies(response.data.content);
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
    fetchMovies();
    // 초기화 로직이 필요하다면 여기에 추가합니다.
    setPage(0);
    // 페이지 번호, 선택된 OTT, 리스트 타입이 변경될 때마다 fetchMovies를 다시 호출합니다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, selectedOTT, listType]);

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
  height: calc(100vh - 240px);
  background-color: #ffffff80;
  overflow-y: auto;
  box-sizing: border-box;
`;

const StyledMovieItemList = styled(MovieItemList)`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
`;
