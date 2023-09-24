import { useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LIKE_SURVEY } from "../../commons/constants/String";
import LikeForm from "../../components/organisms/LikeForm";
import Text from "../../components/atoms/Text";
import { TO_MAIN } from "../../commons/constants/String";
import Btn from "../../components/atoms/Btn";
import { FlexCenter, FlexColBetween } from "../../commons/style/SharedStyle";

const LikeSurveyPage = () => {
  const navigate = useNavigate();
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const handleToMainButtonClick = async (): Promise<void> => {
    try {
      await axios.post("API 주소", { keywords: selectedKeywords });
    } catch (error) {
      console.error("키워드 전송 실패", error);
    }
    navigate("/"); // 메인으로 이동
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
