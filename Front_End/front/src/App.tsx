import React, { useState } from "react";
<<<<<<< HEAD
import StarryBackground from "./commons/style/StarryBackground";
import Container from "./components/atoms/Container";
=======

import { GlobalStyles } from "./commons/style/GlobalStyle";
import StarryBackground from "./commons/style/StarryBackground";

>>>>>>> 8677a43b08c2e3f0a918e086c92bab9a39bb78e3
import Btn from "./components/atoms/Btn";
import HashTag from "./components/atoms/HashTag";
import InputBox from "./components/atoms/InputBox";
import Img from "./components/atoms/Img";

const sayHelloHandler = () => {
  console.log("안뇽~");
};

function App() {
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");

  const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue1(e.target.value);
  };

  const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue2(e.target.value);
  };

<<<<<<< HEAD
  return (
    <div>
      <GlobalStyles />
      <StarryBackground />
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
=======
    return (
        <div>
            <GlobalStyles />
            <StarryBackground />
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
>>>>>>> 8677a43b08c2e3f0a918e086c92bab9a39bb78e3

      <InputBox
        placeholder="이름을 입력해주세요"
        type="text"
        value={inputValue2}
        onChange={handleChange2}
        color="BlackStroke"
      />

      {/* 입력된 값 표시 (옵션) */}
      <div>{inputValue2}</div>

<<<<<<< HEAD
      {/* 버튼 예제 */}
      <div>
        <Btn size={"X-Small"} color={"Purple"}>
          저장
        </Btn>
        <Btn size={"Circle"} color={"Black"}>
          💖
        </Btn>
      </div>
=======
            {/* 버튼 예제 */}
            <div>
                <Btn size={"X-Small"} color={"Purple"}>
                    저장
                </Btn>
                <Btn size={"Circle"} color={"Black"}>
                    💖
                </Btn>
            </div>
>>>>>>> 8677a43b08c2e3f0a918e086c92bab9a39bb78e3

      <div></div>
      <Container size={"Standard"} color={"WhiteGhost"} padding={"Wide"}>
        <Container size={"Small"} color={"Clear"} padding={"Wide"}>
          투명 고스트 컨테이너
        </Container>
        <Container size={"Small"} color={"BlackGhost"} padding={"Medium"}>
          검은색 고스트 컨테이너
        </Container>
        <Container size={"Small"} color={"WhiteGhost"} padding={"Narrow"}>
          흰색 고스트 컨테이너
        </Container>
        표준 컨테이너
      </Container>

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

<<<<<<< HEAD
      <Img
        size={"X-Large"}
        src={"/assets/ㄷㅇㅅㅇ.png"}
        onClick={sayHelloHandler}
        // hover
        //$point
      />
    </div>
  );
=======
            <Img
                size={"X-Large"}
                src={"/assets/ㄷㅇㅅㅇ.png"}
                onClick={sayHelloHandler}
                // hover
                // $point
            />
        </div>
    );
>>>>>>> 8677a43b08c2e3f0a918e086c92bab9a39bb78e3
}

export default App;
