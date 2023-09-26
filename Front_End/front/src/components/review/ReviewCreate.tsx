import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { ReviewType } from "../../pages/recommend/ContentDetailPage";
import { postReview } from "../../apis/FrontendApi";
import Btn from "../atoms/Btn";
import Wrapper from "../atoms/Wrapper";
import { FlexRowBetween } from "../../commons/style/SharedStyle";
import {
  DETAIL_PAGE_REVIEW_PLACEHOLDER,
  SAVE,
} from "../../commons/constants/String";
import ReviewRate from "./ReviewRate";

interface ReviewCreateProps {
  onReviewAdd: (review: ReviewType) => void;
}

const ReviewCreate: React.FC<ReviewCreateProps> = ({ onReviewAdd }) => {
  const { movieId } = useParams<{ movieId: string }>();
  const [reviewContent, setReviewContent] = useState("");
  const [memberId, setMemberId] = useState(1); // 기본값 설정 예시입니다. 실제 필요한 값을 사용하세요.
  const [reviewRate, setReviewRate] = useState(0); // 기본값 설정 예시입니다. 실제 필요한 값을 사용하세요.

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewContent(e.target.value);
  };

  const handleReviewSave = async () => {
    if (!reviewContent.trim()) {
      alert("리뷰 내용을 입력해주세요.");
      return;
    }

    if (reviewRate === 0) {
      alert("별점을 선택해주세요.");
      return;
    }

    try {
      const reviewData = {
        memberId,
        movieId: Number(movieId),
        reviewContent,
        reviewRate,
      };
      const newReview = (await postReview(reviewData)).data;
      onReviewAdd(newReview);
      alert("리뷰가 성공적으로 등록되었습니다.");
      setReviewContent("");
    } catch (error) {
      console.log(error);
      alert("리뷰 등록에 실패했습니다.");
    }
  };

  console.log("@@@@배포 오류 방지용@@@@", setMemberId, setReviewRate);

  return (
    <Wrapper size="YouTube" color="WhiteGhost" padding="Narrow">
      <StyledReview>
        <ReviewRate onClick={(rating) => setReviewRate(rating)} />{" "}
        {/* 선택된 별점을 상태에 설정합니다. */}
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

export default ReviewCreate;

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
