import { useEffect, useState } from "react";

import Wrapper from "../atoms/Wrapper";
import Text from "../atoms/Text";
import LineChartWrapper from "../chart/LineChartWrapper";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { UserDetailInfoState } from "../../pages/store/State";
import RecommendMyOTTPlanet from "../users/RecommendMyOTTPlanet";
import { getMember } from "../../apis/FrontendApi";
import { UserType } from "../../pages/profile/MyProfilePage";
import {
  MY_PAGE_OTT,
  RECOMMEND_PAGE_CONTAINER_KEYWORD,
} from "../../commons/constants/String";

import { FlexRowBetween } from "../../commons/style/SharedStyle";

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
    <StyledWrapper
      size="YouTube"
      color="WhiteGhost"
      padding="Wide"
      className="mt-2"
    >
      <StyledYouTubeStar>
        <Text size="Medium" color="White" fontFamily="PyeongChang-Light">
          {RECOMMEND_PAGE_CONTAINER_KEYWORD}
        </Text>
        <LineChartWrapper chartWidth="100%" chartHeight="100%" />
      </StyledYouTubeStar>
      <StyledOTTPlanet>
        <Text size="Medium" color="White" fontFamily="PyeongChang-Light">
          {memberData?.nickname} {MY_PAGE_OTT}
        </Text>
        <RecommendMyOTTPlanet memberData={memberData} />
      </StyledOTTPlanet>
    </StyledWrapper>
  );
};

export default RecommendYouTube;

const StyledWrapper = styled(Wrapper)`
  ${FlexRowBetween}
  padding-left: 5%;
  padding-right: 5%;
`;

const StyledYouTubeStar = styled.div`
  width: 47%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 8px;
`;

const StyledOTTPlanet = styled.div`
  height: 100%;
  width: 47%;
  gap: 10px;
`;
