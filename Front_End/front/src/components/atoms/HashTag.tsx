import React, { ReactNode } from "react";
import { styled } from "styled-components";

/** 해시태그 타입 지정 */
interface HashTagProps {
  size: HashTagSize;
  color: HashTagColor;
  children: ReactNode;
}

/** 해시태그 SIZE */
type HashTagSize = "Standard" | "Huge";

/** 해시태그 COLOR
 * (적용 예시)
 * WhiteGhost: 포스터 위 영화 키워드,
 * BlackGhost: 별자리 그래프 키워드(마이페이지),
 * Black: 유저 검색 결과 -> 유저 선택 시(호버 시),
 * White: 그 외 모든 해시태그 */
type HashTagColor = "White" | "Black" | "WhiteGhost" | "BlackGhost";

/** 해시태그 스타일 타입 지정 */
type HashTagStyle = {
  height: string;
  width: string;
  fontSize: string;
  borderRadius: string;
};

/** 해시태그 BGCOLOR, COLOR 타입 지정 */
type HashTagColorStyle = {
  backgroundColor: string;
  color?: string;
};

/** 해시태그 스타일 */
const HashTagStyles: Record<HashTagSize, HashTagStyle> = {
  Standard: {
    height: "24px",
    width: "fit-content",
    fontSize: "12px",
    borderRadius: "8px",
  },
  Huge: {
    height: "36px",
    width: "fit-content",
    fontSize: "16px",
    borderRadius: "12px",
  },
};

/** 해시태그 BGCOLOR, COLOR 스타일 지정 */
const HashTagColors: Record<HashTagColor, HashTagColorStyle> = {
  White: {
    backgroundColor: "#fff",
  },
  Black: {
    backgroundColor: "#000",
    color: "#fff",
  },
  WhiteGhost: {
    backgroundColor: "#ffffffB3", // 투명도 70%
  },
  BlackGhost: {
    backgroundColor: "#000000B3", // 투명도 70%
    color: "#fff",
  },
};

/** styled-component => 해시태그 */
const StyledHashTag = styled.div<HashTagProps>`
  width: ${(props) => HashTagStyles[props.size].width};
  height: ${(props) => HashTagStyles[props.size].height};
  font-size: ${(props) => HashTagStyles[props.size].fontSize};
  border-radius: ${(props) => HashTagStyles[props.size].borderRadius};
  background-color: ${(props) => HashTagColors[props.color].backgroundColor};
  color: ${(props) => HashTagColors[props.color]?.color ?? "#000"};

  // 해시태그 프레임 안에 글자 정중앙 위치
  display: flex;
  justify-content: center;
  align-items: center;
`;

/** 해시태그 컴포넌트 */
const HashTag = ({ size, children, color }: HashTagProps) => {
  return (
    <StyledHashTag size={size} color={color}>
      {children}
    </StyledHashTag>
  );
};

export default HashTag;
