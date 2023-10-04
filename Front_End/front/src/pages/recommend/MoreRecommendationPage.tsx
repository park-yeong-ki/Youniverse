import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
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
  const listTypeParam = searchParams.get("sort");
  const { sort } = useParams<{ sort?: string }>();
  const memberNickname = useRecoilValue(UserJoinInfoState).nickname;
  const memberAge = useRecoilValue(UserJoinInfoState).age;
  const memberGender = useRecoilValue(UserJoinInfoState).gender;

  const getRecommendationType = (sort: string | null | undefined) => {
    switch (Number(sort)) {
      case 1:
        return "선호도조사 기반";
      case 2:
        return `${memberAge}세 ${memberGender}`;
      case 3:
        return "유튜브 기반";
      default:
        return "";
    }
  };

  return (
    <MainPaddingContainer>
      <Text size="Large" color="White" fontFamily="PyeongChang-Bold">
        {memberNickname}님의 {getRecommendationType(sort ?? null)}
        {RECOMMEND_PAGE_MORE}
      </Text>
      <StyledMoreRecommend>
        <MoreRecommendOTT onSelectOTT={setSelectedOTT} />
        <MoreRecommendMovie
          selectedOTT={selectedOTT}
          listType={listTypeParam}
        />
      </StyledMoreRecommend>
    </MainPaddingContainer>
  );
};

export default MoreRecommendationPage;

const StyledMoreRecommend = styled.div`
  ${FlexColBetween}
  gap: 16px;
`;
