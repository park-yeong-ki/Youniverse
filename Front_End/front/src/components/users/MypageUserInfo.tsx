import {
  MY_PAGE_PROFILE_EDIT,
  FOLLOWING,
  FOLLOWER,
} from "../../commons/constants/String";
import Btn from "../atoms/Btn";
import HashTag from "../atoms/HashTag";
import Img from "../atoms/Img";
import Text from "../atoms/Text";
import Wrapper from "../atoms/Wrapper";

const MypageUserInfo = () => {
  const handleEditChange = () => {
    console.log("프로필 수정 버튼 누름!");
  };
  return (
    <Wrapper size="Standard" color="WhiteGhost" padding="Narrow">
      {/* 컨텐츠 wrapper */}
      <div>
        {/* 프로필 사진 */}
        <Img
          size="X-Large"
          src="https://lh3.googleusercontent.com/a/ACg8ocIXlVPWJf0TBSmbsIq9tvwu1JJ6UQss0bh9wjVGxhbWYQ=s96-c"
        />

        <Text size="Large" color="Black" fontFamily="YESGothic-Bold">
          사용자 이름
        </Text>
        <Text size="Small" color="Black" fontFamily="YESGothic-Regular">
          자기소개 30자 들어갈 공간
        </Text>

        {/* 해시태그 wrapper */}
        <div>
          <HashTag size="Standard" color="White">
            # 키워드
          </HashTag>
          <HashTag size="Standard" color="White">
            # 조금 긴 키워드
          </HashTag>
          <HashTag size="Standard" color="White">
            # 키워드
          </HashTag>
        </div>

        {/* OTT 행성 wrapper */}
        <div>
          <Img size="Small" src="" />
          <Img size="Small" src="" />
        </div>

        {/* 팔로잉 팔로워 wrapper */}
        <div>
          <Text size="X-Small" color="Black" fontFamily="YESGothic-Regular">
            {}3 {FOLLOWING}
          </Text>
          <Text size="X-Small" color="Black" fontFamily="YESGothic-Regular">
            {}5 {FOLLOWER}
          </Text>
        </div>

        <Btn size="Small" color="Black" onClick={handleEditChange}>
          {MY_PAGE_PROFILE_EDIT}
        </Btn>
      </div>
    </Wrapper>
  );
};

export default MypageUserInfo;
