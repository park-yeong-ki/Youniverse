import React from "react";
import styled from "styled-components";
import { SectionsContainer, Section } from "react-fullpage";
import { useRecoilValue } from "recoil";

import RecommendSection from "../../components/movies/RecommendSection";
import RecommendNotYouTube from "../../components/movies/RecommendNotYouTube";
// import { MainContainer } from "./../../commons/style/layoutStyle";

import { UserJoinInfoState } from "./../../pages/store/State";

const RecommendationMainPage = () => {
  let options = {
    anchors: ["YouTube", "Recommend"],
  };

  const memberAge = useRecoilValue(UserJoinInfoState).age;
  const memberGender = useRecoilValue(UserJoinInfoState).gender;

  return (
    <>
      <SectionsContainer {...options}>
        <CustomSection>
          <RecommendSection />
        </CustomSection>
        <CustomSection>
          <RecommendNotYouTube
            lists={[
              "선호도기반 추천 영화",
              `${memberAge}세 ${memberGender} 추천 영화`,
            ]}
          />
        </CustomSection>
      </SectionsContainer>
    </>
  );
};

export default RecommendationMainPage;

const CustomSection = styled(Section)`
  width: 100%;
  height: calc(100vh - 70px);
  /* display: flex;
  flex-direction: column; */
`;
