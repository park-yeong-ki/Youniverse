import React, { ReactNode } from "react";
import { styled } from "styled-components";

/** 컨테이너 타입 지정 */
interface ContainerProps {
  size: ContainerSize;
  color: ContainerColor;
  onClick?: () => void;
  children: ReactNode;
  padding: ContainerPadding;
}

/** 컨테이너 SIZE */
type ContainerSize = "Standard" | "Small";

/** 컨테이너 COLOR
 * (적용 예시)
 * White: 유저 검색 결과 -> 유저 선택 시(호버 시),
 * WhiteGhost: 대부분의 컨테이너,
 * BlackGhost: 마이페이지 수정 시 */
type ContainerColor = "White" | "BlackGhost" | "WhiteGhost" | "Clear";

/** 컨테이너 PADDING */
type ContainerPadding = "Wide" | "Medium" | "Narrow";

/** 컨테이너 스타일 타입 지정 */
type ContainerStyle = {
  height: string;
  width: string;
  borderRadius: string;
};

/** 컨테이너 BGCOLOR 스타일 타입 지정 */
type ContainerColorStyle = {
  backgroundColor?: string;
  hover?: {
    backgroundColor?: string;
  };
};

/** 컨테이너 PADDING 스타일 타입 지정 */
type ContainerPaddingStyle = {
  padding: string;
};

/** 컨테이너 스타일 지정 */
const ContainerStyles: Record<ContainerSize, ContainerStyle> = {
  Standard: {
    height: "100%",
    width: "100%",
    borderRadius: "28px",
  },
  Small: {
    height: "100%",
    width: "100%",
    borderRadius: "12px",
  },
};

/** 컨테이너 BGCOLOR 스타일 지정 */
const ContainerColors: Record<ContainerColor, ContainerColorStyle> = {
  White: {
    backgroundColor: "#fff",
  },
  BlackGhost: {
    backgroundColor: "#00000099", // 투명도 60%
  },
  WhiteGhost: {
    backgroundColor: "#ffffff80", // 투명도 50%
  },
  Clear: {
    // 투명 바탕 -> 호버 시 흰색으로 변경
    hover: {
      backgroundColor: "#fff",
    },
  },
};

/** 컨테이너 PADDING 스타일 */
const ContainerPaddingStyles: Record<ContainerPadding, ContainerPaddingStyle> =
  {
    Wide: {
      padding: "5rem 2rem", // 상하 (5rem), 좌우 (2rem)
    },
    Medium: {
      padding: "3rem 1.5rem", // 상하 (3rem), 좌우 (1.5rem)
    },
    Narrow: {
      padding: "1.5rem 1rem ", // 상하 (1.5rem), 좌우 (1rem)
    },
  };

/** styled-component => 컨테이너 */
const StyledContainer = styled.div<ContainerProps>`
  height: ${(props) => ContainerStyles[props.size].height};
  width: ${(props) => ContainerStyles[props.size].width};
  border-radius: ${(props) => ContainerStyles[props.size].borderRadius};
  padding: ${(props) => ContainerPaddingStyles[props.padding].padding};
  background-color: ${(props) => ContainerColors[props.color].backgroundColor};
  box-sizing: border-box;
  &:hover {
    background-color: ${(props) =>
      ContainerColors[props.color]?.hover?.backgroundColor};
  }
`;

/** 컨테이너 컴포넌트 */
const Container = ({
  size,
  onClick,
  children,
  color,
  padding,
}: ContainerProps) => {
  return (
    <StyledContainer
      size={size}
      onClick={onClick}
      color={color}
      padding={padding}
    >
      {children}
    </StyledContainer>
  );
};

export default Container;
