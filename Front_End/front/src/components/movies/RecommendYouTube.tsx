import React from "react";

import {
  RECOMMEND_PAGE_CONTAINER_KEYWORD,
  RECOMMEND_PAGE_CONTAINER_YOUTUBE,
} from "../../commons/constants/String";

import Wrapper from "../atoms/Wrapper";
import Text from "../atoms/Text";

const RecommendYouTube = () => {
  return (
    <Wrapper size="YouTube" color="WhiteGhost" padding="Narrow">
      <Text size="Medium" color="White" fontFamily="PyeongChang-Light">
        {RECOMMEND_PAGE_CONTAINER_KEYWORD}
      </Text>
      <Text size="Medium" color="White" fontFamily="PyeongChang-Light">
        {RECOMMEND_PAGE_CONTAINER_YOUTUBE}
      </Text>
    </Wrapper>
  );
};

export default RecommendYouTube;
