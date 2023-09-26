import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovie } from "../../apis/FrontendApi";
import Text from "../atoms/Text";
import styled from "styled-components";
import { FlexCenter, FlexRowBetween } from "../../commons/style/SharedStyle";
import { StyledCardWrapper, StyledMoviePoster } from "./MovieItem";
import { HiOutlineHeart } from "react-icons/hi";
import Btn from "../atoms/Btn";
import HashTag from "../atoms/HashTag";

export type MovieType = {
  movieId: number;
  title: string;
  movieImage: string;
  rate: number;
  runtime: number;
  overView: string;
  language: string;
  actorResDtos: Array<{
    actorImage: string;
    actorName: string;
  }>;
  directorResDtos: Array<{
    directorImage: string;
    directorName: string;
  }>;
  genreResDtos: Array<{
    /* 필요한 속성 추가 */
  }>;
  keywordResDtos: Array<{
    keywordName: string;
    source: number;
  }>;
  ottResDtos: Array<{
    ottImage: string;
    ottName: string;
    ottUrl: string;
  }>
};

const MovieDetail = () => {
  const [movie, setMovie] = useState<MovieType | null>(null);

  const { movieId } = useParams<{ movieId: string }>();

  useEffect(() => {
    getMovie(Number(movieId))
      .then((response) => {
        console.log("영화 상세정보 axios", response.data);
        setMovie(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [movieId]);

  return (
    <StyledDetailWrapper>
      {/* 영화 포스터 */}
      <StyledCardWrapper $detail $cardWidth="30%">
        <StyledMoviePoster src="https://www.themoviedb.org/t/p/w440_and_h660_face/1YYL1OcgjPLjAGi6n0iZe1gdl9i.jpg" />
      </StyledCardWrapper>

      {/* 영화 상세 정보 */}
      <StyledMovieDetail>
        <StyledTitleBtnWrapper>
          <Text size="X-Large" color="Black" fontFamily="PyeongChang-Light">
            {movie?.title}
          </Text>
          <div>
            <HashTag size="Huge" color="White">
              ⭐{movie?.rate}
            </HashTag>
            <StyledSquareBtn size="Small" color="Black">
              <HiOutlineHeart />
            </StyledSquareBtn>
          </div>
        </StyledTitleBtnWrapper>

        <div>
          <Text size="Small" color="Black" fontFamily="YESGothic-Bold">
            키워드
          </Text>
          {movie?.keywordResDtos?.map((keyword, index) => (
            <div key={keyword.keywordName}>
              <HashTag size="Standard" color="White">
                {keyword.keywordName}
              </HashTag>
            </div>
          ))}
        </div>

        <div>{movie?.overView}</div>

        {/* 감독 정보 */}
        <div>
          <Text size="Small" color="Black" fontFamily="YESGothic-Bold">
            감독
          </Text>
          {movie?.directorResDtos?.map((director, index) => (
            <div key={director.directorName}>
              <img src={director.directorImage} alt={director.directorName} />
              <div>{director.directorName}</div>
            </div>
          ))}
        </div>

        {/* 배우 정보 */}
        <div>
          <Text size="Small" color="Black" fontFamily="YESGothic-Bold">
            배우
          </Text>
          {movie?.actorResDtos?.map((actor, index) => (
            <div key={actor.actorName}>
              <img src={actor.actorImage} alt={actor.actorName} />
              <div>{actor.actorName}</div>
            </div>
          ))}
        </div>

        <div>
          <Text size="Small" color="Black" fontFamily="YESGothic-Bold">
            OTT 행성
          </Text>
          {movie?.ottResDtos?.map((ott, index) => (
            <div key={ott.ottName}>
              <img src={ott.ottImage} alt={ott.ottName} />
              <div>{ott.ottName}</div>
            </div>
          ))}
        </div>
      </StyledMovieDetail>
    </StyledDetailWrapper>
  );
};

export default MovieDetail;

/** 영화 디테일 컴포넌트 전체 Wrap */
const StyledDetailWrapper = styled.div`
  ${FlexRowBetween}
  width: 80%;
  margin: 0 auto;
`;

/** 영화 디테일 컴포넌트 내 영화 정보 (포스터 제외) Wrap */
const StyledMovieDetail = styled.div`
  width: 55%;
`;

/** 정사각형 아이콘 들어가는 버튼 스타일링 36*36 */
const StyledSquareBtn = styled(Btn)`
  ${FlexCenter}
  width: 36px;
  text-align: center;
`;

/** 제목, 버튼 묶음 들어가는 공간 */
const StyledTitleBtnWrapper = styled.div`
  ${FlexRowBetween}
`;

/**  */
