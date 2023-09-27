// 프로필에서 보여지는 리뷰 박스 (+ 텍스트)

import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { MY_PAGE_REVIEW } from "../../commons/constants/String";
import Text from "../atoms/Text";
import { UserDetailInfoState } from "../../pages/store/State";
import { getMember } from "../../apis/FrontendApi";
import ProfileReviewItemList from "./ProfileReviewItemList";
import Wrapper from "../atoms/Wrapper";
import { FlexCenter } from "../../commons/style/SharedStyle";

const ProfileReview = () => {
  const { nickname, memberId } = useRecoilValue(UserDetailInfoState);
  const [reviewList, setReviewList] = useState<[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMember(memberId as number);

        if (response && response.data) {
          setReviewList(response.data.reviewResDtos || []);
        }
      } catch (error) {
        console.error("데이터 가져오기 실패", error);
      }
    };

    fetchData();
  }, [memberId]);

  return (
    <StyledReviewContainer>
      <Text size="Medium" color="White" fontFamily="PyeongChang-Bold">
        {nickname}
        {MY_PAGE_REVIEW}
      </Text>
      <StyledStandardWhiteGhostWrapper
        size="Standard"
        color="WhiteGhost"
        padding="Narrow"
      >
        <ProfileReviewItemList reviews={reviewList} />
      </StyledStandardWhiteGhostWrapper>
    </StyledReviewContainer>
  );
};

export default ProfileReview;

const StyledReviewContainer = styled.div`
  width: 500px;
  height: 500px;
`;

const StyledStandardWhiteGhostWrapper = styled(Wrapper)`
  ${FlexCenter}
  height: 400px;
`;
