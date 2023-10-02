import React from "react";
import styled from 'styled-components';
import { SectionsContainer, Section } from "react-fullpage";
import { useRecoilValue } from "recoil";

import RecommendSection from "../../components/movies/RecommendSection";
import RecommendNotYouTube from "../../components/movies/RecommendNotYouTube";
import { MainContainer } from './../../commons/style/layoutStyle';

import { UserJoinInfoState } from './../../pages/store/State';

const RecommendationMainPage = () => {
  let options = {
    anchors: ["YouTube", "Recommend1", "Recommend2"],
  };

const memberAge = useRecoilValue(UserJoinInfoState).age
const memberGender = useRecoilValue(UserJoinInfoState).gender

  return (
    <div>
      <SectionsContainer {...options}>
        <CustomSection><MainContainer><RecommendSection/></MainContainer></CustomSection>
        <CustomSection>
          <MainContainer>
            <RecommendNotYouTube lists={["선호도기반 추천 영화", `${memberAge}세 ${memberGender} 추천 영화`]} />
          </MainContainer>
        </CustomSection>
        <CustomSection>
          <MainContainer>
            <RecommendNotYouTube lists={["평점 기반 추천 영화", "인생영화 추천"]} />
          </MainContainer>
        </CustomSection>
      </SectionsContainer>
    </div>
  );
};

export default RecommendationMainPage;

const CustomSection = styled(Section)`
  height: calc(100vh - 70px);
`;
