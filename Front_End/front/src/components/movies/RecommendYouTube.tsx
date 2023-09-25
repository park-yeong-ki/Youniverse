import React from "react";

import {
  RECOMMEND_PAGE_CONTAINER_KEYWORD,
  RECOMMEND_PAGE_CONTAINER_YOUTUBE,
} from "../../commons/constants/String";

import {
  FlexRowBetween,
} from "../../commons/style/SharedStyle";

import Wrapper from "../atoms/Wrapper";
import Text from "../atoms/Text";
import LineChartWrapper from "../chart/LineChartWrapper";
import styled from "styled-components";

const RecommendYouTube = () => {
  return (
    <StyledWrapper size="YouTube" color="WhiteGhost" padding="Narrow">
      <StyledYouTubeStar>
        <Text size="Medium" color="White" fontFamily="PyeongChang-Light">
          {RECOMMEND_PAGE_CONTAINER_KEYWORD}
        </Text>
        <LineChartWrapper chartWidth="100%" chartHeight="100%" />
      </StyledYouTubeStar>
      <StyledYouTubeRec>
        <Text size="Medium" color="White" fontFamily="PyeongChang-Light">
          {RECOMMEND_PAGE_CONTAINER_YOUTUBE}
        </Text>
      </StyledYouTubeRec>
    </StyledWrapper>
  );
};

export default RecommendYouTube;

const StyledWrapper = styled(Wrapper)`
  ${FlexRowBetween}
`;

const StyledYouTubeStar = styled.div`
  width: 40%;
`;

const StyledYouTubeRec = styled.div`
  width: 56%;
`;
