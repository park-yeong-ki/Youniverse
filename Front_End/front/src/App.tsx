import React, { useState } from "react";
import Btn from "./components/atoms/Btn";
import HashTag from "./components/atoms/HashTag";
import InputBox from "./components/atoms/InputBox";
import { GlobalStyles } from "./commons/style/GlobalStyle";

function App() {
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");

  const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue1(e.target.value);
  };

  const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue2(e.target.value);
  };

  return (
    <div style={{ backgroundColor: "purple" }}>
      {/* InputBox 사용 예제 */}
      <InputBox
        placeholder="이름을 입력해주세요"
        type="text"
        value={inputValue1}
        onChange={handleChange1}
        color="WhiteStroke"
      />
      {/* 입력된 값 표시 (옵션) */}
      <div>{inputValue1}</div>

      <InputBox
        placeholder="이름을 입력해주세요"
        type="text"
        value={inputValue2}
        onChange={handleChange2}
        color="BlackStroke"
      />

      {/* 입력된 값 표시 (옵션) */}
      <div>{inputValue2}</div>

      {/* 버튼 예제 */}
      <div>
        <GlobalStyles />
        <Btn size={"X-Small"} color={"Purple"}>
          저장
        </Btn>
        <Btn size={"Circle"} color={"Black"}>
          💖
        </Btn>
      </div>

      <div></div>

      {/* 해시태그 예제 */}
      <div>
        <HashTag size={"Huge"} color={"BlackGhost"}>
          # 메인 별자리
        </HashTag>
        <HashTag size={"Standard"} color={"White"}>
          # 수사물
        </HashTag>
        <HashTag size={"Standard"} color={"Black"}>
          # 스릴러
        </HashTag>
        <HashTag size={"Standard"} color={"WhiteGhost"}>
          # 정해인
        </HashTag>
        <HashTag size={"Standard"} color={"BlackGhost"}>
          # 김태리
        </HashTag>
      </div>
    </div>
  );
}

export default App;
