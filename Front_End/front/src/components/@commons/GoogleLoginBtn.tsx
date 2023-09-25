import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useSetRecoilState } from "recoil";
// import { UserInfoState, LoginState } from "../../store/State";
import qs from "qs";
import Btn from "../atoms/Btn";
import styled from "styled-components";
import { FlexCenter } from "../../commons/style/SharedStyle";
import { GOOGLE_LOGIN } from "../../commons/constants/String";
import axios from "axios";

const CLIENT_ID: string = "781680119308-d0jbnhpcmrcj7fb65ls9crj7lh6k7v9q.apps.googleusercontent.com";
const AUTHORIZE_URI = "https://accounts.google.com/o/oauth2/v2/auth";

const queryStr = qs.stringify({
  client_id: CLIENT_ID,
  // redirect_uri: window.location.href,
  redirect_uri: "http://localhost:3000/login/oauth2/code/google",
  response_type: "token",
  scope: "https://www.googleapis.com/auth/contacts.readonly",
});

const loginUrl = AUTHORIZE_URI + "?" + queryStr;

const GoogleLoginBtn = () => {
  const { access_token } = qs.parse(window.location.hash.substr(1));

  if (!access_token) {
    window.location.assign(loginUrl);
    return null;
  }
  console.log("로그: "+access_token)

  return (
    <>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <GoogleInnerComponent />
      </GoogleOAuthProvider>
    </>
  );
};

const GoogleInnerComponent = () => {
  // const setUserInfo = useSetRecoilState();
  // const setLogin = useSetRecoilState(LoginState);

  const googleSocialLogin = useGoogleLogin({
    onSuccess: async (res) => {
      console.log(res)
      const receivedAccessToken = res.access_token;
      console.log("accessToken: "+receivedAccessToken)

      //axios 헤더 설정
      const instance = axios.create({
        baseURL: 'https://www.googleapis.com/youtube/v3/', 
        headers: {
          Authorization: `Bearer ${receivedAccessToken}`,
        },
      });

      //구독 정보 가져오기.
      instance.get('subscriptions', {
        params: {
          part: 'snippet',
          mine: true,
          maxResults: 50,
        },
      })
      .then((response) => {
        // 요청이 성공한 경우, response에서 데이터를 처리합니다.
        console.log('YouTube API 응답 데이터:', response.data);
      })
      .catch((error) => {
        // 요청이 실패한 경우, 에러를 처리합니다.
        console.error('YouTube API 요청 실패:', error);
      });

    },
    onError: () => {
      console.error("로그인 에러임");
    },
  });

  return (
    <>
      <StyledLoginBtn color="White" size="Medium" onClick={googleSocialLogin}>
        <StyledGoogleLogo src="assets/Logo/GoogleLogo.svg" alt="GoogleLogo" />
        {GOOGLE_LOGIN}
      </StyledLoginBtn>
    </>
  );
};

export default GoogleLoginBtn;

const StyledGoogleLogo = styled.img`
  width: 2rem;
  height: 2rem;
  margin-right: 1rem;
`;

/** 구글 로그인 버튼 정가운데 정렬 */
const StyledLoginBtn = styled(Btn)`
  ${FlexCenter}
`;