import React, { useState } from "react";
import { styled } from "styled-components";

/** 행성 타입 지정 */
interface PlanetProps {
  size: PlanetSize;
  src: string;
  name?: string; // OTT 이름
  handleClickedPlanets?: (planetName: string, $isSelected: boolean) => void;
  // $point?: boolean; // 클릭 여부 확인
  // onClick?: () => void;
}

/** 행성 SIZE */
type PlanetSize = "Standard" | "Small";

/** 행성 STYLE 타입 지정 */
type PlanetStyle = {
  height: string;
};

/** 행성 STYLE */
const PlanetStyles: Record<PlanetSize, PlanetStyle> = {
  Standard: {
    height: "248px",
  },
  Small: {
    height: "24px",
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
    box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.9);
  }
`;

/** Planet 컴포넌트 정의 */
const Planet = ({ name, handleClickedPlanets, ...props }: PlanetProps) => {
  const [selectPlanet, setSelectPlanet] = useState(false);

  const handleClick = () => {
    const newState = !selectPlanet;
    setSelectPlanet(newState);
    if (handleClickedPlanets && name) {
      handleClickedPlanets(name, newState);
    }
  };

  return (
    <StyledPlanet {...props} selected={selectPlanet} onClick={handleClick} />
  );
};

export default Planet;
