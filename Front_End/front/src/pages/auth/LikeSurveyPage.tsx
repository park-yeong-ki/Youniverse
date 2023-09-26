import { useState } from "react";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserJoinInfoState } from "../../pages/store/State";
import { LIKE_SURVEY } from "../../commons/constants/String";
import LikeForm from "../../components/organisms/LikeForm";
import Text from "../../components/atoms/Text";
import { TO_MAIN } from "../../commons/constants/String";
import Btn from "../../components/atoms/Btn";
import { FlexCenter, FlexColBetween } from "../../commons/style/SharedStyle";
import { postMember } from "../../apis/FrontendApi";

const LikeSurveyPage = () => {
  const navigate = useNavigate();
  const [userJoinInfo, setUserJoinInfo] = useRecoilState(UserJoinInfoState);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const handleToMainButtonClick = async () => {
    const updatedUserJoinInfo = {
      ...userJoinInfo,
      keywords: selectedKeywords,
    };

    setUserJoinInfo(updatedUserJoinInfo);

    try {
      const response = await postMember(updatedUserJoinInfo);
      if (response.status === 200) {
        console.log("회원 정보 등록 성공:", response.data);
        navigate("/");
      } else {
        console.error("데이터 전송 실패:", response.statusText);
      }
    } catch (error) {
      console.error("API 요청 중 에러 발생", error);
    }
  };

  return (
    <StyledContainerCenter>
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
    </StyledContainerCenter>
  );
};

export default LikeSurveyPage;

const StyledMainButton = styled(Btn)`
  width: 300px;
`;

const StyledContainerCenter = styled.div`
  ${FlexCenter}
  height: 100vh;
`;

const StyledContainerBetweenCol = styled.div`
  ${FlexColBetween};
  height: 80%;
`;

const StyledForm = styled.div`
  ${FlexCenter}
  height: 70%;
  width: 100%;
`;
