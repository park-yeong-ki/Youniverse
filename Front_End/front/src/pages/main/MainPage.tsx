import React, { useEffect } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";

import { LoginState, UserInfoState } from "../store/State";

import GoogleLoginBtn from "../../components/@commons/GoogleLoginBtn";
import Text from "../../components/atoms/Text";
import { FlexColBetween } from "../../commons/style/SharedStyle";
import {
  LOGO,
  MAIN_NOT_LOGIN_PART,
  MAIN_NOT_LOGIN_PART1,
  MAIN_NOT_LOGIN_PART2,
} from "../../commons/constants/String";

const MainPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
  const [userInfo, setUserInfo] = useRecoilState(UserInfoState);
  // 파라미터 정보 유무
  useEffect(() => {
    // URL에서 'email' 파라미터 빼서 저장
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");
    const refreshToken = urlParams.get("refreshToken");

    // accessToken과 refreshToken 둘 다 null값이라면
    if (userInfo.accessToken === null && userInfo.refreshToken === null) {
      // 리코일에 저장
      setUserInfo({ accessToken, refreshToken });
    }

    //  accessToken과 refreshToken 둘 다 있다면
    if (accessToken && refreshToken) {
      setIsLoggedIn(true); // 로그인 상태를 true로 변경
      setUserInfo({ accessToken, refreshToken });
    }
  }, []);

  console.log(userInfo);
  console.log(isLoggedIn);

  return (
    <>
      {/* 로그인 안했을 때 (비회원 화면) */}
      {!isLoggedIn && (
        <>
          <StyeldFlexColBetween>
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
          </StyeldFlexColBetween>
          <GoogleLoginBtn />
        </>
      )}

      {/* 로그인 했을 때 (회원 화면) */}
      {isLoggedIn && (
        <div>
          <Text size="X-Large" color="White" fontFamily="PyeongChang-Bold">
            회원 화면 요기에 들와용
          </Text>
        </div>
      )}
    </>
  );
};

export default MainPage;

const StyeldFlexColBetween = styled.div`
  ${FlexColBetween}
`;
