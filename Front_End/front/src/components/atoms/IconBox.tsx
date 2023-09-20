import React from "react";
import { IconType } from "react-icons";
import { styled } from "styled-components";

/** 아이콘 타입 지정 */
interface IconBoxProps {
  Icon?: IconType;
  size?: number;
  color?: string;
  onClick?: () => void;
}

/** 아이콘 Wrapper STYLE */
const IconWrapper = styled.div<{ size?: number; color?: string }>`
  cursor: pointer;
  display: inline-block;
  width: ${(props) => (props.size ? `${props.size}px` : "auto")};
  height: ${(props) => (props.size ? `${props.size}px` : "auto")};

  /* svg 아이콘 모양에 drop-shadow 설정 */
  & > svg {
    &:hover {
      filter: ${(props) =>
        props.color === "white"
          ? `drop-shadow(0px 0px 6px rgba(0, 0, 0, 0.70))`
          : `drop-shadow(0px 0px 6px rgba(255, 255, 255, 0.70))`};
    }
  }
`;

/** 아이콘 박스 컴포넌트 */
const IconBox: React.FC<IconBoxProps> = ({ Icon, size, color, onClick }) => {
  return (
    <IconWrapper size={size} color={color} onClick={onClick}>
      {Icon && <Icon size={size} color={color} />}
    </IconWrapper>
  );
};

export default IconBox;
