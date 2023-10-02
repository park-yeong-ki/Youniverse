import React, { useState } from "react";

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
      <Text size="Medium" color="Black" fontFamily="PyeongChang-Light">
        {DETAIL_PAGE_REVIEW}
      </Text>
      <div className="flex gap-4">
        <div className="w-1/6 h-full">
          <ReviewCreate onReviewAdd={handleReviewAdd} userReview={userReview} />
        </div>
        <div className="w-5/6 h-full">
          <ReviewItemList reviews={currentReviews} />
        </div>
      </div>
    </>
);

};

export default Review;
