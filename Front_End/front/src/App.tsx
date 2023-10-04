import React from "react";

import { RecoilRoot } from "recoil";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import StarryBackground from "./commons/style/StarryBackground";
import { GlobalStyles } from "./commons/style/GlobalStyle";
import { ROUTES } from "./commons/constants/Routes";
import { useAuth } from "./commons/constants/useAuth";
import Header from "./components/@commons/Header";
import {
  MAIN,
  LOADING,
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
import "./index.css";
function App() {
  return (
    <RecoilRoot>
      <ProtectedApp />
    </RecoilRoot>
  );
}

function ProtectedApp() {

  const { isAuthenticated, isChecking } = useAuth();

  if (isChecking) {
    // 로딩 중인 경우, 여기서 로딩 UI를 보여줄 수 있습니다.
    return <div>Loading...</div>;
  }

  return (
      <Router>
        <GlobalStyles />
        {/* <StarryBackground /> */}
        <Header />

        <Routes>
          <Route path={ROUTES.MAIN} Component={MAIN} />
          <Route path={ROUTES.LOADING} Component={LOADING} />
          <Route path={ROUTES.ADDINFO} Component={ADDINFO} />
          <Route path={ROUTES.SURVEY} Component={SURVEY} />
          <Route path={ROUTES.OTTSELECT} Component={OTTSELECT} />
          <Route path={ROUTES.MYPAGE} Component={MYPAGE} />
          <Route path={ROUTES.PROFILE} Component={PROFILE} />
          <Route path={ROUTES.SEARCH} Component={SEARCH} />
          {/* <Route path={ROUTES.RECOMMEND} Component={RECOMMEND} /> */}
          <Route 
            path={ROUTES.RECOMMEND} 
            element={ 
              isAuthenticated 
              ? <RECOMMEND /> 
              : <Navigate to="/" /> 
            } 
          />
          <Route path={ROUTES.MOVIE_DETAIL} Component={MOVIE_DETAIL} />
          <Route path={ROUTES.NOTFOUND} Component={NOTFOUND} />
        </Routes>
      </Router>
  );
}

export default App;
