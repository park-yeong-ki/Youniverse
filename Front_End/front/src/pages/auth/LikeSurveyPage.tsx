import { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  LoginState,
  MemberIdState,
  UserJoinInfoState,
} from "../../pages/store/State";
import { LIKE_SURVEY } from "../../commons/constants/String";
import LikeForm from "../../components/organisms/LikeForm";
import Text from "../../components/atoms/Text";
import { TO_MAIN } from "../../commons/constants/String";
import Btn from "../../components/atoms/Btn";
import { FlexCenter, FlexColBetween } from "../../commons/style/SharedStyle";
import { putMember } from "../../apis/FrontendApi";
import { MainContainer } from "../../commons/style/layoutStyle";
import { ROUTES } from "../../commons/constants/Routes";

const LikeSurveyPage = () => {
  const navigate = useNavigate();
  const setIsLoggedIn = useSetRecoilState(LoginState);
  const [userJoinInfo, setUserJoinInfo] = useRecoilState(UserJoinInfoState);
  const [selectedKeywords, setSelectedKeywords] = useState<number[]>([]);
  const memberIdState = useRecoilValue(MemberIdState);
  const handleToMainButtonClick = async () => {
    const updatedUserJoinInfo = {
      ...userJoinInfo,
      keywordList: selectedKeywords,
    };

    setUserJoinInfo(updatedUserJoinInfo);
    try {
      const response = await putMember(
        Number(memberIdState),
        updatedUserJoinInfo
      );
      if (response.status === 200) {
        console.log("회원 정보 등록 성공:", response.data);
        setIsLoggedIn(true);
        navigate(ROUTES.MAIN);
      } else {
        console.error("데이터 전송 실패:", response.statusText);
      }
    } catch (error) {
      console.error("API 요청 중 에러 발생", error);
    }
  };

  return (
    <MainContainer>
      <StyledContainerBetweenCol>
        <Text size="Large" color="White" fontFamily="PyeongChang-Bold">
          {LIKE_SURVEY}
        </Text>
        <StyledForm>
          <LikeForm onKeywordsChange={setSelectedKeywords} />
        </StyledForm>
        <StyledMainButton
          size="X-Large"
          color="Black"
          onClick={handleToMainButtonClick}
        >
          {TO_MAIN}
        </StyledMainButton>
      </StyledContainerBetweenCol>
    </MainContainer>
  );
};

export default LikeSurveyPage;

const StyledMainButton = styled(Btn)`
  width: 300px;
`;

const StyledContainerBetweenCol = styled.div`
  ${FlexColBetween};
  height: 90%;
  padding-top: 2%;
`;

const StyledForm = styled.div`
  ${FlexCenter}
  height: 70%;
  width: 100%;
`;
