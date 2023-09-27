import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  vertical: true,
  arrows: false,
};

const ProfileReviewItemList: React.FC<Props> = ({ reviews }) => {
  return (
    <Slider {...settings}>
      {reviews.map((review) => (
        <div key={review.reviewId}>
          <ProfileReviewItem review={review} />
        </div>
      ))}
    </Slider>
  );
};

export default ProfileReviewItemList;
