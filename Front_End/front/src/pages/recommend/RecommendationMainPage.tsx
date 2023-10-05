import React from "react";
import styled from "styled-components";
import { SectionsContainer, Section } from "react-fullpage";
import { useRecoilValue } from "recoil";
import RecommendSection from "../../components/movies/RecommendSection";
import RecommendNotYouTube from "../../components/movies/RecommendNotYouTube";
import { UserDetailInfoState } from "./../../pages/store/State";

const RecommendationMainPage = () => {
  let options = {
    anchors: ["YouTube", "Recommend"],
  };

  const memberAge = useRecoilValue(UserDetailInfoState).age;
  const memberGender = useRecoilValue(UserDetailInfoState).gender;
  const memberNickname = useRecoilValue(UserDetailInfoState).nickname;

  return (
    <>
      <SectionsContainer {...options}>
        <CustomSection>
          <RecommendSection />
        </CustomSection>
        <CustomSection>
          <RecommendNotYouTube
            lists={[
              `${memberNickname}님의 선호도 기반 추천 영화`,
              `${memberAge}세 ${memberGender}인 ${memberNickname}님을 위한 추천 영화`,
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
`;
