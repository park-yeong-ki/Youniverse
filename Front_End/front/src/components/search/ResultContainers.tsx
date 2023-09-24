import { useLocation } from "react-router-dom";
import Wrapper from "../atoms/Wrapper";
import Text from "../atoms/Text";

const ResultContainers = () => {
  const location = useLocation();
  const searchTerm = location.state?.searchTerm ?? "";

  return (
    <Wrapper size="Standard" color="WhiteGhost" padding="Medium">
      <Text size="Medium" color="Black" fontFamily="YESGothic-Bold">
        #{searchTerm}
      </Text>
    </Wrapper>
  );
};

export default ResultContainers;
