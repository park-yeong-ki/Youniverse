import React, { useState } from "react";
import styled from "styled-components";

import { RECOMMEND_PAGE_MORE } from "../../commons/constants/String";
import { FlexColBetween } from "../../commons/style/SharedStyle";
import MoreRecommendMovie from "../../components/movies/MoreRecommendMovie";
import MoreRecommendOTT from "../../components/movies/MoreRecommendOTT";
import Text from "../../components/atoms/Text";

const MoreRecommendationPage = () => {
  const [selectedOTT, setSelectedOTT] = useState<string | null>(null);

  return (
    <>
      <Text size="Large" color="White" fontFamily="PyeongChang-Bold">
        {RECOMMEND_PAGE_MORE}
      </Text>
      <StyledMoreRecommend>
        <MoreRecommendOTT onSelectOTT={setSelectedOTT} />
        <MoreRecommendMovie selectedOTT={selectedOTT} />
      </StyledMoreRecommend>
    </>
  );
};

export default MoreRecommendationPage;

const StyledMoreRecommend = styled.div`
  ${FlexColBetween}
`;
