import Text from "../../components/atoms/Text";
import { AlignCenter } from "../../commons/style/SharedStyle";
import styled from "styled-components";

const NotFoundPage = () => {
  return (
    <StyledNotFound>
      <Text size="X-Large" color="White" fontFamily="PyeongChang-Bold">
        404 NotFound
      </Text>
    </StyledNotFound>
  );
};

export default NotFoundPage;

const StyledNotFound = styled.div`
  ${AlignCenter}
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 70px); 
`;
