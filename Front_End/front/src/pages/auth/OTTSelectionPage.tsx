import { styled } from "styled-components";
import OTTForm from "../../components/organisms/OTTForm";
import { FlexCenter } from "../../commons/style/SharedStyle";
import { OTT_SELECT } from "../../commons/constants/String";
import Text from "../../components/atoms/Text";

const OTTSelectionPage = () => {
  return (
    <StyledContainerCenter>
      <StyledContainer>
        <div>
          <Text size="Large" color="White" fontFamily="PyeongChang-Bold">
            {OTT_SELECT}
          </Text>
          <OTTForm />
        </div>
      </StyledContainer>
    </StyledContainerCenter>
  );
};

export default OTTSelectionPage;

const StyledContainerCenter = styled.div`
  ${FlexCenter}
`;

const StyledContainer = styled.div`
  width: 90%;
`;
