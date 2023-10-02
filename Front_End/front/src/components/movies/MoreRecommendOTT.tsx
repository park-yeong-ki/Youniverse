import React from "react";
import Wrapper from "../atoms/Wrapper";

type Props = {
  onSelectOTT: (ott: string) => void;
};

const MoreRecommendOTT: React.FC<Props> = ({ onSelectOTT }) => {
  return (
    <Wrapper size="Standard" color="WhiteGhost" padding="Medium">
      {/* 예제를 위해 간단한 버튼 추가. 실제 구현에서는 원하는 OTT 선택 UI로 변경 가능. */}
      <button onClick={() => onSelectOTT("All")}>전체보기</button>
      <button onClick={() => onSelectOTT("넷플릭스")}>Netflix</button>
      <button onClick={() => onSelectOTT("왓챠")}>Watcha</button>
      <button onClick={() => onSelectOTT("웨이브")}>Wavve</button>
      <button onClick={() => onSelectOTT("애플티비")}>Apple TV</button>
      <button onClick={() => onSelectOTT("애플티비플러스")}>Apple TV Plus</button>
      <button onClick={() => onSelectOTT("디즈니플러스")}>Disney Plus</button>
    </Wrapper>
  );
};

export default MoreRecommendOTT;
