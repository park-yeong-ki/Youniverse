import React, { useState } from "react";
import { styled } from "styled-components";

/** 행성 타입 지정 */
interface PlanetProps {
  size: PlanetSize;
  src: string;
  planetId?: number;
  name?: string; // OTT 이름
  handleClickedPlanets?: (planetId: number, $isSelected: boolean) => void;
  // $point?: boolean; // 클릭 여부 확인
  // onClick?: () => void;
  initialSelected?: boolean;
  $mypage?: boolean; // 마이페이지 행성 부분
}

/** 행성 SIZE */
type PlanetSize = "Standard" | "Medium" | "Small" | "MovieDetailSize";

/** 행성 STYLE 타입 지정 */
type PlanetStyle = {
  height: string;
};

/** 행성 STYLE */
const PlanetStyles: Record<PlanetSize, PlanetStyle> = {
  Standard: {
    height: "180px",
  },
  Medium: {
    height: "144px",
  },
  Small: {
    height: "24px",
  },
  MovieDetailSize: {
    height: "52px",
  },
};

/** styled-component => Planet */
const StyledPlanet = styled.div<PlanetProps & { selected: boolean }>`
  width: ${(props) => PlanetStyles[props.size].height};
  height: ${(props) => PlanetStyles[props.size].height};
  overflow: hidden;
  border-radius: 50%;
  background: url(${(props) => props.src}) center/cover;
  position: relative;

  box-shadow: ${(props) =>
    props.selected ? "0 0 10px 2px rgba(255, 255, 255, 0.9)" : "none"};

  &:hover {
    box-shadow: ${(props) =>
      props.$mypage === true
        ? "none"
        : "0 0 10px 2px rgba(255, 255, 255, 0.9)"};
  }
`;

/** Planet 컴포넌트 정의 */
const Planet = ({
  planetId,
  name,
  handleClickedPlanets,
  $mypage,
  ...props
}: PlanetProps) => {
  const [selectPlanet, setSelectPlanet] = useState(
    props.initialSelected || false
  );

  const handleClick = () => {
    if ($mypage) return; // $mypage prop되면 return

    const newState = !selectPlanet;
    setSelectPlanet(newState);
    if (handleClickedPlanets && planetId) {
      handleClickedPlanets(planetId, newState);
    }
  };

  return (
    <StyledPlanet {...props} selected={selectPlanet} onClick={handleClick} />
  );
};

export default Planet;
