import { ChangeEvent, useState } from "react";
import styled from "styled-components";

import {
  MY_PAGE_PROFILE_EDIT,
  FOLLOWING,
  FOLLOWER,
  ADDITIONAL_INFO_INTRODUCE_PLACEHOLDER,
  ADDITIONAL_INFO_NICKNAME_PLACEHOLDER,
  ADDITIONAL_INFO_AGE_PLACEHOLDER,
} from "../../commons/constants/String";
import Btn from "../atoms/Btn";
import HashTag from "../atoms/HashTag";
import Img from "../atoms/Img";
import Text from "../atoms/Text";
import Wrapper from "../atoms/Wrapper";
import InputBox from "../atoms/InputBox";
import { FlexColBetween } from "../../commons/style/SharedStyle";
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
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<string>(memberData?.memberImage || "");
  const [nickname, setNickname] = useState<string>(memberData?.nickname || "");
  const [age, setAge] = useState<number>(memberData?.age || 0);
  const [gender, setGender] = useState(memberData?.gender); // 여기에 받아온 값 넣어줌
  const [introduce, setIntroduce] = useState<string>(
    memberData?.introduce || ""
  );
  
  console.log(setFile, setImage)
  // const selectedOtts = memberData?.ottResDtos;

  const sendData = {
    file: file,
    nickname: nickname,
    gender: gender,
    age: age,
    introduce: introduce,
    ottList: [],
    keywordList: [],
  };

  /** 프로필 수정 버튼을 눌렀을 때 */
  const handleEditChange = () => {
    console.log("프로필 수정 버튼 누름!");
    setIsEdit(true);
  };

  /** 수정 완료를 눌렀을 때 */
  const handleUpdateChange = () => {
    // 여기에서 axios 요청
    console.log(sendData);
    setIsEdit(false);
  };
  /** 취소 버튼을 눌렀을 때 */
  const handleCancel = () => {
    setIsEdit(false);
  };

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setter(event.target.value);
    };

  /** 성별 변경 (남성 / 여성 버튼을 눌렀을 때) */
  const handleGenderChange = (selectedGender: string) => {
    setGender(selectedGender);
  };

  const handleImgChange = () => {
    console.log("이미지 바꿀 수 있게 팝업 창??");
  };
  /** 이미지 파일 선택시 상태 업데이트 */
  // const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files && event.target.files.length > 0) {
  //     const selectedFile = event.target.files[0];
  //     setFile(selectedFile);

  //     // 이미지 미리보기 URL 설정
  //     const imageUrl = URL.createObjectURL(selectedFile);
  //     setImage(imageUrl);
  //   }
  // };

  return (
    <>
      {/* 프로필 수정 버튼 눌렀을 때 배경에 검은색 opacity */}
      {isEdit === true && <StyledBlackHover />}
      <StyledUpdateWrapper size="Standard" color="WhiteGhost" padding="Narrow">
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
              {/* {selectedOtts?.map()} */}
              <Img size="Small" src="" />
              <Img size="Small" src="" />
            </div>

            <Btn size="Small" color="Black" onClick={handleEditChange}>
              {MY_PAGE_PROFILE_EDIT}
            </Btn>
          </div>
        )}
        {isEdit === true && (
          // 수정 누른 후 컨텐츠 wrapper
          <div>
            {/* 프로필 사진 수정하기 */}
            <Img
              size="X-Large"
              src={
                image ||
                // 이후 디폴트 이미지 수정 @@@
                "https://cdn.imweb.me/upload/S20210807d1f68b7a970c2/7170113c6a983.jpg"
              }
              onClick={handleImgChange}
              $point
            />

            <InputBox
              value={nickname}
              type="text"
              placeholder={ADDITIONAL_INFO_NICKNAME_PLACEHOLDER}
              onChange={handleChange(setNickname)}
            />
            <StyledTextArea
              value={introduce}
              placeholder={ADDITIONAL_INFO_INTRODUCE_PLACEHOLDER}
              onChange={handleChange(setIntroduce)}
              maxLength={30}
            ></StyledTextArea>

            {/* 나이 wrapper */}
            <div>
              <label>나이</label>
              <InputBox
                type="number"
                placeholder={ADDITIONAL_INFO_AGE_PLACEHOLDER}
                value={age}
                onChange={(e) => setAge(e.target.valueAsNumber)}
              />
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
      </StyledUpdateWrapper>
    </>
  );
};

export default MypageUserInfo;

/** 프로필 수정 버튼 눌렀을 때 배경에 검은색 opacity */
const StyledBlackHover = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1101;
`;

const StyledUpdateWrapper = styled(Wrapper)`
  ${FlexColBetween}
  text-align: center;
  position: relative;
  z-index: 1102;
`;
