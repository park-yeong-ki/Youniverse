import React from "react";

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StarryBackground from "./commons/style/StarryBackground";
import { GlobalStyles } from "./commons/style/GlobalStyle";
import { ROUTES } from "./commons/constants/Routes";
import Header from "./components/@commons/Header";
import GoogleLoginBtn from "./components/@commons/GoogleLoginBtn";
import {
  MAIN,
  ADDINFO,
  SURVEY,
  OTTSELECT,
  MYPAGE,
  PROFILE,
  SEARCH,
  RECOMMEND,
  RECOMMEND_MORE,
  MOVIE_DETAIL,
  NOTFOUND,
} from "./pages/Pages";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <GlobalStyles />
        <StarryBackground />
        <Header />

        <Routes>
          <Route path={ROUTES.MAIN} Component={MAIN} />
          <Route path={ROUTES.ADDINFO} Component={ADDINFO} />
          <Route path={ROUTES.SURVEY} Component={SURVEY} />
          <Route path={ROUTES.OTTSELECT} Component={OTTSELECT} />
          <Route path={ROUTES.MYPAGE} Component={MYPAGE} />
          <Route path={ROUTES.PROFILE} Component={PROFILE} />
          <Route path={ROUTES.SEARCH} Component={SEARCH} />
          <Route path={ROUTES.RECOMMEND} Component={RECOMMEND} />
          <Route path={ROUTES.RECOMMEND_MORE} Component={RECOMMEND_MORE} />
          <Route path={ROUTES.MOVIE_DETAIL} Component={MOVIE_DETAIL} />
          <Route Component={NOTFOUND} />
        </Routes>
        <GoogleLoginBtn />
      </Router>
    </RecoilRoot>
  );
}

export default App;
