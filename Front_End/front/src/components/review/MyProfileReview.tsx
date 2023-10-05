// 프로필에서 보여지는 리뷰 박스 (+ 텍스트)

import { useState, useEffect } from "react";
import styled from "styled-components";
import { MY_PAGE_REVIEW } from "../../commons/constants/String";
import Text from "../atoms/Text";
import { getMember } from "../../apis/FrontendApi";
import ProfileReviewItemList from "./ProfileReviewItemList";
import Wrapper from "../atoms/Wrapper";
import { FlexCenter } from "../../commons/style/SharedStyle";

interface ProfileReviewProps {
  memberId: number | undefined;
  className?: string;
}

const MyProfileReview: React.FC<ProfileReviewProps> = ({ memberId }) => {
  const [reviewList, setReviewList] = useState<[]>([]);
  const [nickname, setNickname] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMember(Number(memberId));
        console.log("리뷰 보여줄 유저", response.data);

        if (response && response.data) {
          setReviewList(response.data.reviewResDtos || []);
          setNickname(response.data.nickname);
        }
      } catch (error) {
        console.error("데이터 가져오기 실패", error);
      }
    };

    fetchData();
  }, [memberId]);

  return (
    <StyledPXWrapper>
      <Text size="Medium" color="White" fontFamily="PyeongChang-Bold">
        {nickname}
        {MY_PAGE_REVIEW}
      </Text>
      <StyledStandardWhiteGhostWrapper
        size="Standard"
        color="WhiteGhost"
        padding="Narrow"
        className="mt-2"
      >
        {reviewList.length === 0 ? (
          <Text size="Small" color="Black" fontFamily="PyeongChang-Light">
            아직 리뷰를 등록하지 않으셨네요
          </Text>
        ) : (
          <ProfileReviewItemList reviews={reviewList} />
        )}
      </StyledStandardWhiteGhostWrapper>
    </StyledPXWrapper>
  );
};

export default MyProfileReview;

const StyledStandardWhiteGhostWrapper = styled(Wrapper)`
  ${FlexCenter}
  height: 243.99px;
`;

export const StyledPXWrapper = styled.div`
  height: 100%;
  & > *:first-child {
    height: 15%;
  }
  & > *:last-child {
    height: 243.99px;
  }
`;
