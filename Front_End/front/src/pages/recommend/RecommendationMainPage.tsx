import React from "react";
import styled from 'styled-components';
import { SectionsContainer, Section } from "react-fullpage";

import RecommendSection from "../../components/movies/RecommendSection";
import RecommendNotYouTube from "../../components/movies/RecommendNotYouTube";
import { MainContainer } from './../../commons/style/layoutStyle';

const RecommendationMainPage = () => {
  let options = {
    anchors: ["YouTube", "Recommend1", "Recommend2"],
  };

  return (
    <div>
      <SectionsContainer {...options}>
        <CustomSection><MainContainer><RecommendSection/></MainContainer></CustomSection>
        <CustomSection>
          <MainContainer>
            <RecommendNotYouTube lists={["선호도기반 추천", "인생영화 추천"]} />
          </MainContainer>
        </CustomSection>
        <CustomSection>
          <MainContainer>
            <RecommendNotYouTube lists={["평점 기반 추천", "20대 여성 추천"]} />
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
