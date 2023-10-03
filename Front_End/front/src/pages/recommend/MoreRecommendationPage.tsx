import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import { UserJoinInfoState } from "../store/State";
import { RECOMMEND_PAGE_MORE } from "../../commons/constants/String";
import { FlexColBetween } from "../../commons/style/SharedStyle";
import MoreRecommendMovie from "../../components/movies/MoreRecommendMovie";
import MoreRecommendOTT from "../../components/movies/MoreRecommendOTT";
import Text from "../../components/atoms/Text";
import { MainPaddingContainer } from "../../commons/style/layoutStyle";


const MoreRecommendationPage = () => {
  const [selectedOTT, setSelectedOTT] = useState<string | null>(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const listTypeParam = searchParams.get("type");

  const memberNickname = useRecoilValue(UserJoinInfoState).nickname

  return (
    <MainPaddingContainer>
      <Text size="Large" color="White" fontFamily="PyeongChang-Bold">
        {memberNickname}{RECOMMEND_PAGE_MORE}
      </Text>
      <StyledMoreRecommend>
        <MoreRecommendOTT onSelectOTT={setSelectedOTT} />
        <MoreRecommendMovie selectedOTT={selectedOTT} listType={listTypeParam} />
      </StyledMoreRecommend>
    </MainPaddingContainer>
  );
};

export default MoreRecommendationPage;

const StyledMoreRecommend = styled.div`
  ${FlexColBetween}
  gap: 16px;
`;
