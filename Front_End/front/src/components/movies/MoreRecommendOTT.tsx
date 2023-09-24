import React from "react";
import Wrapper from "../atoms/Wrapper";

type Props = {
    onSelectOTT: (ott: string) => void;
  };
  
  // 2. 컴포넌트의 props를 위에서 정의한 `Props` 타입으로 지정합니다.
  const MoreRecommendOTT: React.FC<Props> = ({ onSelectOTT }) => {
    return (
      <Wrapper size="Standard" color="WhiteGhost" padding="Medium">
        {/* 예제를 위해 간단한 버튼 추가. 실제 구현에서는 원하는 OTT 선택 UI로 변경 가능. */}
        <button onClick={() => onSelectOTT("All")}>전체보기</button>
        <button onClick={() => onSelectOTT("Netflix")}>Netflix</button>
        <button onClick={() => onSelectOTT("Watcha")}>Watcha</button>
        <button onClick={() => onSelectOTT("Wavve")}>Wavve</button>
        <button onClick={() => onSelectOTT("AppleTV")}>Apple TV</button>
        <button onClick={() => onSelectOTT("DisneyPlus")}>Disney Plus</button>
        {/* ... 다른 OTT 버튼들 */}
      </Wrapper>
    );
  };
  
  export default MoreRecommendOTT;
