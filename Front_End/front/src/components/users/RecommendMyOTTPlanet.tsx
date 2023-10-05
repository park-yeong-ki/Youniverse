// 추천페이지에서 ㅇㅇ님의 OTT 행성 컴포넌트

import { useState, useEffect } from "react";
import styled from "styled-components";
import { MY_PAGE_OTT_CHART } from "../../commons/constants/String";
import Planet from "../atoms/Planet";
import Text from "../atoms/Text";
import Wrapper from "../atoms/Wrapper";
import { FlexColBetween, FlexRowAround } from "../../commons/style/SharedStyle";
import { UserType } from "../../pages/profile/MyProfilePage";
import { getAllOTTs } from "../../apis/FrontendApi";
import OTTBarChart from "../chart/OTTBarChart";

interface MyOTTPlanetProps {
  memberData: UserType | null;
}

interface OTTData {
  count: number;
  ottId: number;
  ottName: string;
  ottUrl: string;
  ottImage: string;
}

interface RatioOTTData extends OTTData {
  ratio: number;
}

const RecommendMyOTTPlanet: React.FC<MyOTTPlanetProps> = ({ memberData }) => {
  const recommendOttData = memberData?.recommendOttResDtos; // 가져온 user ott 정보
  const [completeOttData, setCompleteOttData] = useState<OTTData[]>([]);
  const [allOttData, setAllOttData] = useState([]); // 모든 ott 정보

  const [mostUsedOtt, setMostUsedOtt] = useState<OTTData | null>(null);
  const [ottWithRatios, setOttWithRatios] = useState<RatioOTTData[]>([]);

  useEffect(() => {
    getAllOTTs()
      .then((response) => {
        setAllOttData(response.data);

        // 이 곳에서 데이터 병합 로직을 수행하고 completeOttData를 설정합니다.
        const combinedData = response.data.map((ott: any) => {
          const userOtt = recommendOttData?.find(
            (uOtt) => uOtt.ottId === ott.ottId
          );
          return userOtt
            ? { ...ott, count: userOtt.count }
            : { ...ott, count: 0 };
        });
        setCompleteOttData(combinedData);
      })
      .catch((error) => console.log(error));
  }, [recommendOttData]);

  useEffect(() => {
    // 가장 많이 사용된 OTT 찾기
    const mostUsed = completeOttData.reduce(
      (max, ott) => (max.count > ott.count ? max : ott),
      { count: 0 } as OTTData
    );

    // 전체 count 합계 계산
    const totalCount = completeOttData.reduce((sum, ott) => sum + ott.count, 0);

    // 각 OTT의 사용 비율 계산
    const ottRatios = completeOttData.map((ott) => ({
      ...ott,
      ratio: totalCount === 0 ? 0 : ott.count / totalCount,
    }));

    // 상태 업데이트
    setMostUsedOtt(mostUsed);
    setOttWithRatios(ottRatios);
  }, [completeOttData]); // completeOttData가 변경될 때 데이터를 다시 계산
  console.log(allOttData);

  console.log("가장 많이 추천된", mostUsedOtt);
  console.log("ott 사용 비율", ottWithRatios);

  return (
    <StyledAllWrapper>
      {/* OTT 행성 Wrapper */}
      <StyledOTTWrapper
        size="Standard"
        color="WhiteGhost"
        padding="Wide"
        className="mt-2"
      >
        {/* 행성 + 이름 (유저 정보에 따라 변경하기) */}
        <StyledColCenter>
          <Text size="Medium" color="Black" fontFamily="YESGothic-Bold">
            {mostUsedOtt?.ottName}
          </Text>
          <Planet
            size="Medium"
            src={mostUsedOtt?.ottImage || ""}
            $mypage={true}
          />
        </StyledColCenter>

        {/* 중간 나누는 선 */}
        <StyledDivideLine />

        {/* OTT별 가지고 있는 컨텐츠 차트 (유저 정보에 따라 변경하기) */}
        <StyledColCenter>
          <Text size="Small" color="Black" fontFamily="YESGothic-Regular">
            {MY_PAGE_OTT_CHART} <b>{mostUsedOtt?.ottName}</b>
          </Text>
          {/* 여기에 차트 들어가요! */}
          <div>
            <OTTBarChart data={ottWithRatios} />
          </div>
        </StyledColCenter>
      </StyledOTTWrapper>
    </StyledAllWrapper>
  );
};

export default RecommendMyOTTPlanet;

const StyledDivideLine = styled.div`
  height: 90%;
  border: 1px solid #ccc;
`;

const StyledOTTWrapper = styled(Wrapper)`
  ${FlexRowAround}
`;

/** 전체 wrapper 텍스트와 콘텐츠 비율 설정 */
export const StyledAllWrapper = styled.div`
  height: 100%;
  & > *:first-child {
    height: 15%;
  }
  & > *:last-child {
    height: 85%;
  }
`;

const StyledColCenter = styled.div`
  ${FlexColBetween}
  height: 100%;
`;
