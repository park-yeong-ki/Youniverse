import React from "react";
import styled from "styled-components";

import Btn from "../atoms/Btn";
import Wrapper from "../atoms/Wrapper";
import { FlexRowBetween } from "../../commons/style/SharedStyle";
import {
  DETAIL_PAGE_REVIEW_PLACEHOLDER,
  SAVE,
} from "../../commons/constants/String";

const ReviewCreateForm = () => {
  return (
    <Wrapper size="YouTube" color="WhiteGhost" padding="Narrow">
      <StyledReview>
        <div>별점들어갈공간</div>
        <Btn size="Medium" color="White">
          {SAVE}
        </Btn>
      </StyledReview>
      <StyledTextArea
        id="review"
        placeholder={DETAIL_PAGE_REVIEW_PLACEHOLDER}
      ></StyledTextArea>
    </Wrapper>
  );
};

export default ReviewCreateForm;

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 52px;
  font-size: 16px;
  font-family: "YESGothic-Regular";
  border-radius: 12px;
  border: none;
  resize: none;
  padding: 5px 10px;
  box-sizing: border-box;
`;

const StyledReview = styled.div`
  ${FlexRowBetween}
`;
