import { styled } from "styled-components";
import AdditionalForm from "../../components/organisms/AdditionalForm";
import { ADDITIONAL_INFO_PAGE } from "../../commons/constants/String";
import { FlexCenter, FlexColBetween } from "../../commons/style/SharedStyle";
import Text from "../../components/atoms/Text";
import { MainContainer } from "../../commons/style/layoutStyle";

const AdditionalInfoPage = () => {
  return (
    <MainContainer>
      <StyledContainerCenter>
        <StyledContainerBetweenCol>
          <Text size="Large" color="White" fontFamily="PyeongChang-Bold">
            {ADDITIONAL_INFO_PAGE}
          </Text>
          <StyledForm>
            <AdditionalForm />
          </StyledForm>
        </StyledContainerBetweenCol>
      </StyledContainerCenter>
    </MainContainer>
  );
};

export default AdditionalInfoPage;

export const StyledContainerCenter = styled.div`
  ${FlexCenter}
  height: 100%;
`;

export const StyledContainerBetweenCol = styled.div`
  ${FlexColBetween};
  height: 80%;
`;

export const StyledForm = styled.div`
  ${FlexCenter}
  height: 80%;
  width: 100%;
`;
