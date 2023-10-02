import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import Wrapper from "../atoms/Wrapper";
import Btn from "../atoms/Btn";
import { FlexCenter, FlexRowEvenly } from "../../commons/style/SharedStyle";
import { getAllKeywords } from "../../apis/FrontendApi";

const LikeForm = ({
  onKeywordsChange,
}: {
  onKeywordsChange: (keywords: number[]) => void;
}) => {
  type keywordList = {
    keywordId: number;
    keywordName: string;
  };

  const [buttonKeywords, setButtonKeywords] = useState<keywordList[]>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<keywordList[]>([]);

  useEffect(() => {
    const RandomKeywords = async () => {
      try {
        const response = await getAllKeywords({ random: true });
        console.log(response.data);
        setButtonKeywords(response.data);
      } catch (error) {
        console.error("데이터 가져오기 실패", error);
      }
    };

    RandomKeywords();
  }, []);

  const handleButtonClick = (keyword: keywordList) => {
    if (selectedKeywords.includes(keyword)) {
      const newSelected = selectedKeywords.filter((k) => k !== keyword);
      setSelectedKeywords(newSelected);
      onKeywordsChange(newSelected.map((k) => k.keywordId));
    } else {
      const newSelected = [...selectedKeywords, keyword];
      setSelectedKeywords(newSelected);
      onKeywordsChange(newSelected.map((k) => k.keywordId));
    }
  };

  return (
    <StyledStandardWhiteGhostWrapper
      size="Standard"
      color="WhiteGhost"
      padding="Medium"
    >
      <StyledContainerRowBetween>
        {buttonKeywords.map((keyword) => (
          <StyledkeywordButton
            key={keyword.keywordId}
            size="X-Large"
            color="Purple"
            onClick={() => handleButtonClick(keyword)}
            isSelected={selectedKeywords.some(
              (k) => k.keywordName === keyword.keywordName
            )}
          >
            {keyword.keywordName}
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
