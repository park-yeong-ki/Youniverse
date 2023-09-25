import React, { useState } from "react";
import styled from "styled-components";

import { postReview } from "../../apis/FrontendApi";
import Btn from "../atoms/Btn";
import Wrapper from "../atoms/Wrapper";
import { FlexRowBetween } from "../../commons/style/SharedStyle";
import {
  DETAIL_PAGE_REVIEW_PLACEHOLDER,
  SAVE,
} from "../../commons/constants/String";

const ReviewCreateForm = () => {
  const [reviewContent, setReviewContent] = useState("");
  const [memberId, setMemberId] = useState(1); // 기본값 설정 예시입니다. 실제 필요한 값을 사용하세요.
  const [movieId, setMovieId] = useState(7); // 기본값 설정 예시입니다. 실제 필요한 값을 사용하세요.
  const [reviewRate, setReviewRate] = useState(1.0); // 기본값 설정 예시입니다. 실제 필요한 값을 사용하세요.

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewContent(e.target.value);
  };

  const handleReviewSave = async () => {
    try {
      const reviewData = {
        memberId,
        movieId,
        reviewContent,
        reviewRate,
      };
      await postReview(reviewData);
      alert("리뷰가 성공적으로 등록되었습니다.");
      setReviewContent(""); // 리뷰 내용 초기화
    } catch (error) {
      console.log(error);
      alert("리뷰 등록에 실패했습니다.");
    }
  };
  console.log(setMemberId, setMovieId, setReviewRate);

  return (
    <Wrapper size="YouTube" color="WhiteGhost" padding="Narrow">
      <StyledReview>
        <div>별점들어갈공간</div>
        <Btn size="Medium" color="White" onClick={handleReviewSave}>
          {SAVE}
        </Btn>
      </StyledReview>
      <StyledTextArea
        id="review"
        value={reviewContent}
        onChange={handleReviewChange}
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
