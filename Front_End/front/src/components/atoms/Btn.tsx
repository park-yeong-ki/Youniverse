import React, { ReactNode } from "react";
import { styled } from "styled-components";

/** 버튼 타입 지정 */
interface ButtonProps {
  size: ButtonSize;
  color: ButtonColor;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

/** 버튼 SIZE */
type ButtonSize =
  | "X-Large"
  | "Large"
  | "Medium"
  | "Small"
  | "X-Small"
  | "Circle";

/** 버튼 COLOR */
type ButtonColor = "White" | "Black" | "Ghost" | "Purple" | "BlackStroke";

/** 버튼 스타일 타입 지정 */
type ButtonStyle = {
  height: string;
  width?: string;
  fontSize: string;
  borderRadius?: string;
};

/** 버튼 BGCOLOR, COLOR, STROKE, BORDER, HOVER 타입 지정 */
type ButtonColorStyle = {
  backgroundColor: string;
  border?: string;
  hover?: {
    boxShadow?: string;
  };
  color?: string;
};

/** 버튼 스타일 */
const ButtonStyles: Record<ButtonSize, ButtonStyle> = {
  "X-Large": {
    height: "56px",
    fontSize: "24px",
  },
  Large: {
    height: "48px",
    fontSize: "24px",
  },
  Medium: {
    height: "44px",
    fontSize: "16px",
  },
  Small: {
    height: "36px",
    fontSize: "16px",
  },
  "X-Small": {
    height: "24px",
    fontSize: "12px",
    borderRadius: "8px",
  },
  Circle: {
    height: "32px",
    width: "32px",
    fontSize: "16px",
    borderRadius: "50%",
  },
};

/** 버튼 BGCOLOR, COLOR, STROKE, BORDER, HOVER 스타일 지정 */
const ButtonColors: Record<ButtonColor, ButtonColorStyle> = {
  White: {
    backgroundColor: "#fff",
    hover: {
      boxShadow: "0px 0px 12px 0px rgba(255, 255, 255, 0.70)",
    },
  },
  Black: {
    backgroundColor: "#000",
    hover: {
      boxShadow: "0px 0px 12px 0px rgba(0, 0, 0, 0.70)",
    },
    color: "#fff",
  },
  Ghost: {
    backgroundColor: "#ffffff80", // 투명도 50%
    hover: {
      boxShadow: "0px 0px 12px 0px rgba(255, 255, 255, 0.70)",
    },
  },
  Purple: {
    backgroundColor: "#ffffffcc",
    hover: {
      boxShadow: "0px 0px 8px 0px rgba(204, 0, 255, 0.70)",
    },
  },
  BlackStroke: {
    backgroundColor: "#fff",
    border: "1px solid #000",
    hover: {
      boxShadow: "0px 0px 12px 0px rgba(255, 255, 255, 0.70)",
    },
  },
};

/** styled-component => 버튼 */
const StyledButton = styled.button<ButtonProps>`
  width: ${(props) => ButtonStyles[props.size]?.width ?? "100%"};
  height: ${(props) => ButtonStyles[props.size].height};
  font-size: ${(props) => ButtonStyles[props.size].fontSize};
  border-radius: ${(props) => ButtonStyles[props.size]?.borderRadius ?? "12px"};
  background-color: ${(props) => ButtonColors[props.color].backgroundColor};
  border: ${(props) => ButtonColors[props.color]?.border ?? "none"};
  color: ${(props) => ButtonColors[props.color]?.color ?? "#000"};
  &:hover {
    box-shadow: ${(props) => ButtonColors[props.color]?.hover?.boxShadow};
  }
  cursor: pointer;
`;
/** 버튼 컴포넌트 */
const Btn = ({ size, onClick, children, color, className }: ButtonProps) => {
  return (
    <StyledButton
      size={size}
      onClick={onClick}
      color={color}
      className={className}
    >
      {children}
    </StyledButton>
  );
};

export default Btn;

/** DISABLED: 나중에 확인하고 필요하면 추가 */
