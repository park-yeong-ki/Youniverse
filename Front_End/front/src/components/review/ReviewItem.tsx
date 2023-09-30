import { ReviewType } from "../../pages/recommend/ContentDetailPage";

interface ReviewItemProps {
  memberId: number | null; // memberId prop 추가
  review: ReviewType;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ memberId, review }) => {
  // 현재 사용자가 리뷰의 주인인지 확인
  const isReviewOwner = memberId === review.memberSimpleResDto.memberId;

  // 현재 사용자가 리뷰의 주인이라면 아무것도 반환하지 않음
  if (isReviewOwner) return null;

  return (
    <div>
      <p>작성자: {review.memberSimpleResDto.nickname}</p>
      <p>별점: {review.reviewRate}</p>
      <p>리뷰: {review.reviewContent}</p>
      <p>ReviewId: {review.reviewId}</p>
    </div>
  );
};

export default ReviewItem;
