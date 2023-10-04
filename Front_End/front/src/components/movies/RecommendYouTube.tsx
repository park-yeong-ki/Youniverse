import { useEffect, useState } from "react";

import {
  RECOMMEND_PAGE_CONTAINER_KEYWORD,
  RECOMMEND_PAGE_CONTAINER_YOUTUBE,
} from "../../commons/constants/String";

import { FlexRowBetween } from "../../commons/style/SharedStyle";

import Wrapper from "../atoms/Wrapper";
import Text from "../atoms/Text";
import LineChartWrapper from "../chart/LineChartWrapper";
import styled from "styled-components";
import MyOTTPlanet from "../users/MyOTTPlanet";
import { useRecoilValue } from "recoil";
import { UserDetailInfoState } from "../../pages/store/State";
import { getMember } from "../../apis/FrontendApi";
import { UserType } from "../../pages/profile/MyProfilePage";

const RecommendYouTube = () => {
  const currentId = useRecoilValue(UserDetailInfoState).memberId;
  const [memberData, setMemberData] = useState<UserType | null>(null);

  useEffect(() => {
    getMember(Number(currentId))
      .then((response) => {
        console.log("개별 회원 조회", `${currentId}번 회원=`, response.data);
        setMemberData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentId]);

  return (
    <StyledWrapper size="YouTube" color="WhiteGhost" padding="Narrow">
      <StyledYouTubeStar>
        <Text size="Medium" color="White" fontFamily="PyeongChang-Light">
          {RECOMMEND_PAGE_CONTAINER_KEYWORD}
        </Text>
        <LineChartWrapper chartWidth="100%" chartHeight="100%" />
      </StyledYouTubeStar>
      <StyledYouTubeRec>
        <Text size="Medium" color="White" fontFamily="PyeongChang-Light">
          {RECOMMEND_PAGE_CONTAINER_YOUTUBE}
        </Text>
        <MyOTTPlanet memberData={memberData} />
      </StyledYouTubeRec>
    </StyledWrapper>
  );
};

export default RecommendYouTube;

const StyledWrapper = styled(Wrapper)`
  ${FlexRowBetween}
`;

const StyledYouTubeStar = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledYouTubeRec = styled.div`
  width: 56%;
`;
