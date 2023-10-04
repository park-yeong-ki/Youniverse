import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import Slick from "./Slick";

import {
  UserDetailInfoState,
  UserJoinInfoState,
} from "./../../pages/store/State";
import styled from "styled-components";
import { FlexRowBetween } from "../../commons/style/SharedStyle";
import Btn from "../atoms/Btn";
import Text from "../atoms/Text";
import MovieItem from "./MovieItem";
import { getAllMovies } from "../../apis/FrontendApi";
import { MovieType, OTTType } from "../../types/MovieType";

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
}) => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<MovieType[]>([]);

  const memberId = useRecoilValue(UserDetailInfoState).memberId;
  const memberAge = useRecoilValue(UserJoinInfoState).age;
  const memberGender = useRecoilValue(UserJoinInfoState).gender;

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
      { name: "Netflix", id: 8 },
      { name: "Disney Plus", id: 337 },
      { name: "Watcha", id: 97 },
      { name: "Apple TV", id: 2 },
      { name: "wavve", id: 356 },
    ];

    const ott = ottList.find((o) => o.name === ottName);
    return ott ? ott.id : null;
  };

  // 영화 데이터 가져오기
  useEffect(() => {
    const loadMovies = async () => {
      let requestParams: any = { page, size: 20 };
      if (listType === "선호도기반 추천 영화") {
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
      return (
        <div className="grid grid-cols-5 gap-5">
          {propMovies.map((movie) => (
            <MovieItem key={movie.movieId} movie={movie} />
          ))}
        </div>
      );
    } else {
      return movies.length > 0 ? (
        <Slick speed={500} autoplay={true}>
          {movies.map((movie) => (
            <MovieItem key={movie.movieId} movie={movie} />
          ))}
        </Slick>
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
          <StyledBtn size="Small" color="Black" onClick={handleMoreClick}>
            더보기
          </StyledBtn>
        )}
      </StyledListBtn>
      <div>{renderMovies()}</div>
    </RecommendPaddingContainer>
  );
};

export default MovieItemList;

const StyledListBtn = styled.div`
  ${FlexRowBetween}
`;

const StyledBtn = styled(Btn)`
  width: 80px;
`;

const RecommendPaddingContainer = styled.div`
  padding: 2rem;
`;
