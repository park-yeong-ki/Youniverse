import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { UserDetailInfoState } from "../../pages/store/State";
import { getMovie } from "../../apis/FrontendApi";
import { FlexCenter, FlexColBetween } from "../../commons/style/SharedStyle";
import Wrapper from "../../components/atoms/Wrapper";
import MovieDetail from "../../components/movies/MovieDetail";
import Review from "../../components/review/Review";
import { MainPaddingContainer } from "../../commons/style/layoutStyle";
import { MovieType } from "../../types/MovieType";
import { HiOutlineChevronLeft } from "react-icons/hi";
import IconBox from "../../components/atoms/IconBox";

export type ReviewType = {
  memberSimpleResDto: {
    memberId: number;
    nickname: string;
    memberImage: string;
  };
  reviewContent: string;
  reviewId: number;
  reviewRate: number;
};

const ContentDetailPage = () => {
  const navigate = useNavigate();
  const memberId = useRecoilValue(UserDetailInfoState).memberId;
  // 영화 상세 정보 가져오는 axios 요청
  const [movie, setMovie] = useState<MovieType | null>(null);
  const [reviews, setReviews] = useState<ReviewType[] | null>(null);

  const { movieId } = useParams<{ movieId: string }>();

  // 현재 로그인된 사용자의 리뷰 찾기
  const userReview = reviews?.find(
    (review) => review.memberSimpleResDto.memberId === memberId
  );

  useEffect(() => {
    getMovie(Number(movieId))
      .then((response) => {
        console.log("영화 상세정보 axios", response.data);
        console.log("리뷰 정보", response.data.reviewResDtos);
        setMovie(response.data);
        setReviews(response.data.reviewResDtos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [movieId]);

  /** 뒤로가기 */
  const handleNavigateBack = () => {
    navigate(-1);
  };

  return (
    <MainPaddingContainer>
      <StyledDetail>
        <StyledDetailWrapper size="Small" color="WhiteGhost" padding="Narrow">
          <StyledIconBox
            Icon={HiOutlineChevronLeft}
            size={32}
            onClick={handleNavigateBack}
          />
          {movie && <MovieDetail movie={movie} />}
        </StyledDetailWrapper>

        <StyledReviewWrapper size="Small" color="WhiteGhost" padding="Narrow">
          {reviews && (
            <Review reviews={reviews} userReview={userReview || null} />
          )}
        </StyledReviewWrapper>
      </StyledDetail>
    </MainPaddingContainer>
  );
};

export default ContentDetailPage;

const StyledDetail = styled.div`
  ${FlexColBetween}
  height: 100%;
`;

const StyledDetailWrapper = styled(Wrapper)`
  ${FlexCenter}
  height: 60%;
  position: relative;
`;
const StyledReviewWrapper = styled(Wrapper)`
  height: 38%;
`;

export const StyledIconBox = styled(IconBox)`
  position: absolute;
  left: 16px;
  top: 16px;
`;
