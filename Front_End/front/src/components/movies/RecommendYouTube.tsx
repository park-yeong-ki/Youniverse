import React from "react";

import {
  RECOMMEND_PAGE_CONTAINER_KEYWORD,
  RECOMMEND_PAGE_CONTAINER_YOUTUBE,
} from "../../commons/constants/String";

import Wrapper from "../atoms/Wrapper";
import Text from "../atoms/Text";
import LineChartWrapper from "../chart/LineChartWrapper";

const RecommendYouTube = () => {
  return (
    <Wrapper size="YouTube" color="WhiteGhost" padding="Narrow">
      <div>
        <Text size="Medium" color="White" fontFamily="PyeongChang-Light">
          {RECOMMEND_PAGE_CONTAINER_KEYWORD}
        </Text>
        <LineChartWrapper
          size="RecommendedChart"
          chartWidth={220}
          chartHeight={110}
        />
      </div>
      <Text size="Medium" color="White" fontFamily="PyeongChang-Light">
        {RECOMMEND_PAGE_CONTAINER_YOUTUBE}
      </Text>
    </Wrapper>
  );
};

export default RecommendYouTube;
