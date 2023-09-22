import React from "react";
import styled from "styled-components";

import ReviewCreate from "./ReviewCreate";
import ReviewItemList from "./ReviewItemList";
import { FlexRowBetween } from "../../commons/style/SharedStyle";

const Review = () => {
  return (
    <StyledReview>
      <ReviewCreate />
      <ReviewItemList />
    </StyledReview>
  );
};
export default Review;

const StyledReview = styled.div`
  ${FlexRowBetween}
`;
