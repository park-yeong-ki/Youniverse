import React, { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserJoinInfoState } from "../../pages/store/State";
import { ROUTES } from "../../commons/constants/Routes";
import Planet from "../atoms/Planet";
import Btn from "../atoms/Btn";
import Text from "../../components/atoms/Text";
import { NEXT } from "../../commons/constants/String";
import {
  FlexColBetween,
  FlexRowBetween,
} from "../../commons/style/SharedStyle";
import { getAllOTTs } from "../../apis/FrontendApi";

const OTTForm = () => {
  const navigate = useNavigate();
  const setUserJoinInfo = useSetRecoilState(UserJoinInfoState);
  const [selectedPlanets, setSelectedPlanets] = useState<number[]>([]);
  const [planetSelectedStates, setPlanetSelectedStates] = useState<
    Record<number, boolean>
  >({});

  // OTT 데이터를 담을 상태
  const [ottData, setOttData] = useState<any[]>([]);

  useEffect(() => {
    getAllOTTs()
      .then((response) => {
        console.log(response.data);
        setOttData(response.data);
        // 백서버에서 가져온 데이터를 기반으로 planetSelectedStates 초기화
        const initialPlanetStates: Record<number, boolean> = {};
        response.data.forEach((ott: any) => {
          initialPlanetStates[ott.ottId] = false;
        });
        setPlanetSelectedStates(initialPlanetStates);
      })
      .catch((error) => {
        console.error("OTT 리스트 가져오기 실패:", error);
      });
  }, []);

  const handleClickedPlanets = (planetId: number, $isSelected: boolean) => {
    if (selectedPlanets.includes(planetId)) {
      // 행성 이름이 이미 selectedPlanets에 있다면 제거
      setSelectedPlanets((prev) => {
        const updatedPlanets = prev.filter((id) => id !== planetId);
        console.log("Updated Planets:", updatedPlanets); // 상태 출력
        return updatedPlanets;
      });
    } else {
      // 행성 이름이 selectedPlanets에 없다면 추가
      setSelectedPlanets((prev) => {
        const updatedPlanets = [...prev, planetId];
        console.log("Updated Planets:", updatedPlanets); // 상태 출력
        return updatedPlanets;
      });
    }
    // 각 행성의 클릭 상태를 저장
    setPlanetSelectedStates((prev) => ({
      ...prev,
      [planetId]: $isSelected,
    }));
  };

  const handleSaveClick = () => {
    setUserJoinInfo((prev) => ({
      ...prev,
      ottList: selectedPlanets, // OTT 선택 정보 업데이트
    }));
    navigate(ROUTES.SURVEY);
  };

  return (
    <OTTFormContainer>
      <StyledContainer>
        {ottData.map((ott) => (
          <PlanetWrapper
            key={ott.ottId}
            $isSelected={planetSelectedStates[ott.ottId]}
          >
            <Planet
              size="Standard"
              planetId={ott.ottId}
              src={ott.ottImage} // 백서버에서 받아온 이미지 URL
              name={ott.ottName}
              handleClickedPlanets={handleClickedPlanets}
            />
            <div>{ott.ottName}</div>
          </PlanetWrapper>
        ))}
      </StyledContainer>
      <StyledNextButton size="X-Large" color="Ghost" onClick={handleSaveClick}>
        <Text size="Medium" color="Black" fontFamily="YESGothic-Regular">
          {NEXT}
        </Text>
      </StyledNextButton>
    </OTTFormContainer>
  );
};

export default OTTForm;

const OTTFormContainer = styled.div`
  ${FlexColBetween}
  height: 500px;
`;

const StyledContainer = styled.div`
  ${FlexRowBetween}
  height: 80%;
  width: 100%;
`;

const PlanetWrapper = styled.div<{ $isSelected: boolean }>`
  ${FlexColBetween}
  height: 70%;

  div {
    color: ${(props) =>
      props.$isSelected ? "rgba(255, 255, 255, 0.9)" : "black"};
    cursor: default;
  }

  /* 행성에 호버될 때 포인터로 커서 표시 */
  &:hover > div:first-child {
    cursor: pointer;
  }

  /* // 빛번짐 속도가 행성과 달라서 일단 주석 처리
  &:hover div {
    color: rgba(255, 255, 255, 0.9);
    text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.9); // 빛 번짐 효과
  } */
`;

const StyledNextButton = styled(Btn)`
  width: 200px;
`;
