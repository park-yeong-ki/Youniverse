import { ReviewType } from "../../pages/recommend/ContentDetailPage";
import { deleteReview } from "../../apis/FrontendApi";
import { DELETE } from "../../commons/constants/String";
import Btn from "../atoms/Btn";

interface ReviewItemProps {
  memberId: number | null; // memberId prop 추가
  review: ReviewType;
  onReviewDelete: (reviewId: number) => void;
}

const ReviewItem: React.FC<ReviewItemProps> = ({
  memberId,
  review,
  onReviewDelete,
}) => {
  const isReviewOwner = memberId === review.memberSimpleResDto.memberId;

  const handleReviewDel = async () => {
    try {
      await deleteReview(review.reviewId);
      onReviewDelete(review.reviewId);
      alert("리뷰가 삭제되었습니다.");
    } catch (error) {
      console.log("리뷰삭제안됨여", error);
    }
  };
  return (
    <div>
      <p>작성자: {review.memberSimpleResDto.nickname}</p>
      <p>별점: {review.reviewRate}</p>
      <p>리뷰: {review.reviewContent}</p>
      <p>ReviewId: {review.reviewId}</p>
      {isReviewOwner && (
        <Btn size="Medium" color="White" onClick={handleReviewDel}>
          {DELETE}
        </Btn>
      )}
    </div>
  );
};

export default ReviewItem;
