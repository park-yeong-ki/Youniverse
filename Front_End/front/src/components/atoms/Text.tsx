import React, { ReactNode } from "react";
import { styled } from "styled-components";

/** 텍스트 타입 지정 */
interface TextProps {
  size: TextSize;
  color: TextColor;
  fontFamily: TextFontFamily;
  children?: ReactNode;
  className?: string;
}

/** 텍스트 SIZE */
type TextSize = "X-Large" | "Large" | "Medium" | "Small" | "X-Small";

/** 텍스트 COLOR */
type TextColor = "White" | "Black" | "Gray";

/** 텍스트 FONT */
type TextFontFamily =
  | "PyeongChang-Bold"
  | "PyeongChang-Light"
  | "YESGothic-Bold"
  | "YESGothic-Regular";

/** 텍스트 스타일 타입 지정 */
type TextStyle = {
  fontSize: string;
};

/** 텍스트 COLOR 스타일 타입 지정 */
type TextColorStyle = {
  color: string;
};

const TextStyles: Record<TextSize, TextStyle> = {
  "X-Large": {
    fontSize: "48px",
  },
  Large: {
    fontSize: "32px",
  },
  Medium: {
    fontSize: "24px",
  },
  Small: {
    fontSize: "16px",
  },
  "X-Small": {
    fontSize: "12px",
  },
};

const TextColors: Record<TextColor, TextColorStyle> = {
  White: {
    color: "#fff",
  },
  Black: {
    color: "#000",
  },
  Gray: {
    color: "#CCC",
  },
};

const fontFamilies = {
  "PyeongChang-Bold": "'PyeongChangPeace-Bold'",
  "PyeongChang-Light": "'PyeongChangPeace-Light'",
  "YESGothic-Bold": "'YESGothic-Bold'",
  "YESGothic-Regular": "'YESGothic-Regular'",
};

const StyledText = styled.span<TextProps>`
  font-size: ${(props) => TextStyles[props.size].fontSize};
  color: ${(props) => TextColors[props.color].color};
  font-family: ${(props) =>
    fontFamilies[props.fontFamily] || "'YESGothic-Regular'"};
`;

const Text: React.FC<TextProps> = ({ children, ...props }) => {
  return <StyledText {...props}>{children}</StyledText>;
};

export default Text;
