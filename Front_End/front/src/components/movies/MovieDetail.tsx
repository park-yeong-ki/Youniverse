import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import styled from "styled-components";

import { postHeart, deleteHeart } from "../../apis/FrontendApi"; // postHeart API import
import { FlexCenter, FlexRowBetween } from "../../commons/style/SharedStyle";
import { UserDetailInfoState } from "../../pages/store/State";
import { StyledCardWrapper, StyledMoviePoster } from "./MovieItem";
import { MovieType } from "../../types/MovieType";
import Text from "../atoms/Text";
import Btn from "../atoms/Btn";
import HashTag from "../atoms/HashTag";
import Planet from "../atoms/Planet";

type MovieItemProps = {
  movie: MovieType;
};

const MovieDetail: React.FC<MovieItemProps> = ({ movie }) => {
  const memberId = useRecoilValue(UserDetailInfoState).memberId;

  // 좋아요 상태 및 좋아요 ID
  const [likeStatus, setLikeStatus] = useState(false);
  const [heartMovieId, setHeartMovieId] = useState<number | null>(null);

  useEffect(() => {
    const heart = movie.heartMovieResDtos?.find(
      (resDto) => resDto.memberSimpleResDto?.memberId === memberId
    );

    if (heart) {
      setLikeStatus(true);
      setHeartMovieId(heart.heartMovieId);
    }
  }, [movie, memberId]);

  // 좋아요 버튼 클릭 핸들러
  const handleHeartClick = () => {
    if (!likeStatus && memberId) {
      postHeart(memberId, movie.movieId)
        .then((res) => {
          setLikeStatus(true);
          setHeartMovieId(res.data.heartMovieId);
        })
        .catch((err) => {
          console.error("Error posting heart:", err);
        });
    } else if (likeStatus && heartMovieId !== null) {
      deleteHeart(heartMovieId)
        .then(() => {
          setLikeStatus(false);
          setHeartMovieId(null);
        })
        .catch((err) => {
          console.error("Error deleting heart:", err);
        });
    }
  };

  return (
    <StyledDetailWrapper>
      {/* 영화 포스터 */}
      <StyledCardWrapper $detail $cardWidth="25%">
        <StyledMoviePoster src={movie?.movieImage} />
      </StyledCardWrapper>

      {/* 영화 상세 정보 */}
      <StyledMovieDetail>
        <StyledTitleBtnWrapper>
          <Text size="X-Large" color="Black" fontFamily="PyeongChang-Light">
            {movie?.title}
          </Text>
          <HashTag size="Huge" color="White">
            ⭐{movie?.rate}
          </HashTag>
          <StyledSquareBtn
            size="Small"
            color="Black"
            onClick={handleHeartClick}
          >
            {likeStatus ? <HiHeart /> : <HiOutlineHeart />}
          </StyledSquareBtn>
        </StyledTitleBtnWrapper>

        <div className="flex gap-2">
          <Text size="Small" color="Black" fontFamily="YESGothic-Bold">
            키워드
          </Text>
          {movie?.keywordResDtos?.map((keyword, index) => (
            <span key={keyword.keywordName}>
              <HashTag size="Standard" color="White">
                {keyword.keywordName}
              </HashTag>
            </span>
          ))}
        </div>

        <Text size="Small" color="Black" fontFamily="YESGothic-Bold">
          줄거리
        </Text>
        <div>{movie?.overView}</div>

        {/* 감독 정보 */}
        <ListHorizontal>
          <Text size="Small" color="Black" fontFamily="YESGothic-Bold">
            감독
          </Text>
          {movie?.directorResDtos?.map((director) => (
            <span key={director.directorName}>{director.directorName}</span>
          ))}
        </ListHorizontal>

        {/* 배우 정보 */}
        <ListHorizontal>
          <Text size="Small" color="Black" fontFamily="YESGothic-Bold">
            배우
          </Text>
          {movie?.actorResDtos?.slice(0, 5).map((actor, index, array) => (
            <span key={actor.actorName}>
              {actor.actorName}
              {index !== array.length - 1 && ","}
            </span>
          ))}
        </ListHorizontal>

        <OttWrapper>
          <Text size="Small" color="Black" fontFamily="YESGothic-Bold">
            OTT 행성
          </Text>
          <OttList>
            {movie?.ottResDtos?.map((ott, index) => (
              <OttItem key={ott.ottName}>
                <a href={ott.ottUrl} target="_blank" rel="noopener noreferrer">
                  <Planet size="Small" src={ott.ottImage}></Planet>
                </a>
              </OttItem>
            ))}
          </OttList>
        </OttWrapper>
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
  width: 65%;
`;

/** 정사각형 아이콘 들어가는 버튼 스타일링 36*36 */
const StyledSquareBtn = styled(Btn)`
  ${FlexCenter}
  width: 36px;
  text-align: center;
`;
const StyledTitleBtnWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px; // 이 값을 조절하여 요소 간의 간격을 변경할 수 있습니다.
`;

const OttWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const OttList = styled.div`
  display: flex;
  gap: 10px;
`;

const OttItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ListHorizontal = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap; // 항목이 많아질 경우 여러 줄로 나누어짐
`;
