import { useState } from "react";
import {
  MY_PAGE_PROFILE_EDIT,
  FOLLOWING,
  FOLLOWER,
  ADDITIONAL_INFO_INTRODUCE_PLACEHOLDER,
} from "../../commons/constants/String";
import Btn from "../atoms/Btn";
import HashTag from "../atoms/HashTag";
import Img from "../atoms/Img";
import Text from "../atoms/Text";
import Wrapper from "../atoms/Wrapper";
import styled from "styled-components";
import InputBox from "../atoms/InputBox";
import { StyledTextArea } from "../organisms/AdditionalForm";
import { UserType } from "../../pages/profile/MyProfilePage";

interface MypageUserInfoProps {
  memberData: UserType | null;
  followStatus: string;
  setFollowStatus: React.Dispatch<React.SetStateAction<string>>;
}

const MypageUserInfo: React.FC<MypageUserInfoProps> = ({
  memberData,
  followStatus,
  setFollowStatus,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [gender, setGender] = useState("남성"); // 여기에 받아온 값 넣어줌

  /** 프로필 수정 버튼을 눌렀을 때 */
  const handleEditChange = () => {
    console.log("프로필 수정 버튼 누름!");
    setIsEdit(true);
  };

  /** 수정 완료를 눌렀을 때 */
  const handleUpdateChange = () => {
    // 여기에서 axios 요청
    setIsEdit(false);
  };
  /** 취소 버튼을 눌렀을 때 */
  const handleCancel = () => {
    setIsEdit(false);
  };

  /** 성별 변경 (남성 / 여성 버튼을 눌렀을 때) */
  const handleGenderChange = (selectedGender: string) => {
    setGender(selectedGender);
  };

  const handleImgChange = () => {
    console.log("이미지 바꿀 수 있게 팝업 창??");
  };
  return (
    <Wrapper size="Standard" color="WhiteGhost" padding="Narrow">
      {isEdit === false && (
        // 수정 누르기 전 컨텐츠 wrapper
        <div>
          {/* 프로필 사진 */}
          <Img
            size="X-Large"
            src={
              memberData?.memberImage ||
              // 이후 디폴트 이미지 수정 @@@
              "https://cdn.imweb.me/upload/S20210807d1f68b7a970c2/7170113c6a983.jpg"
            }
          />

          <Text size="Large" color="Black" fontFamily="YESGothic-Bold">
            {memberData?.nickname}
          </Text>

          {/* 팔로잉 팔로워 wrapper */}
          <div>
            <Text
              size="X-Small"
              color="Black"
              fontFamily={
                followStatus === FOLLOWING
                  ? "YESGothic-Bold"
                  : "YESGothic-Regular"
              }
              onClick={() => setFollowStatus(FOLLOWING)}
            >
              {memberData?.followings.length} {FOLLOWING}
            </Text>
            <Text
              size="X-Small"
              color="Black"
              fontFamily={
                followStatus === FOLLOWER
                  ? "YESGothic-Bold"
                  : "YESGothic-Regular"
              }
              onClick={() => setFollowStatus(FOLLOWER)}
            >
              {memberData?.followers.length} {FOLLOWER}
            </Text>
          </div>

          <Text size="Small" color="Black" fontFamily="YESGothic-Regular">
            {memberData?.introduce || "등록된 자기소개가 없습니다."}
          </Text>

          {/* 해시태그 wrapper */}
          <div>
            <HashTag size="Standard" color="White">
              # 키워드
            </HashTag>
          </div>

          {/* OTT 행성 wrapper */}
          <div>
            <Img size="Small" src="" />
            <Img size="Small" src="" />
          </div>

          <Btn size="Small" color="Black" onClick={handleEditChange}>
            {MY_PAGE_PROFILE_EDIT}
          </Btn>
        </div>
      )}
      {isEdit === true && (
        // 프로필 수정 버튼 눌렀을 때 배경에 검은색 opacity
        // <StyledBlackHover />

        // 수정 누른 후 컨텐츠 wrapper
        <div>
          {/* 프로필 사진 수정하기 */}
          <div>
            <Img
              size="X-Large"
              src="https://lh3.googleusercontent.com/a/ACg8ocIXlVPWJf0TBSmbsIq9tvwu1JJ6UQss0bh9wjVGxhbWYQ=s96-c"
              onClick={handleImgChange}
              $point
            />
            <div>프로필 사진 수정하기</div>
          </div>

          <InputBox value="변경(기존이름)" type="text" />
          <StyledTextArea placeholder={ADDITIONAL_INFO_INTRODUCE_PLACEHOLDER}>
            기존에 담겨있던 내용
          </StyledTextArea>

          {/* 나이 wrapper */}
          <div>
            <label>나이</label>
            <InputBox value="22" type="number" />
            <span>세</span>
          </div>

          {/* 성별 wrapper */}
          <div>
            <Btn
              size="Small"
              color={gender === "남성" ? "Black" : "White"}
              onClick={() => handleGenderChange("남성")}
            >
              남성
            </Btn>
            <Btn
              size="Small"
              color={gender === "여성" ? "Black" : "White"}
              onClick={() => handleGenderChange("여성")}
            >
              여성
            </Btn>
          </div>

          {/* OTT 행성 wrapper */}
          <div>
            <Img size="Small" src="" />
            <Img size="Small" src="" />
            <Img size="Small" src="" />
            <Img size="Small" src="" />
            <Img size="Small" src="" />
          </div>

          {/* 수정 취소 버튼 wrapper */}
          <div>
            <Btn size="Small" color="White" onClick={handleCancel}>
              취소
            </Btn>
            <Btn size="Small" color="Black" onClick={handleUpdateChange}>
              수정 완료
            </Btn>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default MypageUserInfo;

/** 프로필 수정 버튼 눌렀을 때 배경에 검은색 opacity */
export const StyledBlackHover = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 2;
`;
