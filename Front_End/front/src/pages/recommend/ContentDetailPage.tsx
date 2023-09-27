import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { SectionsContainer, Section } from "react-fullpage";
import { getMovie } from "../../apis/FrontendApi";
import { FlexColAround } from "../../commons/style/SharedStyle";
import Wrapper from "../../components/atoms/Wrapper";
import MovieDetail from "../../components/movies/MovieDetail";
import Review from "../../components/review/Review";
import MovieDetailYouTube from "../../components/movies/MovieDetailYouTube";
import { MainPaddingContainer } from "../../commons/style/layoutStyle";
import { MovieType } from "../../components/movies/MovieItemList";


export type ReviewType = {
  memberSimpleResDto: {
    memberId: number;
    nickname: string;
    memberImage: string | null;
  };
  reviewContent: string;
  reviewId: number;
  reviewRate: number;
};

const ContentDetailPage = () => {
  // 영화 상세 정보 가져오는 axios 요청
  const [movie, setMovie] = useState<MovieType | null>(null);
  const [reviews, setReviews] = useState<ReviewType[] | null>(null);

  const { movieId } = useParams<{ movieId: string }>();

  useEffect(() => {
    getMovie(Number(movieId))
      .then((response) => {
        console.log("영화 상세정보 axios", response.data);
        console.log("리뷰 정보", response.data.reviewResDtos);
        setMovie(response.data);
        setReviews(response.data.reviewResDtos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [movieId]);

  let options = {
    anchors: ["MovieDetail", "YouTubeRecommend"],
  };

  return (
    <SectionsContainer {...options}>
      <CustomSection>
        <MainPaddingContainer>
          <StyledDetail>
            <Wrapper size="Small" color="WhiteGhost" padding="Narrow">
              {movie && <MovieDetail movie={movie} />}
            </Wrapper>

            <Wrapper size="Small" color="WhiteGhost" padding="Narrow">
              {reviews && <Review reviews={reviews} />}
            </Wrapper>
          </StyledDetail>
        </MainPaddingContainer>
      </CustomSection>

      <CustomSection>
        <MainPaddingContainer>
          <MovieDetailYouTube />
        </MainPaddingContainer>
      </CustomSection>
    </SectionsContainer>
  );
};

export default ContentDetailPage;

const StyledDetail = styled.div`
  ${FlexColAround}
`;

const CustomSection = styled(Section)`
  /* height: calc(100vh - 70px); */
`;
