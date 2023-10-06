import { styled } from "styled-components";
import OTTForm from "../../components/organisms/OTTForm";
import { FlexCenter, FlexColBetween } from "../../commons/style/SharedStyle";
import { OTT_SELECT } from "../../commons/constants/String";
import Text from "../../components/atoms/Text";
import { MainPaddingContainer } from "../../commons/style/layoutStyle";

const OTTSelectionPage = () => {
  return (
    <MainPaddingContainer>
      <StyledContainer>
        <StyledTextContainerCenter>
          <Text size="Large" color="White" fontFamily="PyeongChang-Bold">
            {OTT_SELECT}
          </Text>
          <OTTForm />
        </StyledTextContainerCenter>
      </StyledContainer>
    </MainPaddingContainer>
  );
};

export default OTTSelectionPage;

const StyledContainer = styled.div`
  ${FlexCenter}
  width: 100%;
  height: 100%;
`;

const StyledTextContainerCenter = styled.div`
  ${FlexColBetween}
`;
