import React, { useState } from "react";
import styled from "styled-components";

import ReviewCreate from "./ReviewCreate";
import ReviewItemList from "./ReviewItemList";
import { FlexRowBetween } from "../../commons/style/SharedStyle";
import { ReviewType } from "../../pages/recommend/ContentDetailPage";

interface ReviewProps {
  reviews: ReviewType[] | null;
}

const Review: React.FC<ReviewProps> = ({ reviews: initialReviews }) => {
  const [reviews, setReviews] = useState<ReviewType[] | null>(initialReviews);

  const handleReviewAdd = (newReview: ReviewType) => {
    if (reviews) {
      setReviews([...reviews, newReview]);
    } else {
      setReviews([newReview]);
    }
  };

  const handleReviewDelete = (reviewId: number) => {
    if (reviews) {
      setReviews(reviews.filter((review) => review.reviewId !== reviewId));
    }
  };

  return (
    <StyledReview>
      <ReviewCreate onReviewAdd={handleReviewAdd} />
      <ReviewItemList reviews={reviews} onReviewDelete={handleReviewDelete} />
    </StyledReview>
  );
};

export default Review

const StyledReview = styled.div`
  ${FlexRowBetween}
`;
