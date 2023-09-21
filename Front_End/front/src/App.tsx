import React from "react";
import StarryBackground from "./commons/style/StarryBackground";
import { GlobalStyles } from "./commons/style/GlobalStyle";
import GoogleLoginBtn from "./components/@commons/GoogleLoginBtn";

function App() {
  return (
    <div>
      <GlobalStyles />
      <StarryBackground />
      
      <GoogleLoginBtn />
    </div>
  );
}

export default App;
