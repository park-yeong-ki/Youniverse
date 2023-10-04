import React, { ReactNode } from "react";
import { styled } from "styled-components";

/** Wrapper 타입 지정 */
interface WrapperProps {
  size: WrapperSize;
  color: WrapperColor;
  onClick?: () => void;
  children: ReactNode;
  padding: WrapperPadding;
  className?: string;
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
  height?: string;
}

/** Wrapper SIZE */
/** 별자리 차트 Wrapper 메인, 마이페이지, 추천페이지에서 크기 지정 */
export type WrapperSize = "Standard" | "Small" | "YouTube";

/** Wrapper COLOR
 * (적용 예시)
 * White: 유저 검색 결과 -> 유저 선택 시(호버 시),
 * WhiteGhost: 대부분의 Wrapper,
 * BlackGhost: 마이페이지 수정 시 */
type WrapperColor = "White" | "BlackGhost" | "WhiteGhost" | "Clear";

/** Wrapper PADDING */
type WrapperPadding = "Wide" | "Medium" | "Narrow" | "Thin";

/** Wrapper 스타일 타입 지정 */
type WrapperStyle = {
  height: string;
  width: string;
  borderRadius?: string;
};

/** Wrapper BGCOLOR 스타일 타입 지정 */
type WrapperColorStyle = {
  backgroundColor?: string;
  hover?: {
    backgroundColor?: string;
  };
};

/** Wrapper PADDING 스타일 타입 지정 */
type WrapperPaddingStyle = {
  padding: string;
};

/** Wrapper 스타일 지정 */
const WrapperStyles: Record<WrapperSize, WrapperStyle> = {
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
  YouTube: {
    height: "45%",
    width: "100%",
  },
};

/** Wrapper BGCOLOR 스타일 지정 */
const WrapperColors: Record<WrapperColor, WrapperColorStyle> = {
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

/** Wrapper PADDING 스타일 */
const WrapperPaddingStyles: Record<WrapperPadding, WrapperPaddingStyle> = {
  Wide: {
    padding: "3rem 2rem", // 상하 (5rem), 좌우 (2rem)
  },
  Medium: {
    padding: "3rem 1.5rem", // 상하 (3rem), 좌우 (1.5rem)
  },
  Narrow: {
    padding: "1.5rem 1rem ", // 상하 (1.5rem), 좌우 (1rem)
  },
  Thin: {
    padding: "0.5rem 0.5rem", // 상하좌우(0.5rem)
  },
};

/** styled-component => Wrapper */
const StyledWrapper = styled.div<WrapperProps>`
  height: ${(props) => props.height || WrapperStyles[props.size].height};
  width: ${(props) => WrapperStyles[props.size].width};
  border-radius: ${(props) => WrapperStyles[props.size].borderRadius};
  padding: ${(props) => WrapperPaddingStyles[props.padding].padding};
  background-color: ${(props) => WrapperColors[props.color].backgroundColor};
  overflow-y: auto; // 스크롤 추가
  box-sizing: border-box;
  &:hover {
    background-color: ${(props) =>
      WrapperColors[props.color]?.hover?.backgroundColor};
  }
`;

/** Wrapper 컴포넌트 */
const Wrapper = ({
  size,
  onClick,
  children,
  color,
  padding,
  className,
  onScroll,
  height,
}: WrapperProps) => {
  return (
    <StyledWrapper
      size={size}
      onClick={onClick}
      color={color}
      padding={padding}
      className={className}
      onScroll={onScroll} // 스크롤 이벤트 바인딩
      height={height}
    >
      {children}
    </StyledWrapper>
  );
};

export default Wrapper;
