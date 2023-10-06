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
import { MovieType } from "../../types/MovieType";

type Props = {
  filterOTT?: string | null;
  listType?: string | null;
  movies?: MovieType[];
  page?: number;
};

const MovieItemList: React.FC<
  Props & { layout?: "horizontal" | "vertical" }
> = ({
  filterOTT,
  listType,
  movies: propMovies = [],
  page,
}) => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<MovieType[]>([]);

  const memberId = useRecoilValue(UserDetailInfoState).memberId;
  const memberAge = useRecoilValue(UserJoinInfoState).age;
  const memberGender = useRecoilValue(UserJoinInfoState).gender;
  const memberNickname = useRecoilValue(UserDetailInfoState).nickname;

  // 더보기 버튼 클릭 처리
  const handleMoreClick = () => {
    let sort: number | null = null;
    switch (listType) {
      case `${memberNickname}님의 선호도 기반 추천 영화`:
        sort = 1;
        break;
      case `${memberAge}세 ${memberGender}인 ${memberNickname}님을 위한 추천 영화`:
        sort = 2;
        break;
      case `${memberNickname}님의 유튜브 기반 추천 영화`:
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

  // 영화 데이터 가져오기
  useEffect(() => {
    const loadMovies = async () => {
      let requestParams: any = { page, size: 20 };
      if (listType === `${memberNickname}님의 선호도 기반 추천 영화`) {
        requestParams = {
          ...requestParams,
          "member-id": memberId,
          type: 1,
        };
      } else if (listType === `${memberAge}세 ${memberGender}인 ${memberNickname}님을 위한 추천 영화`) {
        requestParams = {
          ...requestParams,
          "member-id": memberId,
          type: 2,
        };
      } else if (listType === `${memberNickname}님의 유튜브 기반 추천 영화`) {
        requestParams = {
          ...requestParams,
          "member-id": memberId,
          type: 3,
        };
      }

      try {
        const response = await getAllMovies(requestParams);
        return setMovies(response.data.content);
      } catch (err) {
        console.log(err);
      }
    };

    loadMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterOTT, listType, memberId, page]);

  const renderMovies = () => {
    if (movies && movies.length > 0) {
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
        <StyledText size="Large" color="White" fontFamily="PyeongChang-Bold">
          {listType}
        </StyledText>

        <StyledBtn size="Small" color="Black" onClick={handleMoreClick}>
          더보기
        </StyledBtn>
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
const StyledText = styled(Text)`
  margin-bottom: 0.5rem;
`;

const RecommendPaddingContainer = styled.div`
  padding: 2rem;
`;
