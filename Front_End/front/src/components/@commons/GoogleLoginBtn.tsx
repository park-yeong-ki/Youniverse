import styled from "styled-components";

import Btn from "../atoms/Btn";
import { FlexCenter } from "../../commons/style/SharedStyle";
import { GOOGLE_LOGIN } from "../../commons/constants/String";

const GoogleLoginBtn = () => {
  return (
    <>
      <GoogleInnerComponent />
    </>
  );
};

const scopes = [
  "https://www.googleapis.com/auth/youtube",
  "https://www.googleapis.com/auth/youtube.force-ssl",
  "https://www.googleapis.com/auth/youtube.readonly",
  "https://www.googleapis.com/auth/youtubepartner",
  "https://www.googleapis.com/auth/userinfo.email", // 이메일
];

//동key
// const clientId = '781680119308-d0jbnhpcmrcj7fb65ls9crj7lh6k7v9q.apps.googleusercontent.com'

const clientId =
  "515621990572-qofqid3d40c2u7t7in2n5gjmf4hg4tre.apps.googleusercontent.com";
//소key
// const clientId =
//   "776331757143-c17p5tgmtrc53mnrqrst4f5s6ltg3npj.apps.googleusercontent.com";

const redirectUri = "http://localhost:3000/loading"; //로컬
// const redirectUri ='https://j9b204.p.ssafy.io/loading'//서버

const scopeString = scopes.join(" ");

const GoogleInnerComponent = () => {
  const handleGoogleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${redirectUri}&response_type=code&client_id=${clientId}&scope=${scopeString}&access_type=offline`;
  };

  return (
    <>
      <StyledLoginBtn color="White" size="Medium" onClick={handleGoogleLogin}>
        <StyledGoogleLogo src="/assets/Logo/GoogleLogo.svg" alt="GoogleLogo" />
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
