import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as Star } from "./star.svg";

interface Props {
  onClick?: (rating: number) => void;
  rating?: number; // 'rating' prop 추가
}

const ReviewRate: React.FC<Props> = ({ onClick, rating }) => {
  const [hoveredStarIndex, setHoveredStarIndex] = useState(0);
  const [clickedStarIndex, setClickedStarIndex] = useState(0);

  useEffect(() => {
    setClickedStarIndex(rating || 0);
  }, [rating]);

  const fillStarOfIndex = (num: number, event?: string): string => {
    if (event === "enter" && hoveredStarIndex >= num) {
      return "#ffbb00";
    }
    if (
      (event === "leave" && clickedStarIndex >= num) ||
      (rating && num <= rating)
    ) {
      return "#ffbb00";
    }
    return "#ccc";
  };
  return (
    <StarRateContainer>
      {[1, 2, 3, 4, 5].map((num) => (
        <StarButton
          key={num}
          onMouseEnter={() => setHoveredStarIndex(num)}
          onMouseLeave={() => setHoveredStarIndex(0)}
          onClick={() => {
            setClickedStarIndex(num);
            onClick?.(num); // onClick에 선택된 별점 값을 전달합니다.
          }}
        >
          <StyledStar
            fill={fillStarOfIndex(
              num,
              hoveredStarIndex === 0 ? "leave" : "enter"
            )}
          />
        </StarButton>
      ))}
    </StarRateContainer>
  );
};
export default ReviewRate;

const StarRateContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StarButton = styled.button`
  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;

  &:hover {
    & > svg {
      transform: scale(1.2);
    }
  }
`;

const StyledStar = styled(Star)`
  transition: all 0.2s ease-out;
`;
