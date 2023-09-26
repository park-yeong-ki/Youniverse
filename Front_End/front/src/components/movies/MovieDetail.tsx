import React, { useState } from "react";

import { MovieType } from "../../pages/recommend/ContentDetailPage";
import Text from "../atoms/Text";
import styled from "styled-components";
import { FlexCenter, FlexRowBetween } from "../../commons/style/SharedStyle";
import { StyledCardWrapper, StyledMoviePoster } from "./MovieItem";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import Btn from "../atoms/Btn";
import HashTag from "../atoms/HashTag";
import { postHeart, deleteHeart } from "../../apis/FrontendApi"; // postHeart API import

type MovieItemProps = {
  movie: MovieType;
};

const MovieDetail: React.FC<MovieItemProps> = ({ movie }) => {
  const [isHearted, setIsHearted] = useState(false); // 좋아요 상태

  // 좋아요 버튼 클릭 핸들러
  const handleHeartClick = async () => {
    if (!movie) return;

    try {
      // memberId를 어디서 가져오는지에 따라 값이 바뀔 수 있습니다.
      const memberId = 1; // TODO: 실제 memberId로 대체해야 합니다.

      if (isHearted) {
        // 좋아요 상태일 때
        await deleteHeart(15); // 좋아요 취소 API 호출
        setIsHearted(false); // 좋아요 상태 변경
        alert("영화 좋아요를 취소했습니다!");
      } else {
        // 좋아요 상태가 아닐 때
        await postHeart(memberId, movie.movieId); // 좋아요 추가 API 호출
        setIsHearted(true); // 좋아요 상태 변경
        alert("영화를 좋아요 했습니다!");
      }
    } catch (error) {
      console.error(error);
      alert("좋아요 처리에 실패했습니다.");
    }
  };

  return (
    <StyledDetailWrapper>
      {/* 영화 포스터 */}
      <StyledCardWrapper $detail $cardWidth="30%">
        <StyledMoviePoster src={movie?.movieImage} />
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
            <StyledSquareBtn
              size="Small"
              color="Black"
              onClick={handleHeartClick}
            >
              {isHearted ? <HiHeart /> : <HiOutlineHeart />}
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
