import ProfileReviewItem from "./ProfileReviewItem";

// 프로필에서 보여지는 리뷰 여러 개
type Keyword = {
  keywordId: number;
  keywordName: string;
  source: number;
};

type MovieSimpleResDto = {
  movieId: number;
  title: string;
  movieImage: string;
  keywordResDtos: Keyword[];
  rate: number;
  runtime: number;
};

export type ReviewItem = {
  reviewId: number;
  movieSimpleResDto: MovieSimpleResDto;
  reviewContent: string;
  reviewRate: number;
};

interface Props {
  reviews: ReviewItem[];
}

const ProfileReviewItemList: React.FC<Props> = ({ reviews }) => {
  return (
    <div>
      {reviews.map((review) => (
        <ProfileReviewItem key={review.reviewId} review={review} />
      ))}
    </div>
  );
};

export default ProfileReviewItemList;
