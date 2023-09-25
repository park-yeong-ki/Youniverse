import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserJoinInfoState } from "../../pages/store/State";
import { ROUTES } from "../../commons/constants/Routes";
import Planet from "../atoms/Planet";
import Btn from "../atoms/Btn";
import Text from "../../components/atoms/Text";
import {
  NETFLIX,
  WAVVE,
  WATCHA,
  APPLE_TV,
  DISNEY_PLUS,
  NEXT,
} from "../../commons/constants/String";
import {
  FlexColBetween,
  FlexRowBetween,
} from "../../commons/style/SharedStyle";

const OTTForm = () => {
  const navigate = useNavigate();
  const setUserJoinInfo = useSetRecoilState(UserJoinInfoState);
  const [selectedPlanets, setSelectedPlanets] = useState<string[]>([]);
  const [planetSelectedStates, setPlanetSelectedStates] = useState<
    Record<string, boolean>
  >({
    [NETFLIX]: false,
    [WAVVE]: false,
    [WATCHA]: false,
    [APPLE_TV]: false,
    [DISNEY_PLUS]: false,
  });

  const handleClickedPlanets = (planetName: string, $isSelected: boolean) => {
    if (selectedPlanets.includes(planetName)) {
      // 행성 이름이 이미 selectedPlanets에 있다면 제거
      setSelectedPlanets((prev) => {
        const updatedPlanets = prev.filter((name) => name !== planetName);
        console.log("Updated Planets:", updatedPlanets); // 상태 출력
        return updatedPlanets;
      });
    } else {
      // 행성 이름이 selectedPlanets에 없다면 추가
      setSelectedPlanets((prev) => {
        const updatedPlanets = [...prev, planetName];
        console.log("Updated Planets:", updatedPlanets); // 상태 출력
        return updatedPlanets;
      });
    }
    // 각 행성의 클릭 상태를 저장
    setPlanetSelectedStates((prev) => ({
      ...prev,
      [planetName]: $isSelected,
    }));
  };

  const handleSaveClick = () => {
    setUserJoinInfo((prev) => ({
      ...prev,
      OTTs: selectedPlanets, // OTT 선택 정보 업데이트
    }));
    navigate(ROUTES.SURVEY);
  };

  return (
    <OTTFormContainer>
      <StyledContainer>
        <PlanetWrapper $isSelected={planetSelectedStates[NETFLIX]}>
          <Planet
            size="Standard"
            src="assets/Logo/Logo.svg"
            name={NETFLIX}
            handleClickedPlanets={handleClickedPlanets}
          />
          <div>{NETFLIX}</div>
        </PlanetWrapper>
        <PlanetWrapper $isSelected={planetSelectedStates[WAVVE]}>
          <Planet
            size="Standard"
            src="assets/Logo/Logo.svg"
            name={WAVVE}
            handleClickedPlanets={handleClickedPlanets}
          />
          <div>{WAVVE}</div>
        </PlanetWrapper>
        <PlanetWrapper $isSelected={planetSelectedStates[WATCHA]}>
          <Planet
            size="Standard"
            src="assets/Logo/Logo.svg"
            name={WATCHA}
            handleClickedPlanets={handleClickedPlanets}
          />
          <div>{WATCHA}</div>
        </PlanetWrapper>
        <PlanetWrapper $isSelected={planetSelectedStates[APPLE_TV]}>
          <Planet
            size="Standard"
            src="assets/Logo/Logo.svg"
            name={APPLE_TV}
            handleClickedPlanets={handleClickedPlanets}
          />
          <div>{APPLE_TV}</div>
        </PlanetWrapper>
        <PlanetWrapper $isSelected={planetSelectedStates[DISNEY_PLUS]}>
          <Planet
            size="Standard"
            src="assets/Logo/Logo.svg"
            name={DISNEY_PLUS}
            handleClickedPlanets={handleClickedPlanets}
          />
          <div>{DISNEY_PLUS}</div>
        </PlanetWrapper>
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
