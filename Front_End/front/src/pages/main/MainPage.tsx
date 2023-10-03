import React, { useEffect } from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";

import { LoginState, UserDetailInfoState, UserInfoState } from "../store/State";

import GoogleLoginBtn from "../../components/@commons/GoogleLoginBtn";
import Text from "../../components/atoms/Text";
import { FlexColBetween } from "../../commons/style/SharedStyle";
import {
  LOGO,
  MAIN_NOT_LOGIN_PART,
  MAIN_NOT_LOGIN_PART1,
  MAIN_NOT_LOGIN_PART2,
} from "../../commons/constants/String";
import { getEmailMember } from "../../apis/FrontendApi";
import LineChartWrapper from "../../components/chart/LineChartWrapper";
import LineChart from "../../components/chart/LineChart";

const MainPage = () => {
  const isLoggedIn = useRecoilValue(LoginState);
  const [userDetailInfo, setUserDetailInfo] =
    useRecoilState(UserDetailInfoState);

  const email = useRecoilValue(UserInfoState).email;

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
            {userDetailInfo.nickname}님의 별자리
            <LineChart></LineChart>
          </Text>
          {/* 메인 페이지에 들어올 별자리 + 별자리로 추천 받기 버튼 */}
        </div>
      )}
    </>
  );
};

export default MainPage;

const StyeldFlexColBetween = styled.div`
  ${FlexColBetween}
`;
