import React, { useState, useEffect } from "react";
import Wrapper from "../atoms/Wrapper";
import ReviewItem from "./ReviewItem";
import { getReview } from "../../apis/FrontendApi";

export type ReviewType = {
  id: number;
  memberId: number;
  movieId: number;
  reviewContent: string;
  reviewRate: number;
};

const ReviewItemList = () => {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const movieId = 7; // 임시로 설정한 값. 실제로는 선택된 영화의 ID를 사용해야 합니다.

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getReview(movieId); // 영화 ID를 파라미터로 넘겨줍니다.
        setReviews(response.data); // 응답 받은 리뷰 데이터를 상태로 설정합니다.
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };

    fetchReviews(); // 리뷰 조회 함수 호출
  }, [movieId]);

  return (
    <Wrapper size="YouTube" color="WhiteGhost" padding="Narrow">
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
      리뷰목록인데여
    </Wrapper>
  );
};
export default ReviewItemList;
