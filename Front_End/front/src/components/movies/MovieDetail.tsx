import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import styled from "styled-components";
import { UserDetailInfoState } from "../../pages/store/State";
import { MovieType } from "./MovieItemList";
import Text from "../atoms/Text";
import { FlexCenter, FlexRowBetween } from "../../commons/style/SharedStyle";
import { StyledCardWrapper, StyledMoviePoster } from "./MovieItem";
import Btn from "../atoms/Btn";
import HashTag from "../atoms/HashTag";
import { postHeart, deleteHeart } from "../../apis/FrontendApi"; // postHeart API import

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
              {likeStatus ? <HiHeart /> : <HiOutlineHeart />}
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
