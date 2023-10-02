// 프로필에서 보여지는 리뷰 한 개
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ReviewItem } from "./ProfileReviewItemList";
import { MovieType } from "../movies/MovieItemList";
import { getMovie } from "../../apis/FrontendApi";
import Wrapper from "../atoms/Wrapper";
import Text from "../atoms/Text";
import {
  FlexAlignBottom,
  FlexRowBetween,
} from "../../commons/style/SharedStyle";

interface ReviewProps {
  review: ReviewItem;
}

const ProfileReviewItem: React.FC<ReviewProps> = ({ review }) => {
  const navigate = useNavigate();

  const {
    movieSimpleResDto: { movieId, title },
    reviewContent,
    reviewRate,
  } = review;
  const [movieDetailInfo, setMovieDetailInfo] = useState<MovieType | null>(
    null
  );

  const handleClickToDetail = () => {
    navigate(`/movie/${movieId}`);
  };

  useEffect(() => {
    const MovieDetail = async () => {
      try {
        const response = await getMovie(movieId);
        setMovieDetailInfo(response.data);
      } catch (error) {
        console.error("영화 정보 가져오기 실패:", error);
      }
    };

    MovieDetail();
  }, [movieId]);

  return (
    <div onClick={handleClickToDetail}>
      <StyledMovieTitletContainer>
        <Text size="Medium" color="Black" fontFamily="YESGothic-Regular">
          {title}
        </Text>
      </StyledMovieTitletContainer>
      <StyledRowBetweenContainer>
        <StyledTextContainer>
          <StyledText
            size="X-Small"
            color="Black"
            fontFamily="YESGothic-Regular"
          >
            장르: {movieDetailInfo?.genreResDtos[0]?.genreName}
            <br />
            감독: {movieDetailInfo?.directorResDtos[0]?.directorName}
          </StyledText>
        </StyledTextContainer>
        <StyledRateBottomContainer>
          <Text size="X-Small" color="Black" fontFamily="YESGothic-Regular">
            ⭐ {reviewRate}/5
          </Text>
        </StyledRateBottomContainer>
      </StyledRowBetweenContainer>

      <StyledReviewContentWrapper size="Small" color="White" padding="Thin">
        <Text size="X-Small" color="Black" fontFamily="YESGothic-Regular">
          {reviewContent}
        </Text>
      </StyledReviewContentWrapper>
    </div>
  );
};

export default ProfileReviewItem;

const StyledReviewContentWrapper = styled(Wrapper)`
  height: 100%;
  margin-top: 5px;
`;

const StyledMovieTitletContainer = styled.div`
  height: 100%;
  margin-bottom: 5px;
  padding: 0px 5px;
`;

const StyledTextContainer = styled.div`
  margin-top: 0;
  margin-bottom: 0;
`;

const StyledText = styled(Text)`
  line-height: 1;
  margin-top: 0;
  margin-bottom: 0;
`;

const StyledRowBetweenContainer = styled.div`
  ${FlexRowBetween}
  padding: 0px 5px;
`;

const StyledRateBottomContainer = styled.div`
  ${FlexAlignBottom}
`;
