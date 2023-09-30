import React, { useState } from "react";
import styled from "styled-components";

import ReviewCreate from "./ReviewCreate";
import ReviewItemList from "./ReviewItemList";
import Text from "../atoms/Text";
import { ReviewType } from "../../pages/recommend/ContentDetailPage";
import { DETAIL_PAGE_REVIEW } from "../../commons/constants/String";

interface ReviewProps {
  reviews: ReviewType[] | null;
  userReview: ReviewType | null; // 현재 사용자의 리뷰
}

const Review: React.FC<ReviewProps> = ({ reviews, userReview }) => {
  const [currentReviews, setCurrentReviews] = useState<ReviewType[] | null>(
    reviews
  );

  const handleReviewAdd = (newReview: ReviewType) => {
    if (currentReviews) {
      setCurrentReviews([...currentReviews, newReview]);
    } else {
      setCurrentReviews([newReview]);
    }
  };

  return (
    <>
      <Text size="Medium" color="Black" fontFamily="YESGothic-Regular">
        {DETAIL_PAGE_REVIEW}
      </Text>
      <StyledReview>
        <ReviewCreate onReviewAdd={handleReviewAdd} userReview={userReview} />
        <ReviewItemList reviews={currentReviews} />
      </StyledReview>
    </>
  );
};

export default Review;

const StyledReview = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;
