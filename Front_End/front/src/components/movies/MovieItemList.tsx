import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { FlexRowBetween } from "../../commons/style/SharedStyle";
import Btn from "../atoms/Btn";
import Text from "../atoms/Text";
import MovieItem from "./MovieItem";

import { getAllMovies } from "../../apis/FrontendApi";

type Props = {
  filterOTT?: string | null;
  listType?: string;
};

const MovieItemList: React.FC<Props> = ({ filterOTT, listType,  }) => {
  // 필요한 경우 filterOTT 값을 사용하여 영화 목록을 필터링하면 됩니다.
  // listType: 유튜브 기반 추천, @@님의 선호도 기반, @@@님의 인생영화 ... 이런 텍스트
  // filterOTT: 추천 -> 더보기 들어갔을 때 OTT 선택해서 필터링 하는거
  // 검색결과에 맞는 영화 추가 필요
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);

  const handleMoreClick = (userId: number) => {
    navigate(`/recommend/more/${userId}`);
  };

  useEffect(() => {
    getAllMovies()
      .then((response) => {
        console.log(response.data);
        setMovies(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {filterOTT}
      <StyledListBtn>
        <Text size="Large" color="White" fontFamily="PyeongChang-Bold">
          {listType}
        </Text>
        {/* filterOTT가 없을 때만 더보기 버튼을 표시합니다. */}
        {!filterOTT && (
          <StyledBtn
            size="Medium"
            color="Black"
            onClick={() => handleMoreClick(1234)}
          >
            더보기
          </StyledBtn>
        )}
      </StyledListBtn>
      {movies.map((movie) => (
        <MovieItem key={movie} movie={movie} />
      ))}
      <MovieItem />
    </>
  );
};

export default MovieItemList;

const StyledListBtn = styled.div`
  ${FlexRowBetween}
`;

const StyledBtn = styled(Btn)`
  width: 100px;
`;
