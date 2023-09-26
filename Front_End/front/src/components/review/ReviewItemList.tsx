import React from "react";
import Wrapper from "../atoms/Wrapper";
import ReviewItem from "./ReviewItem";

import { ReviewType } from "../../pages/recommend/ContentDetailPage"; // Import from ContentDetailPage.tsx

interface ReviewItemListProps {
  reviews: ReviewType[] | null;
  onReviewDelete: (reviewId: number) => void;
}


const ReviewItemList: React.FC<ReviewItemListProps> = ({ reviews, onReviewDelete }) => { 
  return (
    <Wrapper size="YouTube" color="WhiteGhost" padding="Narrow">
      {reviews &&
        reviews.map((review) => (
          <ReviewItem key={review.reviewId} review={review} onReviewDelete={onReviewDelete} />
        ))}
    </Wrapper>
  );
};

export default ReviewItemList;
