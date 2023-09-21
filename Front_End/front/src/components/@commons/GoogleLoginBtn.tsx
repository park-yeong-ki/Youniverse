import { useGoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import axios from "axios";
import Btn from "../atoms/Btn";
import styled from "styled-components";
import { FlexCenter } from "../../commons/style/SharedStyle";
import { GOOGLE_LOGIN } from "../../commons/constants/String"

const GoogleLoginBtn = () => {
  const clientId: string = process.env.REACT_APP_GOOGLE_CLIENTID!;

  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleInnerComponent />
      </GoogleOAuthProvider>
    </>
  );
};

const GoogleInnerComponent = () => {
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
    },
  });

  return (
    <>
      <StyledLoginBtn color="White" size="Medium" onClick={() => handleGoogleLogin()}>
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
`

/** 구글 로그인 버튼 정가운데 정렬 */
const StyledLoginBtn = styled(Btn)`
  ${FlexCenter}
`