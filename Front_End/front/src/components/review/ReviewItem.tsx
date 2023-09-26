import { ReviewType } from "./ReviewItemList";

interface ReviewItemProps {
    review: ReviewType;
  }
  
  const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
      return (
          <div>
              <p>Author: {review.memberId}</p> {/* 리뷰 작성자 */}
              <p>Rating: {review.reviewRate}</p> {/* 리뷰 별점 */}
              <p>Content: {review.reviewContent}</p> {/* 리뷰 내용 */}
          </div>
      );
  };
  export default ReviewItem;
  