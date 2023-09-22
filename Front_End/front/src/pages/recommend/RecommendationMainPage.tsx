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
        <CustomSection><MainContainer><RecommendNotYouTube/></MainContainer></CustomSection>
        <CustomSection><MainContainer><RecommendNotYouTube/></MainContainer></CustomSection>
      </SectionsContainer>
    </div>
  );
};

export default RecommendationMainPage;

const CustomSection = styled(Section)`
  height: calc(100vh - 70px);
`;
