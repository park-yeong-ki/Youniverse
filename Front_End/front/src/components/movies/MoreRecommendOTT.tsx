import React from "react";
import styled from "styled-components";
import Wrapper from "../atoms/Wrapper";

type Props = {
  onSelectOTT: (ottId: string) => void;
};

const MoreRecommendOTT: React.FC<Props> = ({ onSelectOTT }) => {
  return (
    <StyledWrapper size="Standard" color="WhiteGhost" padding="Thin">
      <CircleButton onClick={() => onSelectOTT("All")}>
        <img src="/assets/Logo/All.png" alt="Netflix" />
        전체보기
      </CircleButton>
      <CircleButton onClick={() => onSelectOTT("Netflix")}>
        <img src="/assets/Logo/Netflix.png" alt="Netflix" />
        Netflix
      </CircleButton>
      <CircleButton onClick={() => onSelectOTT("Watcha")}>
        <img src="/assets/Logo/Watcha.png" alt="Watcha" />
        Watcha
      </CircleButton>
      <CircleButton onClick={() => onSelectOTT("wavve")}>
        <img src="/assets/Logo/Wavve.png" alt="Wavve" />
        Wavve
      </CircleButton>
      <CircleButton onClick={() => onSelectOTT("Apple TV")}>
        <img src="/assets/Logo/AppleTV.png" alt="Apple TV" />
        Apple TV
      </CircleButton>
      <CircleButton onClick={() => onSelectOTT("Disney Plus")}>
        <img src="/assets/Logo/DisneyPlus.png" alt="Disney Plus" />
        Disney Plus
      </CircleButton>
    </StyledWrapper>
  );
};

export default MoreRecommendOTT;

const CircleButton = styled.button`
  width: 160px;
  height: 160px;
  border-radius: 80px;
  border: none;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-direction: column;
  img {
    width: 100px; /* Adjust size accordingly */
    height: 80px; /* Adjust size accordingly */
    margin-bottom: 0.5rem;
  }
`;

const StyledWrapper = styled(Wrapper)`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
