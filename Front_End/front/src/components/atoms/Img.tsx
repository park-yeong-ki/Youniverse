import { styled } from "styled-components";

/** 이미지 타입 지정 */
interface ImageProps {
  size: ImageSize;
  src: string;
  $point?: boolean;
  onClick?: () => void;
}

/** 이미지 SIZE */
type ImageSize = "X-Large" | "Large" | "Medium" | "Small";

/** 이미지 STYLE 타입 지정 */
type ImageStyle = {
  height: string;
};

/** 이미지 STYLE */
const ImageStyles: Record<ImageSize, ImageStyle> = {
  "X-Large": {
    height: "180px",
  },
  Large: {
    height: "112px",
  },
  Medium: {
    height: "52px",
  },
  Small: {
    height: "44px",
  },
};
/** styled-component => 버튼 */
const StyledImage = styled.div<ImageProps>`
  /* 세로 값과 동일하게 가로 값 지정 */
  width: ${(props) => ImageStyles[props.size].height};
  height: ${(props) => ImageStyles[props.size].height};

  overflow: hidden;
  border-radius: 50%;
  background: url(${(props) => props.src}) center/cover;
  position: relative;

  cursor: ${(props) => (props.onClick ? "pointer" : "default")};

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, ${(props) => (props.$point ? 0.7 : 0)});
    transition: background-color 0.3s;
  }

  &:hover::after {
    background-color: ${(props) =>
      props.$point
        ? props.onClick
          ? "rgba(0, 0, 0, 0)"
          : "rgba(0, 0, 0, 0.7)"
        : props.onClick
        ? "rgba(0, 0, 0, 0.7)"
        : "rgba(0, 0, 0, 0)"};
  }
`;
/** 이미지 컴포넌트 */
const Img = ({
  size,
  src,
  onClick,

  // 기본값 false
  $point = false,
}: // hover = false,
ImageProps) => {
  return (
    <StyledImage size={size} src={src} onClick={onClick} $point={$point} />
  );
};

export default Img;
