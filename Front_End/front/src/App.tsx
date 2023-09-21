import React from "react";

import StarryBackground from "./commons/style/StarryBackground";
import { GlobalStyles } from "./commons/style/GlobalStyle";
import MovieItem from "./components/movies/MovieItem";

function App() {
  return (
    <div>
      <GlobalStyles />
      <StarryBackground />
    </div>
  );
}

export default App;
