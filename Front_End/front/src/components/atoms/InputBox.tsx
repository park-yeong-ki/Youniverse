import React from "react";
import styled from "styled-components";

/** Input 타입 지정 */
interface InputProps {
  placeholder?: string;
  type?: "text" | "number";
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void; // 추가
  color?: InputColor;
}

/** INPUT 테두리 색상 */
export type InputColor = "WhiteStroke" | "BlackStroke" | "Clear";

/** INPUT 테두리 색상 타입 지정 */
type InputColorStyle = {
  border: string;
  backgroundColor: string;
  color: string;
  placeholderColor: string;
  boxShadow: string;
};

/** INPUT COLOR */
const InputColors: Record<InputColor, InputColorStyle> = {
  /** 사이드바, 유저검색에 들어가는 흰 테두리 input */
  WhiteStroke: {
    border: "1px solid #fff",
    backgroundColor: "transparent",
    color: "#fff",
    placeholderColor: "#fff",
    boxShadow: "0px 0px 12px 0px rgba(255, 255, 255, 0.70)",
  },
  /** 검색에 들어가는 검정 테두리 input */
  BlackStroke: {
    border: "1px solid #000",
    backgroundColor: "transparent",
    color: "#000",
    placeholderColor: "#000",
    boxShadow: "0px 0px 12px 0px rgba(0, 0, 0, 0.70)",
  },
  /** 추가정보 입력에 들어가는 테두리 없는 input */
  Clear: {
    border: "none",
    backgroundColor: "#fff",
    color: "#000",
    placeholderColor: "grey",
    boxShadow: "0px 0px 12px 0px rgba(255, 255, 255, 0.70)",
  },
};

/** 스타일드 컴포넌트 => Input */
/** color가 지정되지 않거나 유효한 값이 아니면 기본값으로 Clear이 됨 */
const StyledInput = styled.input<InputProps>`
  width: 100%;
  height: 44px;
  font-size: 16px;
  border-radius: 12px;
  box-sizing: border-box;
  border: ${(props) => InputColors[props.color || "Clear"].border};
  background-color: ${(props) =>
    InputColors[props.color || "Clear"].backgroundColor};
  color: ${(props) => InputColors[props.color || "Clear"].color};

  &::placeholder {
    color: ${(props) => InputColors[props.color || "Clear"].placeholderColor};
  }

  &:focus {
    outline: none;
    box-shadow: ${(props) => InputColors[props.color || "Clear"].boxShadow};
  }
`;

/** InputBox 컴포넌트 정의 */
const InputBox = ({ ...props }: InputProps) => {
  return <StyledInput {...props} />;
};

export default InputBox;
