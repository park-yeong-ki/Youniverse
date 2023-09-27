// 프로필에서 보여지는 리뷰 박스 (+ 텍스트)

import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { MY_PAGE_REVIEW } from "../../commons/constants/String";
import Text from "../atoms/Text";
import { UserDetailInfoState } from "../../pages/store/State";
import { getMember } from "../../apis/FrontendApi";
import ProfileReviewItemList from "./ProfileReviewItemList";

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
    <div>
      <Text size="Medium" color="White" fontFamily="PyeongChang-Bold">
        {nickname}
        {MY_PAGE_REVIEW}
      </Text>
      <ProfileReviewItemList reviews={reviewList} />
    </div>
  );
};

export default ProfileReview;
