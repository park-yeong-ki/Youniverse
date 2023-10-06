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

const redirectUri = process.env.REACT_APP_REDIRECT_URL
const clientId = process.env.REACT_APP_CLIENTID
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
