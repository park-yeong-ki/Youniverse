import React, { useState } from "react";
import { styled } from "styled-components";
import AdditionalForm from "../../components/organisms/AdditionalForm";
import { ADDITIONAL_INFO_PAGE } from "../../commons/constants/String";
import { FlexCenter, FlexColBetween } from "../../commons/style/SharedStyle";
import Text from "../../components/atoms/Text";

const AdditionalInfoPage = () => {
  return (
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
  );
};

export default AdditionalInfoPage;

const StyledContainerCenter = styled.div`
  ${FlexCenter}
  height: 100vh;
`;

const StyledContainerBetweenCol = styled.div`
  ${FlexColBetween};
  height: 80%;
`;

const StyledForm = styled.div`
  ${FlexCenter}
  height: 90%;
  width: 100%;
`;
