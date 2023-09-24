import Wrapper, { WrapperSize } from "../atoms/Wrapper";
import LineChart from "./LineChart";

interface LineChartWrapperProps {
  size?: WrapperSize;
}

const LineChartWrapper: React.FC<LineChartWrapperProps> = ({
  size = "Standard",
}) => {
  return (
    <Wrapper size={size} color="WhiteGhost" padding="Wide">
      <LineChart />
    </Wrapper>
  );
};

export default LineChartWrapper;
