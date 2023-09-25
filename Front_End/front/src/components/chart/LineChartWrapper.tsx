import Wrapper, { WrapperSize } from "../atoms/Wrapper";
import LineChart from "./LineChart";

interface LineChartWrapperProps {
  size?: WrapperSize;
  chartWidth?: number; // 추가
  chartHeight?: number; // 추가
}

const LineChartWrapper: React.FC<LineChartWrapperProps> = ({
  size = "RecommendedChart",
  chartWidth = 400, // 기본값 설정
  chartHeight = 200, // 기본값 설정
}) => {
  return (
    <Wrapper size={size} color="WhiteGhost" padding="Wide">
      <LineChart width={chartWidth} height={chartHeight} />
    </Wrapper>
  );
};

export default LineChartWrapper;
