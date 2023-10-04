import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";

import { LoginState, UserDetailInfoState, UserInfoState } from "../store/State";
import { ROUTES } from "./../../commons/constants/Routes";
import GoogleLoginBtn from "../../components/@commons/GoogleLoginBtn";
import Text from "../../components/atoms/Text";
import { FlexCenter, FlexColBetween } from "../../commons/style/SharedStyle";
import {
  LOGO,
  MAIN_NOT_LOGIN_PART,
  MAIN_NOT_LOGIN_PART1,
  MAIN_NOT_LOGIN_PART2,
} from "../../commons/constants/String";
import { getEmailMember } from "../../apis/FrontendApi";
import { MainPaddingContainer } from "../../commons/style/layoutStyle";
import LineChart from "../../components/chart/LineChart";
import Wrapper from "../../components/atoms/Wrapper";
import Btn from "../../components/atoms/Btn";

const MainPage = () => {
  const isLoggedIn = useRecoilValue(LoginState);
  const [userDetailInfo, setUserDetailInfo] =
    useRecoilState(UserDetailInfoState);

  const email = useRecoilValue(UserInfoState).email;

  const navigate = useNavigate(); // useNavigate Hook 사용

  const navigateToRecommendPage = () => {
    navigate(ROUTES.RECOMMEND); // RECOMMEND 페이지로 이동
  };

  // 파라미터 정보 유무
  // useEffect(() => {
  //   // URL에서 'email' 파라미터 빼서 저장
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const accessToken = urlParams.get("accessToken");
  //   const refreshToken = urlParams.get("refreshToken");
  //   const email = urlParams.get("email");

  //   // accessToken과 refreshToken 둘 다 null값이라면
  //   if (userInfo.accessToken === null && userInfo.refreshToken === null) {
  //     // 리코일에 저장
  //     setUserInfo({ accessToken, refreshToken, email });
  //   }

  //   //  accessToken과 refreshToken 둘 다 있다면
  //   if (accessToken && refreshToken) {
  //     setIsLoggedIn(true); // 로그인 상태를 true로 변경
  //     setUserInfo({ accessToken, refreshToken, email });
  //   }
  // }, [setIsLoggedIn, setUserInfo, userInfo.accessToken, userInfo.refreshToken]);

  useEffect(() => {
    /** GET 요청 (이메일로 회원 조회) */
    if (email) {
      getEmailMember(email)
        .then((res) => {
          console.log(res.data);
          const nickname = res.data.nickname;
          const memberId = res.data.memberId;
          setUserDetailInfo({ nickname, memberId });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [email, setUserDetailInfo]);

  return (
    <MainPaddingContainer>
      {/* 로그인 안했을 때 (비회원 화면) */}
      {!isLoggedIn && (
        <StyledMainWrapper>
          <StyledFlexColBetween>
            <div>
              <Text size="X-Large" color="White" fontFamily="PyeongChang-Bold">
                {LOGO}
              </Text>
              <Text size="X-Large" color="White" fontFamily="PyeongChang-Light">
                {MAIN_NOT_LOGIN_PART}
              </Text>
            </div>
            <Text size="X-Large" color="White" fontFamily="PyeongChang-Light">
              {MAIN_NOT_LOGIN_PART1}
            </Text>
            <Text size="X-Large" color="White" fontFamily="PyeongChang-Light">
              {MAIN_NOT_LOGIN_PART2}
            </Text>
          </StyledFlexColBetween>
          <GoogleLoginBtn />
        </StyledMainWrapper>
      )}

      {/* 로그인 했을 때 (회원 화면) */}
      <SyledIsLoggedin>
        {isLoggedIn && (
          <SyledIsLoggedin>
            <Text size="X-Large" color="White" fontFamily="PyeongChang-Bold">
              {userDetailInfo.nickname}님의 별자리
            </Text>

            <StyledWrapper size="Standard" padding="Narrow" color="WhiteGhost">
              <LineChart width={940} height={400} />
            </StyledWrapper>
            <StyledBtn
              size="X-Large"
              color="White"
              onClick={navigateToRecommendPage}
            >
              <Text size="Medium" color="Black" fontFamily="PyeongChang-Light">
                별자리로 영화 추천받기
              </Text>
            </StyledBtn>
          </SyledIsLoggedin>
        )}
      </SyledIsLoggedin>
    </MainPaddingContainer>
  );
};

export default MainPage;

const StyledFlexColBetween = styled.div`
  ${FlexColBetween}
`;

const StyledWrapper = styled(Wrapper)`
  height: 600px;
  width: 980px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SyledIsLoggedin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 32px;
  height: calc(100vh - 70px);
`;

const StyledBtn = styled(Btn)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 60%;
`;

const StyledMainWrapper = styled.div`
  ${FlexCenter}
  flex-direction: column;
  width: 50%;
  height: 80%;
  margin: 0 auto;
  & > button {
    margin-top: 24px;
  }
`;
