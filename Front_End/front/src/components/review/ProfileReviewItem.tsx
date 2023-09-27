// 프로필에서 보여지는 리뷰 한 개
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ReviewItem } from "./ProfileReviewItemList";
import { MovieType } from "../../pages/recommend/ContentDetailPage";
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
      <div>
        <Text size="Medium" color="Black" fontFamily="YESGothic-Regular">
          {title}
        </Text>
      </div>
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
          <Text size="Small" color="Black" fontFamily="YESGothic-Regular">
            {reviewRate}
          </Text>
        </StyledRateBottomContainer>
      </StyledRowBetweenContainer>

      <StyledReviewContentWrapper size="Small" color="White" padding="Narrow">
        <Text size="Small" color="Black" fontFamily="YESGothic-Regular">
          {reviewContent}
        </Text>
      </StyledReviewContentWrapper>
    </div>
  );
};

export default ProfileReviewItem;

const StyledReviewContentWrapper = styled(Wrapper)`
  height: 100px;
`;

const StyledTextContainer = styled.div`
  //아무리 해도 왜 붙지 않니...
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
`;

const StyledRateBottomContainer = styled.div`
  ${FlexAlignBottom}
`;
