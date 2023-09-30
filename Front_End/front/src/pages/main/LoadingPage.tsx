import styled, { keyframes } from "styled-components";
import { MainPaddingContainer } from "../../commons/style/layoutStyle";
import Text from "../../components/atoms/Text";
import { FlexCenter, FlexColBetween } from "../../commons/style/SharedStyle";

const LoadingPage = () => {
  return (
    <MainPaddingContainer>
      <StyledLoadingCenter>
        <StyledLoadingContent>
          <Text size="X-Large" color="White" fontFamily="PyeongChang-Bold">
            로딩중입니다
          </Text>
          <Loader />
        </StyledLoadingContent>
      </StyledLoadingCenter>
    </MainPaddingContainer>
  );
};

export default LoadingPage;

const StyledLoadingCenter = styled.div`
  ${FlexCenter}
  height: 100%;
`;

const StyledLoadingContent = styled.div`
  ${FlexColBetween}
  height: 30%;
`;

const flippx = keyframes`
  0%, 49% {
    transform: scaleX(1);
  }
  50%, 100% {
    transform: scaleX(-1);
  }
`;

const spin = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

export const Loader = styled.div`
  width: calc(100px - 24px);
  height: 50px;
  position: relative;
  animation: ${flippx} 2s infinite linear;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    margin: auto;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #fff;
    transform-origin: -24px 50%;
    animation: ${spin} 1s infinite linear;
  }

  &::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }
`;
