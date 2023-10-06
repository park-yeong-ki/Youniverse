import React, { useState } from "react";
import { styled } from "styled-components";
import Wrapper from "../atoms/Wrapper";
import Btn from "../atoms/Btn";
import { FlexCenter, FlexRowEvenly } from "../../commons/style/SharedStyle";
// import { getAllKeywords } from "../../apis/FrontendApi";

const LikeForm = ({
  onKeywordsChange,
}: {
  onKeywordsChange: (keywords: number[]) => void;
}) => {
  type keywordList = {
    keywordId: number;
    keywordName: string;
  };


  const allKeywords: keywordList[] = [
    { keywordId: 9840, keywordName: "로맨스" },
    { keywordId: 219404, keywordName: "액션 히어로" },
    { keywordId: 83, keywordName: "세상을 구하다" },
    { keywordId: 316362, keywordName: "스릴러" },
    { keywordId: 298517, keywordName: "과학 판타지" },
    { keywordId: 281358, keywordName: "공상 과학" },
    { keywordId: 220509, keywordName: "전 세계적인 재난" },
    { keywordId: 273879, keywordName: "셜록 홈즈" },
    { keywordId: 273967, keywordName: "전쟁" },
    { keywordId: 276130, keywordName: "초자연적 사건" },
    { keywordId: 310, keywordName: "인공 지능(AI)" },
    { keywordId: 312, keywordName: "인간 대 기계" },
    { keywordId: 316332, keywordName: "미스터리" },
    { keywordId: 18035, keywordName: "가족" },
    { keywordId: 378, keywordName: "감옥" },
    { keywordId: 383, keywordName: "포커" },
    { keywordId: 247799, keywordName: "액션 코미디" },
    { keywordId: 470, keywordName: "스파이" },
    { keywordId: 242831, keywordName: "공포" },
    { keywordId: 15126, keywordName: "역사" },
    { keywordId: 782, keywordName: "암살자" },
    { keywordId: 203322, keywordName: "드라마" },
    { keywordId: 280566, keywordName: "액션 어드벤처" },
    { keywordId: 818, keywordName: "소설 또는 도서 기반" },
    { keywordId: 4344, keywordName: "뮤지컬" },
    { keywordId: 849, keywordName: "DC 코믹스" },
    { keywordId: 898, keywordName: "힙합" },
    { keywordId: 917, keywordName: "저널리즘" },
    { keywordId: 219896, keywordName: "동화" },
    { keywordId: 213784, keywordName: "대자연" },
    { keywordId: 220522, keywordName: "미해결 범죄" },
    { keywordId: 1326, keywordName: "불륜" },
    { keywordId: 1480, keywordName: "야구" },
    { keywordId: 6054, keywordName: "우정" },
    { keywordId: 6211, keywordName: "전투기" },
    { keywordId: 1612, keywordName: "우주선" },
    { keywordId: 9748, keywordName: "복수" },
    { keywordId: 15325, keywordName: "우주" },
    { keywordId: 14636, keywordName: "인도" },
    { keywordId: 10855, keywordName: "운명" },
    { keywordId: 209817, keywordName: "정치 스릴러" },
    { keywordId: 207459, keywordName: "금융" },
    { keywordId: 191726, keywordName: "나치즘" },
    { keywordId: 230191, keywordName: "유령" },
    { keywordId: 287271, keywordName: "로봇" },
    { keywordId: 5147, keywordName: "마법" },
    { keywordId: 6075, keywordName: "스포츠" },
    { keywordId: 1849, keywordName: "살인" },
    { keywordId: 2132, keywordName: "문학" },
    { keywordId: 257735, keywordName: "유대인" },
    { keywordId: 3754, keywordName: "전설" },
    { keywordId: 9935, keywordName: "여행" },
    { keywordId: 12332, keywordName: "아포칼립스" },
    { keywordId: 12988, keywordName: "해적" },
    { keywordId: 12990, keywordName: "노래" },
    { keywordId: 208630, keywordName: "대테러" },
    { keywordId: 173644, keywordName: "공산주의" },
    { keywordId: 12377, keywordName: "좀비" },
    { keywordId: 2035, keywordName: "신화" },
    { keywordId: 210024, keywordName: "애니메이션" },
    { keywordId: 9717, keywordName: "만화 원작" },
    { keywordId: 9715, keywordName: "슈퍼히어로" },
    { keywordId: 173374, keywordName: "게임" },
    { keywordId: 316313, keywordName: "월트 디즈니" },
    { keywordId: 260672, keywordName: "대한민국" },
    { keywordId: 4613, keywordName: "교육" },
    { keywordId: 10221, keywordName: "운석" },
    { keywordId: 10812, keywordName: "비행기 사고" },
    { keywordId: 3616, keywordName: "대학" },
    { keywordId: 11001, keywordName: "종교" },
    { keywordId: 317975, keywordName: "음악 영화" },
    { keywordId: 322262, keywordName: "스타워즈" },
    { keywordId: 319313, keywordName: "칸 영화제" },
    { keywordId: 6257, keywordName: "천재" },
    { keywordId: 2964, keywordName: "미래" },
    { keywordId: 263548, keywordName: "단편 영화" },
    { keywordId: 254515, keywordName: "일본 영화" },
    { keywordId: 213803, keywordName: "프랑스 영화" },
    { keywordId: 478, keywordName: "중국" },
    { keywordId: 131, keywordName: "이탈리아" },
    { keywordId: 392, keywordName: "영국" },
    { keywordId: 282080, keywordName: "다큐멘터리" },
    { keywordId: 490, keywordName: "철학" },
    { keywordId: 188957, keywordName: "바이러스" },
    { keywordId: 209085, keywordName: "도둑" },
    { keywordId: 298953, keywordName: "자동차 경주" },
    { keywordId: 3490, keywordName: "팝스타" },
    { keywordId: 1279, keywordName: "의학" },
    { keywordId: 207317, keywordName: "크리스마스" },
    { keywordId: 316666, keywordName: "첨단 기술" },
    { keywordId: 14638, keywordName: "미국" },
    { keywordId: 677, keywordName: "핵전쟁" },
    { keywordId: 679, keywordName: "사이보그" },
    { keywordId: 41406, keywordName: "중세" },
    { keywordId: 18034, keywordName: "사막" },
    { keywordId: 577, keywordName: "흑인" },
    { keywordId: 4480, keywordName: "사업가" },
    { keywordId: 5571, keywordName: "대공황" },
    { keywordId: 2149, keywordName: "마약 밀매" },
    { keywordId: 2157, keywordName: "해커" }
  ];

  const shuffle = (array: keywordList[]) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  };

  const randomKeywords = shuffle([...allKeywords]).slice(0, 20);

  const [buttonKeywords] = useState<keywordList[]>(randomKeywords);
  const [selectedKeywords, setSelectedKeywords] = useState<keywordList[]>([]);

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
