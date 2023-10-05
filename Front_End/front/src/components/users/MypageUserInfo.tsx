import { ChangeEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useRecoilValue, useSetRecoilState } from "recoil";

import {
  MY_PAGE_PROFILE_EDIT,
  FOLLOWING,
  FOLLOWER,
  ADDITIONAL_INFO_INTRODUCE_PLACEHOLDER,
  ADDITIONAL_INFO_NICKNAME_PLACEHOLDER,
  ADDITIONAL_INFO_AGE_PLACEHOLDER,
} from "../../commons/constants/String";
import { ROUTES } from "../../commons/constants/Routes";
import { DataState, UserInfoState } from "../../pages/store/State";
import { getAllOTTs, putMember } from "../../apis/FrontendApi";

import Btn from "../atoms/Btn";
import HashTag from "../atoms/HashTag";
import Img from "../atoms/Img";
import Text from "../atoms/Text";
import Wrapper from "../atoms/Wrapper";
import InputBox from "../atoms/InputBox";
import Planet from "../atoms/Planet";
import {
  FlexColBetween,
  FlexRowBetween,
} from "../../commons/style/SharedStyle";
import { StyledTextArea } from "../organisms/AdditionalForm";
import { UserType } from "../../pages/profile/MyProfilePage";

interface MypageUserInfoProps {
  memberData: UserType | null;
  setMemberData: React.Dispatch<React.SetStateAction<UserType | null>>;
  followStatus: string;
  setFollowStatus: React.Dispatch<React.SetStateAction<string>>;
}

const MypageUserInfo: React.FC<MypageUserInfoProps> = ({
  memberData,
  setMemberData,
  followStatus,
  setFollowStatus,
}) => {
  const navigate = useNavigate();
  const basicImage = "/assets/DefaultProfile.png";
  const email = useRecoilValue(UserInfoState).email;
  const setDataState = useSetRecoilState(DataState);

  const [isEdit, setIsEdit] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<string>(memberData?.memberImage || "");
  const [nickname, setNickname] = useState<string>(memberData?.nickname || "");
  const [age, setAge] = useState<number>(memberData?.age || 0);
  const [gender, setGender] = useState<string | null>(
    memberData?.gender || null
  ); // 여기에 받아온 값 넣어줌
  const [introduce, setIntroduce] = useState<string>(
    memberData?.introduce || ""
  );

  const selectedOtts = memberData?.ottResDtos; // 선택한 Ott
  const selectedKeywords = memberData?.youtubeKeywordResDtos; // 유튜브 키워드로 변경
  const selectedOttsNumber = selectedOtts?.map((ott) => ott.ottId);
  const [selectedPlanets, setSelectedPlanets] = useState<number[]>(
    selectedOttsNumber ? [...selectedOttsNumber] : []
  );
  const [planetSelectedStates, setPlanetSelectedStates] = useState<
    Record<number, boolean>
  >({});
  // OTT 데이터를 담을 상태
  const [ottData, setOttData] = useState<any[]>([]);
  useEffect(() => {
    getAllOTTs()
      .then((response) => {
        setOttData(response.data);
        // 백서버에서 가져온 데이터를 기반으로 planetSelectedStates 초기화
        const initialPlanetStates: Record<number, boolean> = {};
        response.data.forEach((ott: any) => {
          initialPlanetStates[ott.ottId] = selectedPlanets.includes(ott.ottId);
        });
        setPlanetSelectedStates(initialPlanetStates);
      })
      .catch((error) => {
        console.error("OTT 리스트 가져오기 실패:", error);
      });
  }, [selectedPlanets]);

  const handleDataStateChange = () => {
    setDataState(true);
    navigate(ROUTES.LOADING);
  };

  const handleClickedPlanets = (planetId: number, $isSelected: boolean) => {
    if (selectedPlanets.includes(planetId)) {
      // 행성 이름이 이미 selectedPlanets에 있다면 제거
      setSelectedPlanets((prev) => {
        const updatedPlanets = prev.filter((id) => id !== planetId);
        console.log("Updated Planets:", updatedPlanets); // 상태 출력
        return updatedPlanets;
      });
    } else {
      // 행성 이름이 selectedPlanets에 없다면 추가
      setSelectedPlanets((prev) => {
        const updatedPlanets = [...prev, planetId];
        console.log("Updated Planets:", updatedPlanets); // 상태 출력
        return updatedPlanets;
      });
    }
    // 각 행성의 클릭 상태를 저장
    setPlanetSelectedStates((prev) => ({
      ...prev,
      [planetId]: $isSelected,
    }));
  };

  const sendData = {
    file: file,
    nickname: nickname,
    email: email,
    gender: gender,
    age: age,
    introduce: introduce,
    ottList: selectedPlanets,
    keywordList: [],
  };

  /** 프로필 수정 버튼을 눌렀을 때 */
  const handleEditChange = () => {
    console.log("프로필 수정 버튼 누름!");
    setIsEdit(true);
  };

  /** 수정 완료를 눌렀을 때 */
  const handleUpdateChange = () => {
    if (!sendData.gender) {
      alert("성별을 선택해주세요!");
      return;
    }

    // 여기에서 axios 요청
    putMember(Number(memberData?.memberId), sendData)
      .then((response) => {
        setMemberData(response.data);
        setIsEdit(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  /** 취소 버튼을 눌렀을 때 */
  const handleCancel = () => {
    // 초기화
    setFile(null);
    setImage(memberData?.memberImage || "");
    setNickname(memberData?.nickname || "");
    setAge(memberData?.age || 0);
    setGender(memberData?.gender || null);
    setIntroduce(memberData?.introduce || "");
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
    fileInputRef.current?.click();
  };
  /** 이미지 파일 선택시 상태 업데이트 */
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);

      // 이미지 미리보기 URL 설정
      const imageUrl = URL.createObjectURL(selectedFile);
      setImage(imageUrl);
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      {/* 프로필 수정 버튼 눌렀을 때 배경에 검은색 opacity */}
      {isEdit === true && <StyledBlackHover />}
      <StyledUpdateWrapper size="Standard" color="WhiteGhost" padding="Narrow">
        {isEdit === false && (
          // 수정 누르기 전 컨텐츠 wrapper
          <>
            {/* 프로필 사진 */}
            <Img
              size="X-Large"
              src={
                memberData?.memberImage ||
                // 이후 디폴트 이미지 수정 @@@
                basicImage ||
                ""
              }
            />

            <Text size="Large" color="Black" fontFamily="YESGothic-Bold">
              {memberData?.nickname}
            </Text>
            <Text size="Small" color="Black" fontFamily="YESGothic-Regular">
              {memberData?.introduce || "등록된 자기소개가 없습니다."}
            </Text>

            {/* 해시태그 (키워드) wrapper */}
            <StyledKeywordWrap>
              {selectedKeywords?.slice(0, 4).map((keyword, index) => (
                <HashTag size="Standard" color="White" key={index}>
                  # {keyword.youtubeKeywordName}
                </HashTag>
              ))}
            </StyledKeywordWrap>

            {/* 팔로잉 팔로워 wrapper */}
            <StyledRowWrap>
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
            </StyledRowWrap>

            {/* OTT 행성 wrapper */}
            <StyledRowWrap>
              {selectedOtts?.map((ott) => (
                <a
                  href={ott.ottUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={ott.ottId}
                >
                  <Planet
                    size="Small"
                    src={ott.ottImage}
                    planetId={ott.ottId}
                    name={ott.ottName}
                    $mypage
                  />
                </a>
              ))}
            </StyledRowWrap>
            <StyledBtnWrap>
              <Btn size="Small" color="Black" onClick={handleEditChange}>
                {MY_PAGE_PROFILE_EDIT}
              </Btn>
              <Btn
                size="Small"
                color="BlackStroke"
                onClick={handleDataStateChange}
              >
                데이터 분석
              </Btn>
            </StyledBtnWrap>
          </>
        )}
        {isEdit === true && (
          // 수정 누른 후 컨텐츠 wrapper
          <>
            {/* 프로필 사진 수정하기 */}
            <Img
              size="X-Large"
              src={
                image ||
                // 이후 디폴트 이미지 수정 @@@
                basicImage ||
                ""
              }
              onClick={handleImgChange}
              $point
            />
            <input
              type="file"
              accept=".jpeg, .jpg, .png"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }} // 숨겨진 input
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
            <StyledAgeWrap>
              <label>나이</label>
              <InputBox
                type="number"
                placeholder={ADDITIONAL_INFO_AGE_PLACEHOLDER}
                value={age}
                onChange={(e) => setAge(e.target.valueAsNumber)}
              />
              <span>세</span>
            </StyledAgeWrap>

            {/* 성별 wrapper */}
            <StyledGenderWrap>
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
            </StyledGenderWrap>

            {/* OTT 행성 wrapper */}
            <StyledRowWrap>
              {ottData.map((ott) => (
                <div key={ott.ottId}>
                  <Planet
                    size="Small"
                    planetId={ott.ottId}
                    src={ott.ottImage}
                    name={ott.ottName}
                    handleClickedPlanets={handleClickedPlanets}
                    initialSelected={planetSelectedStates[ott.ottId] || false}
                  />
                </div>
              ))}
            </StyledRowWrap>

            {/* 수정 취소 버튼 wrapper */}
            <StyledUpdateWrap>
              <Btn size="Small" color="White" onClick={handleCancel}>
                취소
              </Btn>
              <Btn size="Small" color="Black" onClick={handleUpdateChange}>
                수정 완료
              </Btn>
            </StyledUpdateWrap>
          </>
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

const StyledRowWrap = styled.div`
  ${FlexRowBetween}
  width: 70%;
  margin: 0 auto;
`;

const StyledKeywordWrap = styled.div`
  ${FlexRowBetween}
  flex-wrap: wrap;
  width: 70%;
  margin: 0 auto;
`;

const StyledGenderWrap = styled.div`
  ${FlexRowBetween}
  width: 70%;
  margin: 0 auto;

  & > * {
    width: 48%;
  }
`;
const StyledUpdateWrap = styled.div`
  ${FlexRowBetween}
  width: 100%;
  margin: 0 auto;

  & > * {
    width: 48%;
  }
`;
const StyledAgeWrap = styled.div`
  ${FlexRowBetween}
  width: 70%;
  margin: 0 auto;

  & > input {
    width: 50%;
    text-align: center;
  }
`;

const StyledBtnWrap = styled.div`
  ${FlexColBetween}
  width: 100%;
  & > * {
    margin-top: 2%;
  }
`;
