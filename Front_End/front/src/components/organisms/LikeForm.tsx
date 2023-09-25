import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import Wrapper from "../atoms/Wrapper";
import Btn from "../atoms/Btn";
import { FlexCenter, FlexRowEvenly } from "../../commons/style/SharedStyle";
import { getAllKeywords } from "../../apis/FrontendApi";

const LikeForm = ({
  onKeywordsChange,
}: {
  onKeywordsChange: (keywords: string[]) => void;
}) => {
  const [buttonKeywords, setButtonKeywords] = useState<string[]>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  useEffect(() => {
    const RandomKeywords = async () => {
      try {
        const response = await getAllKeywords();
        setButtonKeywords(response.data.keywords);
      } catch (error) {
        console.error("데이터 가져오기 실패", error);
      }
    };

    RandomKeywords();
  }, []);

  const handleButtonClick = (keyword: string) => {
    if (selectedKeywords.includes(keyword)) {
      const newSelected = selectedKeywords.filter((k) => k !== keyword);
      setSelectedKeywords(newSelected);
      onKeywordsChange(newSelected);
    } else {
      const newSelected = [...selectedKeywords, keyword];
      setSelectedKeywords(newSelected);
      onKeywordsChange(newSelected);
    }
  };

  return (
    <StyledStandardWhiteGhostWrapper
      size="Standard"
      color="WhiteGhost"
      padding="Medium"
    >
      <StyledContainerRowBetween>
        <StyledkeywordButton size="Large" color="Purple">
          임시 키워드
        </StyledkeywordButton>
        <StyledkeywordButton size="Large" color="Purple">
          길이가 어떻든 간에 너비 조정
        </StyledkeywordButton>
        <StyledkeywordButton size="Large" color="Purple">
          임시 키워드
        </StyledkeywordButton>
        <StyledkeywordButton size="Large" color="Purple">
          임시 키워드
        </StyledkeywordButton>
        <StyledkeywordButton size="Large" color="Purple">
          임시 키워드
        </StyledkeywordButton>
        <StyledkeywordButton size="Large" color="Purple">
          길이가 어떻든 간에 너비 조정
        </StyledkeywordButton>
        <StyledkeywordButton size="Large" color="Purple">
          임시 키워드
        </StyledkeywordButton>
        <StyledkeywordButton size="Large" color="Purple">
          길이가 어떻든 간
        </StyledkeywordButton>
        <StyledkeywordButton size="Large" color="Purple">
          임시 키워드
        </StyledkeywordButton>
        <StyledkeywordButton size="Large" color="Purple">
          임시 키워드
        </StyledkeywordButton>
        <StyledkeywordButton size="Large" color="Purple">
          임시 키워드
        </StyledkeywordButton>
        <StyledkeywordButton size="Large" color="Purple">
          길이가 어떻든 간에 너비 조정
        </StyledkeywordButton>
        <StyledkeywordButton size="Large" color="Purple">
          임시 키워드
        </StyledkeywordButton>
        <StyledkeywordButton size="Large" color="Purple">
          임시 키워드
        </StyledkeywordButton>
        <StyledkeywordButton size="Large" color="Purple">
          임시 키워드
        </StyledkeywordButton>
        <StyledkeywordButton size="Large" color="Purple">
          길이가 어떻든 간
        </StyledkeywordButton>
        {buttonKeywords.map((keyword, index) => (
          <StyledkeywordButton
            key={index}
            size="X-Large"
            color="Purple"
            onClick={() => handleButtonClick(keyword)}
            isSelected={selectedKeywords.includes(keyword)}
          >
            {keyword}
          </StyledkeywordButton>
        ))}
      </StyledContainerRowBetween>
    </StyledStandardWhiteGhostWrapper>
  );
};

export default LikeForm;

const StyledStandardWhiteGhostWrapper = styled(Wrapper)`
  ${FlexCenter}
  width: 1024px;
`;

const StyledContainerRowBetween = styled.div`
  ${FlexRowEvenly}
`;

const StyledkeywordButton = styled(Btn)<{ isSelected?: boolean }>`
  width: auto;
  padding: 10px 10px;
  font-family: "YESGothic-Regular";

  // 선택된 상태일 때의 스타일
  box-shadow: ${(props) =>
    props.isSelected ? "0px 0px 8px 0px rgba(204, 0, 255, 0.70)" : "none"};
`;
