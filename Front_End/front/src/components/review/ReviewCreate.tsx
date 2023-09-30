import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { UserDetailInfoState } from "../../pages/store/State";
import { ReviewType } from "../../pages/recommend/ContentDetailPage";
import { postReview, deleteReview } from "../../apis/FrontendApi";
import Btn from "../atoms/Btn";
import Wrapper from "../atoms/Wrapper";
import { FlexRowBetween } from "../../commons/style/SharedStyle";
import {
  DETAIL_PAGE_REVIEW_PLACEHOLDER,
  SAVE,
  DELETE,
} from "../../commons/constants/String";
import ReviewRate from "./ReviewRate";

interface ReviewCreateProps {
  onReviewAdd: (review: ReviewType) => void;
  userReview: ReviewType | null; // 추가: 현재 사용자의 리뷰
}

const ReviewCreate: React.FC<ReviewCreateProps> = ({
  onReviewAdd,
  userReview: initialUserReview, // 초기 사용자 리뷰 정보
}) => {
  const memberId = useRecoilValue(UserDetailInfoState).memberId;
  const { movieId } = useParams<{ movieId: string }>();
  const [reviewContent, setReviewContent] = useState("");
  const [reviewRate, setReviewRate] = useState(0);

  // 초기 사용자의 리뷰를 상태로 설정
  const [userReview, setUserReview] = useState<ReviewType | null>(
    initialUserReview
  );

  useEffect(() => {
    if (userReview) {
      setReviewContent(userReview.reviewContent);
      setReviewRate(userReview.reviewRate);
    } else {
      setReviewContent("");
      setReviewRate(0);
    }
  }, [userReview]);

  const handleReviewDelete = async () => {
    if (userReview) {
      // memberId가 null인지 확인
      if (memberId === null) {
        alert("로그인된 사용자 정보가 없습니다.");
        return;
      }

      try {
        // 리뷰를 삭제하기 위해 deleteReview 함수를 호출
        await deleteReview(userReview.reviewId);
        alert("리뷰가 성공적으로 삭제되었습니다.");

        setUserReview(null); // 상태를 null로 설정하여 리뷰가 삭제되었음을 나타냅니다.
        setReviewRate(0); // 별점을 초기화합니다.
      } catch (error) {
        console.log(error);
        alert("리뷰 삭제에 실패했습니다.");
      }
    }
  };

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

    // memberId의 값이 null인 경우를 확인
    if (memberId === null) {
      alert("로그인된 사용자 정보가 없습니다.");
      return;
    }

    try {
      const reviewData = {
        memberId, // 여기서는 이미 null인지 아닌지 확인했기 때문에 문제가 없습니다.
        movieId: Number(movieId),
        reviewContent,
        reviewRate,
      };
      const newReview = (await postReview(reviewData)).data;

      onReviewAdd(newReview);

      setUserReview(newReview); // 상태를 새로운 리뷰 데이터로 업데이트합니다.

      alert("리뷰가 성공적으로 등록되었습니다.");
      setReviewContent("");
    } catch (error) {
      console.log(error);
      alert("리뷰 등록에 실패했습니다.");
    }
  };

  console.log("@@@@배포 오류 방지용@@@@", setReviewRate);

  return (
    <Wrapper size="YouTube" color="WhiteGhost" padding="Narrow">
      <StyledReview>
        <StyledReviewTop>
          <ReviewRate
            onClick={(rating) => setReviewRate(rating)}
            rating={reviewRate}
          />
          {userReview ? (
            <StyledBnt size="Medium" color="Black" onClick={handleReviewDelete}>
              {DELETE}
            </StyledBnt>
          ) : (
            <StyledBnt size="Medium" color="White" onClick={handleReviewSave}>
              {SAVE}
            </StyledBnt>
          )}
        </StyledReviewTop>
        <StyledReviewBottom>
          {userReview ? (
            <StyledReviewContent>
              {userReview.reviewContent}
            </StyledReviewContent>
          ) : (
            <StyledTextArea
              id="review"
              value={reviewContent}
              onChange={handleReviewChange}
              placeholder={DETAIL_PAGE_REVIEW_PLACEHOLDER}
            />
          )}
        </StyledReviewBottom>
      </StyledReview>
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
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledReviewContent = styled.div`
  width: 100%;
  font-size: 16px;
  font-family: "YESGothic-Regular";
  border-radius: 12px;
  padding: 5px 10px;
  box-sizing: border-box;
  background-color: #ccc; // 리뷰 잘 등록됐는지 확인용으루다가 ,,
`;

const StyledReviewTop = styled.div`
  ${FlexRowBetween}
`;

const StyledReviewBottom = styled.div``;

const StyledBnt = styled(Btn)`
  width: 60px;
`;
