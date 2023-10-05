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
import { FlexColBetween } from "../../commons/style/SharedStyle";
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
      <div className="grid grid-cols-5 gap-5">
        {ottData.map((ott) => (
          <PlanetsWrapper
            key={ott.ottId}
            $isSelected={planetSelectedStates[ott.ottId]}
          >
            <StyledEachPlanetContainer>
              <Planet
                size="AuthBtn"
                planetId={ott.ottId}
                src={ott.ottImage} // 백서버에서 받아온 이미지 URL
                name={ott.ottName}
                handleClickedPlanets={handleClickedPlanets}
              />
              <div>{ott.ottName}</div>
            </StyledEachPlanetContainer>
          </PlanetsWrapper>
        ))}
      </div>
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
  padding-top: 50px;
  height: 400px;
`;

const PlanetsWrapper = styled.div<{ $isSelected: boolean }>`
  div {
    color: ${(props) =>
      props.$isSelected ? "rgba(255, 255, 255, 0.9)" : "black"};
    cursor: pointer;
  }

  /* 행성에 호버될 때 포인터로 커서 표시 */
  &:hover > div:first-child {
    cursor: default;
  }
  ${FlexColBetween}
  height: 220px;
`;

const StyledEachPlanetContainer = styled.div`
  ${FlexColBetween}
  height: 220px;
  & > *:nth-child(2) {
    font-family: "YESGothic-Bold";
  }
`;

const StyledNextButton = styled(Btn)`
  width: 200px;
`;
