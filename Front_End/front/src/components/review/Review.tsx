import React from "react";
import styled from "styled-components";

import ReviewCreate from "./ReviewCreate";
import ReviewItemList from "./ReviewItemList";
import { FlexRowBetween } from "../../commons/style/SharedStyle";
import { ReviewType } from "../../pages/recommend/ContentDetailPage";

interface ReviewProps {
  reviews: ReviewType[] | null;
}

const Review: React.FC<ReviewProps> = ({ reviews }) => {
  return (
    <StyledReview>
      <ReviewCreate />
      <ReviewItemList reviews={reviews} />
    </StyledReview>
  );
};

export default Review;

const StyledReview = styled.div`
  ${FlexRowBetween}
`;
