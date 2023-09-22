import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { useSetRecoilState } from "recoil";
import { UserInfoState, LoginState } from "../../store/State";

// import axios from "axios";
import Btn from "../atoms/Btn";
import styled from "styled-components";
import { FlexCenter } from "../../commons/style/SharedStyle";
import { GOOGLE_LOGIN } from "../../commons/constants/String";

const GoogleLoginBtn = () => {
  // const clientId: string = process.env.REACT_APP_GOOGLE_CLIENTID!;
  const clientId: string =
    "297846916360-6kk0e865kjgbt9bm7iv06uraffvv0o89.apps.googleusercontent.com";

  console.log(clientId);

  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleInnerComponent />
        {/* <GoogleLogin onSuccess={(res) => {
          console.log(res)
        }}
        onError={() => {
          console.log("로그인 에러남")
        }} /> */}
      </GoogleOAuthProvider>
    </>
  );
};

const GoogleInnerComponent = () => {
  const setUserInfo = useSetRecoilState(UserInfoState);
  const setLogin = useSetRecoilState(LoginState);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (res) => {
      console.log(res);
      // await axios({
      //   method: "post",
      //   url: "서버 주소",
      //   data: { access_token: res.access_token },
      // })
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((e) => console.log(e));

      // res.access_token

      setUserInfo({
        accessToken: res.access_token,
      });

      setLogin(true);
    },
  });

  return (
    <>
      <StyledLoginBtn
        color="White"
        size="Medium"
        onClick={() => handleGoogleLogin()}
      >
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
