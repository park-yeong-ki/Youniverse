import styled from "styled-components";
import Wrapper from "../atoms/Wrapper";
import LineChart from "./LineChart";
import { FlexCenter } from "../../commons/style/SharedStyle";

interface LineChartWrapperProps {
  chartWidth?: string | number; // 수정
  chartHeight?: string | number; // 수정
}
const LineChartWrapper: React.FC<LineChartWrapperProps> = () => {
  return (
    <>
      <Wrapper size="Standard" color="WhiteGhost" padding="Narrow">
        <StyledZodiacWrapper>
          <LineChart width="600%" height="190%" />
        </StyledZodiacWrapper>
      </Wrapper>
    </>
  );
};

export default LineChartWrapper;

/** 별자리 차트 감싸는 그라디언트 박스 */
const StyledZodiacWrapper = styled.div`
  ${FlexCenter}
  width: 100%;
  height: 100%;
  border-radius: 28px;
  background: linear-gradient(
    180deg,
    #190a37 0%,
    rgba(83, 22, 132, 0.54) 60.42%,
    rgba(194, 180, 222, 0.3) 99.97%,
    rgba(176, 164, 202, 0.25) 99.98%,
    rgba(150, 123, 208, 0.18) 99.99%,
    rgba(145, 114, 211, 0) 100%
  );
`;
