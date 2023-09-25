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

const GoogleInnerComponent = () => {
  const handleGoogleLogin = () => {
    window.location.href = "https://j9b204.p.ssafy.io/api/oauth2/authorization/google";
  };

  return (
    <>
      <StyledLoginBtn color="White" size="Medium" onClick={handleGoogleLogin}>
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
