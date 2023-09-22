import React from "react";
import styled from "styled-components";

import { FlexColAround } from "../../commons/style/SharedStyle"
import Wrapper from "../../components/atoms/Wrapper";
import MovieDetail from "../../components/movies/MovieDetail";
import Review from "../../components/review/Review";

const ContentDetailPage = () => {
  return (
    <StyledDetail>
      <Wrapper size="Small" color="WhiteGhost" padding="Narrow">
        <MovieDetail />
      </Wrapper>
      
      <Wrapper size="Small" color="WhiteGhost" padding="Narrow">
        <Review />
      </Wrapper>
    </StyledDetail>
  );
};

export default ContentDetailPage;

const StyledDetail = styled.div`
  ${FlexColAround}
`
