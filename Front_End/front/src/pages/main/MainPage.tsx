import React from "react";
import styled from "styled-components";

import GoogleLoginBtn from "../../components/@commons/GoogleLoginBtn";
import Text from "../../components/atoms/Text";
import { FlexColBetween, FlexBase } from "../../commons/style/SharedStyle";
import {
  LOGO,
  MAIN_NOT_LOGIN_PART,
  MAIN_NOT_LOGIN_PART1,
  MAIN_NOT_LOGIN_PART2,
} from "../../commons/constants/String";

const MainPage = () => {
  return (
    <StyeldMainPage>
      <StyledText>
        <div>
          <Text size="Large" color="White" fontFamily="PyeongChang-Bold">
            {LOGO}
          </Text>

          <Text size="Large" color="White" fontFamily="PyeongChang-Light">
            {MAIN_NOT_LOGIN_PART}
          </Text>
        </div>
        <Text size="Large" color="White" fontFamily="PyeongChang-Light">
          {MAIN_NOT_LOGIN_PART1}
        </Text>
        <Text size="Large" color="White" fontFamily="PyeongChang-Light">
          {MAIN_NOT_LOGIN_PART2}
        </Text>
      </StyledText>
      <GoogleLoginBtn />
    </StyeldMainPage>
  );
};

export default MainPage;

const StyeldMainPage = styled.div`
  ${FlexColBetween}
`;

const StyledText = styled.div`
  ${FlexBase}
  flex-direction: column;
  align-items: center;
  width: 30%;
`;
