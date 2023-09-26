import React from "react";
import styled from "styled-components";
import { SectionsContainer, Section } from "react-fullpage";

import { FlexColAround } from "../../commons/style/SharedStyle";
import Wrapper from "../../components/atoms/Wrapper";
import MovieDetail from "../../components/movies/MovieDetail";
import Review from "../../components/review/Review";
import MovieDetailYouTube from "../../components/movies/MovieDetailYouTube";
import { MainPaddingContainer } from "../../commons/style/layoutStyle";

const ContentDetailPage = () => {
  // 영화 상세 정보 가져오는 axios 요청

  let options = {
    anchors: ["MovieDetail", "YouTubeRecommend"],
  };

  return (
    <SectionsContainer {...options}>
      <CustomSection>
        <MainPaddingContainer>
          <StyledDetail>
            <Wrapper size="Small" color="WhiteGhost" padding="Narrow">
              <MovieDetail />
            </Wrapper>

            <Wrapper size="Small" color="WhiteGhost" padding="Narrow">
              <Review />
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
