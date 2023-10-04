import React, { ReactNode } from 'react';
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

type ProtectedRouteProps = {
  isAuthenticated: boolean;
  element: ReactNode;
};

function ProtectedRoute({ isAuthenticated, element }: ProtectedRouteProps) {
  if (!isAuthenticated) {
    alert("로그인이 필요한 페이지입니다.");
    return <Navigate to="/" />;
  }
  return <>{element}</>;
}


function ProtectedApp() {

  const { isAuthenticated, isChecking } = useAuth();

  return (
      <Router>
        <GlobalStyles />
        <Header />
        {isChecking ? (
          <div></div>
        ) : (
        <>
        <Routes>
          <Route path={ROUTES.MAIN} Component={MAIN} />
          <Route path={ROUTES.LOADING} Component={LOADING} />
          <Route 
            path={ROUTES.ADDINFO}
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} element={<ADDINFO />} />
            }
          />
          <Route 
            path={ROUTES.SURVEY}
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} element={<SURVEY />} />
            }
          />
          <Route 
            path={ROUTES.OTTSELECT}
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} element={<OTTSELECT />} />
            }
          />
          <Route 
            path={ROUTES.MYPAGE}
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} element={<MYPAGE />} />
            }
          />
          <Route 
            path={ROUTES.PROFILE}
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} element={<PROFILE />} />
            }
          />
          <Route 
            path={ROUTES.SEARCH}
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} element={<SEARCH />} />
            }
          />
          <Route 
            path={ROUTES.RECOMMEND}
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} element={<RECOMMEND />} />
            }
          />
          <Route 
            path={ROUTES.MOVIE_DETAIL}
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} element={<MOVIE_DETAIL />} />
            }
          />
          <Route 
            path={ROUTES.RECOMMEND_MORE}
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} element={<RECOMMEND_MORE />} />
            }
          />
          <Route path={ROUTES.NOTFOUND} Component={NOTFOUND} />
        </Routes>
        </>

        )}
        {/* <StarryBackground /> */}
      </Router>
  );
}

export default App;
