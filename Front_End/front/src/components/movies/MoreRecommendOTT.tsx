import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Wrapper from "../atoms/Wrapper";
import { StyledIconBox } from "../../pages/recommend/ContentDetailPage";
import { useNavigate } from "react-router-dom";
import { HiOutlineChevronLeft } from "react-icons/hi";

type Props = {
  onSelectOTT: (ottName: string) => void;
};

const MoreRecommendOTT: React.FC<Props> = ({ onSelectOTT }) => {

  const [selectedOTT, setSelectedOTT] = useState<string | null>(null);
 const navigate = useNavigate();

  /** 뒤로가기 */
  const handleNavigateBack = () => {
    navigate(-1);
  };
  const handleClick = (ottName: string) => {
    onSelectOTT(ottName);
    setSelectedOTT(ottName);
  };

  useEffect(() => {
    setSelectedOTT(null); // Reset selected OTT when component unmounts or props change
  }, [onSelectOTT]);
  return (
    <StyledWrapper size="Standard" color="WhiteGhost" padding="Thin">
      <StyledIconBox
        Icon={HiOutlineChevronLeft}
        size={32}
        onClick={handleNavigateBack}
      />
      <CircleButton
        onClick={() => handleClick("All")}
        selected={selectedOTT === "All"}
      >
        <div>
          <img src="/assets/Logo/All.png" alt="Netflix" />
        </div>
        전체보기
      </CircleButton>
      <CircleButton
        onClick={() => handleClick("Netflix")}
        selected={selectedOTT === "Netflix"}
      >
        <div>
          <img src="/assets/Logo/Netflix.png" alt="Netflix" />
        </div>
        Netflix
      </CircleButton>
      <CircleButton
        onClick={() => handleClick("Watcha")}
        selected={selectedOTT === "Watcha"}
      >
        <div>
          <img src="/assets/Logo/Watcha.png" alt="Watcha" />
        </div>
        Watcha
      </CircleButton>
      <CircleButton
        onClick={() => handleClick("wavve")}
        selected={selectedOTT === "wavve"}
      >
        <div>
          <img src="/assets/Logo/Wavve.png" alt="Wavve" />
        </div>
        Wavve
      </CircleButton>
      <CircleButton
        onClick={() => handleClick("Apple TV")}
        selected={selectedOTT === "Apple TV"}
      >
        <div>
          <img src="/assets/Logo/AppleTV.png" alt="Apple TV" />
        </div>
        Apple TV
      </CircleButton>
      <CircleButton
        onClick={() => handleClick("Disney Plus")}
        selected={selectedOTT === "Disney Plus"}
      >
        <div>
          <img src="/assets/Logo/DisneyPlus.png" alt="Disney Plus" />
        </div>
        Disney Plus
      </CircleButton>
    </StyledWrapper>
  );
};

export default MoreRecommendOTT;

const CircleButton = styled.button<{ selected?: boolean }>`
  div {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: ${(props) =>
      props.selected ? "0 0 10px 2px rgba(255, 255, 255, 0.9)" : "none"};

    &:hover {
      box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.9);
    }

    img {
      width: 100%;
      height: 80%;
    }
  }
`;

const StyledWrapper = styled(Wrapper)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
`;
