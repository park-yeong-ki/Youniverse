import React from "react";
import StarryBackground from "./commons/style/StarryBackground";
import { GlobalStyles } from "./commons/style/GlobalStyle";
import AdditionalInfoPage from "./pages/auth/AdditionalInfoPage";

function App() {
  return (
    <div>
      <GlobalStyles />
      <StarryBackground />
      <AdditionalInfoPage />
    </div>
  );
}

export default App;
