// 프로필에서 보여지는 리뷰 한 개
import { useState, useEffect } from "react";
import { ReviewItem } from "./ProfileReviewItemList";
import { MovieType } from "../../pages/recommend/ContentDetailPage";
import { getMovie } from "../../apis/FrontendApi";

interface ReviewProps {
  review: ReviewItem;
}

const ProfileReviewItem: React.FC<ReviewProps> = ({ review }) => {
  const {
    movieSimpleResDto: { movieId, title },
    reviewContent,
    reviewRate,
  } = review;
  const [movieDetailInfo, setMovieDetailInfo] = useState<MovieType | null>(
    null
  );

  useEffect(() => {
    const MovieDetail = async () => {
      try {
        const response = await getMovie(movieId);
        setMovieDetailInfo(response.data);
      } catch (error) {
        console.error("영화 정보 가져오기 실패:", error);
      }
    };

    MovieDetail();
  }, [movieId]);

  return (
    <>
      <div>
        <div>
          <div>{title}</div>
          <div>{movieDetailInfo?.directorResDtos[0]?.directorName}</div>
        </div>
        <div>{reviewRate}</div>
      </div>

      <div>{reviewContent}</div>
    </>
  );
};

export default ProfileReviewItem;
