import React from "react";
import styled from "styled-components";

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
  return (
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
  );
};

export default MainPage;

const StyeldFlexColBetween = styled.div`
  ${FlexColBetween}
`;
