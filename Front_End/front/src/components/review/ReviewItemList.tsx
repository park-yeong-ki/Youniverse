import React from "react";
import { useRecoilValue } from "recoil";
import Wrapper from "../atoms/Wrapper";
import ReviewItem from "./ReviewItem";

import { UserDetailInfoState } from "../../pages/store/State";
import { ReviewType } from "../../pages/recommend/ContentDetailPage"; // Import from ContentDetailPage.tsx
import styled from "styled-components";

interface ReviewItemListProps {
  reviews: ReviewType[] | null;
}

const ReviewItemList: React.FC<ReviewItemListProps> = ({
  reviews,
}) => {
  const memberId = useRecoilValue(UserDetailInfoState).memberId;
  return (
    <StyledWrapper size="Small" color="WhiteGhost" padding="Narrow">
      {reviews &&
        reviews.map((review) => (
          <ReviewItem
            memberId={memberId}
            key={review.reviewId}
            review={review}
          />
        ))}
    </StyledWrapper>
  );
};

export default ReviewItemList;

const StyledWrapper = styled(Wrapper)`
height: 242px;
overflow-y: scroll;
`