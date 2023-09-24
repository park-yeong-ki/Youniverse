import React from "react";

import { DETAIL_PAGE_YOUTUBE_VIDEO } from "../../commons/constants/String";
import Wrapper from "../atoms/Wrapper";
import Text from "../atoms/Text";

const MovieDetailYouTube = () => {
  return (
    <Wrapper size="Standard" color="WhiteGhost" padding="Narrow">
      <Text size="Medium" color="Black" fontFamily="PyeongChang-Light">
        {DETAIL_PAGE_YOUTUBE_VIDEO}
      </Text>
    </Wrapper>
  );
};

export default MovieDetailYouTube;