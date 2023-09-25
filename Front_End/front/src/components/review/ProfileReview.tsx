// 프로필에서 보여지는 리뷰 박스 (+ 텍스트)

import { MY_PAGE_REVIEW } from "../../commons/constants/String";
import Text from "../atoms/Text";

const ProfileReview = () => {
  return (
    <div>
      <Text size="Medium" color="White" fontFamily="PyeongChang-Bold">
        유저{MY_PAGE_REVIEW}
      </Text>
      {/* 리뷰 wrapper */}
      <div></div>
    </div>
  );
};

export default ProfileReview;
