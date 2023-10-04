import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import {
  UserDetailInfoState,
  UserJoinInfoState,
} from "./../../pages/store/State";
import styled from "styled-components";
import { FlexRowBetween } from "../../commons/style/SharedStyle";
import Btn from "../atoms/Btn";
import Text from "../atoms/Text";
import MovieItem from "./MovieItem";
import BestMovieItem from "./BestMovieItem";
import { getAllMovies, getMember, getMovie } from "../../apis/FrontendApi";
import { MovieType, OTTType, BestMovieType } from "../../types/MovieType";

type Props = {
  filterOTT?: string | null;
  listType?: string | null;
  movies?: MovieType[];
  showMoreButton?: boolean;
  page?: number;
};

const MovieItemList: React.FC<
  Props & { layout?: "horizontal" | "vertical" }
> = ({
  filterOTT,
  listType,
  movies: propMovies = [],
  showMoreButton,
  page,
  layout = "horizontal", // default value
}) => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<MovieType[]>([]);

  const memberId = useRecoilValue(UserDetailInfoState).memberId;
  const memberAge = useRecoilValue(UserJoinInfoState).age;
  const memberGender = useRecoilValue(UserJoinInfoState).gender;

  const [bestMovies, setBestMovies] = useState<BestMovieType[]>([]);

  // 조건에 따라 스타일 선택
  // const MovieContainer =
  //   layout === "horizontal" ? MovieContainerHorizontal : MovieContainerVertical;

  // 더보기 버튼 클릭 처리
  const handleMoreClick = () => {
    let sort: number | null = null;

    switch (listType) {
      case "선호도기반 추천 영화":
        sort = 1;
        break;
      case `${memberAge}세 ${memberGender} 추천 영화`:
        sort = 2;
        break;
      case "유튜브 기반 추천 영화":
        sort = 3;
        break;
      default:
        break;
    }
    // navigate to the recommendation page with a sort type
    if (sort) {
      navigate(`/recommend/more/${sort}`);
    }
  };

  const convertOTTNameToId = (
    ottName: string | null | undefined
  ): number | null => {
    if (!ottName) return null;
    const ottList = [
      { name: "넷플릭스", id: 8 },
      { name: "디즈니플러스", id: 337 },
      { name: "왓챠", id: 97 },
      { name: "애플티비", id: 2 },
      { name: "애플티비플러스", id: 350 },
      { name: "웨이브", id: 356 },
    ];

    const ott = ottList.find((o) => o.name === ottName);
    return ott ? ott.id : null;
  };

  // 영화 데이터 가져오기
  useEffect(() => {
    const loadMovies = async () => {
      let requestParams: any = { page, size: 20 };
      if (listType === "다른 유저의 인생영화 추천") {
        try {
          const response = await getMember(0); // memberId가 0으로 호출
          const bestMoviesWithDetail = await Promise.all(
            response.data.bestMovieResDtos.map(async (bestMovie: any) => {
              const movieDetailResponse = await getMovie(bestMovie.bestMovieId); // 추가로 movie 데이터를 로딩합니다.
              return {
                ...bestMovie,
                movie: movieDetailResponse.data, // movie 정보를 추가합니다.
              };
            })
          );
          setBestMovies(bestMoviesWithDetail); // 상세 정보가 담긴 bestMovie 정보를 state에 저장
        } catch (error) {
          console.error("Error fetching best movies: ", error);
        }
      } else if (listType === "선호도기반 추천 영화") {
        requestParams = {
          ...requestParams,
          "member-id": memberId,
          type: 1,
        };
      } else if (listType === `${memberAge}세 ${memberGender} 추천 영화`) {
        requestParams = {
          ...requestParams,
          "member-id": memberId,
          type: 2,
        };
      } else if (listType === "유튜브 기반 추천 영화") {
        requestParams = {
          ...requestParams,
          "member-id": memberId,
          type: 3,
        };
      }

      try {
        const response = await getAllMovies(requestParams);
        const targetOttId = convertOTTNameToId(filterOTT);

        const filteredMovies = response.data.content.filter(
          (movie: MovieType) => {
            if (!targetOttId) return true;
            return movie.ottResDtos.some(
              (ott: OTTType) => ott.ottId === targetOttId
            );
          }
        );
        if (page === 0) {
          // 첫 페이지일 경우 기존 영화 목록을 리셋
          setMovies(filteredMovies);
        } else {
          setMovies((prevMovies) => [...prevMovies, ...filteredMovies]);
        }
      } catch (err) {
        console.log(err);
      }
    };

    loadMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterOTT, listType, memberId, page]);

  const renderMovies = () => {
    if (propMovies && propMovies.length > 0) {
      return propMovies.map((movie) => (
        <MovieItem key={movie.movieId} movie={movie} />
      ));
    } else if (listType === "다른 유저의 인생영화 추천") {
      return bestMovies.length > 0 ? (
        bestMovies.map((bestMovie) => (
          <div>
            <BestMovieItem
              key={bestMovie.bestMovieId}
              bestMovie={bestMovie}
              movie={bestMovie.movie}
            />
          </div>
        ))
      ) : (
        <NoMovieText />
      );
    } else {
      return movies.length > 0 ? (
        movies.map((movie) => <MovieItem key={movie.movieId} movie={movie} />)
      ) : (
        <NoMovieText />
      );
    }
  };

  const NoMovieText = () => (
    <Text size="Medium" color="Black" fontFamily="PyeongChang-Bold">
      영화가 없습니다.
    </Text>
  );

  return (
    <RecommendPaddingContainer>
      <StyledListBtn>
        <Text size="Large" color="White" fontFamily="PyeongChang-Bold">
          {listType}
        </Text>
        {showMoreButton && (
          <StyledBtn size="Medium" color="Black" onClick={handleMoreClick}>
            더보기
          </StyledBtn>
        )}
      </StyledListBtn>
      <div className="grid grid-cols-5 gap-4">{renderMovies()}</div>
    </RecommendPaddingContainer>
  );
};

export default MovieItemList;

const StyledListBtn = styled.div`
  ${FlexRowBetween}
`;

const StyledBtn = styled(Btn)`
  width: 100px;
`;

// const MovieContainerHorizontal = styled.div`
//   display: flex;
//   overflow-x: auto;
//   gap: 16px;
//   padding-bottom: 0.5rem;
//   padding-top: 0.5rem;
//   /* your movie item */
//   & > div {
//     flex-shrink: 0;
//   }
// `;

/* MovieContainer의 스타일을 세로 스크롤로 변경 */
// const MovieContainerVertical = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 16px;
//   justify-content: flex-start;
// `;

const RecommendPaddingContainer = styled.div`
  padding: 1rem;
`;
