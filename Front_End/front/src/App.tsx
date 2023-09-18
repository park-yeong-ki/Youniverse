import React from "react";

import Btn from "./components/atoms/Btn";
import { GlobalStyles } from "./commons/style/GlobalStyle";

function App() {
  return (
    <div>
      <GlobalStyles />
      <Btn size={"X-Small"} color={"Purple"}>
        저장
      </Btn>
      <Btn size={"Circle"} color={"Black"}>
        💖
      </Btn>
    </div>
  );
}

export default App;
