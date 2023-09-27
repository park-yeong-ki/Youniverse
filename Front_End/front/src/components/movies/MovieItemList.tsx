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
  movies?: MovieType[]; // 추가
};

type ActorType = {
  actorId: number;
  actorImage: string;
  actorName: string;
};

type DirectorType = {
  directorId: number;
  directorImage: string;
  directorName: string;
};

type KeywordType = {
  keywordId: number;
  keywordName: string;
  source: number;
};

// 기존 MovieType 확장
export type MovieType = {
  movieId: number;
  title: string;
  movieImage: string;
  rate: number;
  runtime: number;
  ottResDtos: OTTType[];
  overView: string;
  heartMovieResDtos: {
    heartMovieId: number;
    memberSimpleResDto: {
      memberId: number;
      memberImage: string | null;
      nickname: string;
    };
  }[];
  hateMovieResDtos: {
    hateMovieId: number;
    memberSimpleResDto: {
      memberId: number;
      memberImage: string | null;
      nickname: string;
    };
  }[];
  actorResDtos: ActorType[];
  directorResDtos: DirectorType[];
  keywordResDtos: KeywordType[];
};

type OTTType = {
  ottId: number;
  ottImage: string;
  ottName: string;
  ottPrice: number;
  ottUrl: string;
};

const convertOTTNameToId = (
  ottName: string | null | undefined
): number | null => {
  if (!ottName) return null; // 이 줄을 추가하여 null 또는 undefined를 처리합니다.

  switch (ottName) {
    case "넷플릭스":
      return 1;
    case "디즈니플러스":
      return 2;
    case "왓챠":
      return 3;
    case "애플티비":
      return 4;
    case "웨이브":
      return 5;
    default:
      return null;
  }
};

const MovieItemList: React.FC<Props> = ({
  filterOTT,
  listType,
  movies: propMovies = [], // 변수 이름 변경
}) => {
  // 필요한 경우 filterOTT 값을 사용하여 영화 목록을 필터링하면 됩니다.
  // listType: 유튜브 기반 추천, @@님의 선호도 기반, @@@님의 인생영화 ... 이런 텍스트
  // filterOTT: 추천 -> 더보기 들어갔을 때 OTT 선택해서 필터링 하는거
  // 검색결과에 맞는 영화 추가 필요
  const navigate = useNavigate();

  const [movies, setMovies] = useState<MovieType[]>([]);

  const handleMoreClick = () => {
    navigate(`/recommend/more`);
  };

  useEffect(() => {
    getAllMovies()
      .then((response) => {
        console.log("Movies from API:", response.data.content);

        const targetOttId = convertOTTNameToId(filterOTT);

        const filteredMovies = response.data.content.filter(
          (movie: MovieType) => {
            console.log("OTTs for movie:", movie.title, movie.ottResDtos);
            // filterOTT가 null이면 전체 영화를 반환
            if (!targetOttId) return true;

            // ottResDtos 배열에 targetOttId와 일치하는 ottId가 있는지 확인
            return movie.ottResDtos.some(
              (ott: OTTType) => ott.ottId === targetOttId
            );
          }
        );
        console.log("Filtered Movies:", filteredMovies);
        setMovies(filteredMovies);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [filterOTT]);

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
            onClick={() => handleMoreClick()}
          >
            더보기
          </StyledBtn>
        )}
      </StyledListBtn>
      <div className="grid grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieItem key={movie.movieId} movie={movie} />
        ))}
      </div>
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
