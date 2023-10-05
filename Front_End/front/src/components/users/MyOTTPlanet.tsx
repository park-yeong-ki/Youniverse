// 마이페이지에서 ㅇㅇ님의 OTT 행성 컴포넌트

import { useState, useEffect } from "react";
import styled from "styled-components";
import {
  MY_PAGE_OTT,
  MY_PAGE_OTT_RECOMMEND,
  MY_PAGE_OTT_CHART,
} from "../../commons/constants/String";
import Text from "../atoms/Text";
import Wrapper from "../atoms/Wrapper";
import {
  FlexColBetween,
  FlexRowAround,
  FlexRowBetween,
} from "../../commons/style/SharedStyle";
import { UserType } from "../../pages/profile/MyProfilePage";
import { getAllOTTs } from "../../apis/FrontendApi";
import OTTBarChart from "../chart/OTTBarChart";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../commons/constants/Routes";

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

const MyOTTPlanet: React.FC<MyOTTPlanetProps> = ({ memberData }) => {
  const navigate = useNavigate();
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

    if (mostUsed.count === 0) {
      const defaultOtt = {
        ottName: "-",
        ottImage: "/assets/Logo/All.png",
        count: 0,
        ottId: 0,
        ottUrl: "",
      };
      setMostUsedOtt(defaultOtt);
    } else {
      setMostUsedOtt(mostUsed);
    }

    setOttWithRatios(ottRatios);
  }, [completeOttData]); // completeOttData가 변경될 때 데이터를 다시 계산
  console.log(allOttData);

  console.log("가장 많이 추천된", mostUsedOtt);
  console.log("ott 사용 비율", ottWithRatios);

  const handleNavigateMore = () => {
    navigate(ROUTES.RECOMMEND_MORE);
  };

  return (
    <StyledAllWrapper>
      <StyledTextWrapper>
        <Text size="Medium" color="White" fontFamily="PyeongChang-Bold">
          {memberData?.nickname}
          {MY_PAGE_OTT}
        </Text>
        {/* 클릭하면 이동하게 변경 @@@ */}
        <Text
          size="Small"
          color="White"
          fontFamily="YESGothic-Regular"
          onClick={handleNavigateMore}
        >
          {MY_PAGE_OTT_RECOMMEND}
        </Text>
      </StyledTextWrapper>
      {/* OTT 행성 Wrapper */}
      <StyledOTTWrapper
        size="Standard"
        color="WhiteGhost"
        padding="Narrow"
        className="mt-2"
      >
        {/* 행성 + 이름 (유저 정보에 따라 변경하기) */}
        <StyledPlanetWrapper>
          <StyledColCenter>
            <Text size="Medium" color="Black" fontFamily="YESGothic-Bold">
              {mostUsedOtt?.ottName}
            </Text>
            <img src={mostUsedOtt?.ottImage || ""} alt={mostUsedOtt?.ottName} />
          </StyledColCenter>
        </StyledPlanetWrapper>

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

export default MyOTTPlanet;

const StyledTextWrapper = styled.div`
  ${FlexRowBetween}
`;

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

const StyledPlanetWrapper = styled.div`
  width: 30%;
`;
