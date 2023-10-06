// 유저의 별자리를 보여주는 컴포넌트

import styled from "styled-components";
import { MY_PAGE_STAR } from "../../commons/constants/String";
import Text from "../atoms/Text";
import Wrapper from "../atoms/Wrapper";
import { FlexCenter } from "../../commons/style/SharedStyle";
import { StyledAllWrapper } from "./MyOTTPlanet";
import LineChart from "../chart/LineChart";
import { UserType } from "../../pages/profile/MyProfilePage";
interface UserZodiacSignProps {
  memberData?: UserType | null;
  width: string | number;
  height: string | number;
}
const UserZodiacSign: React.FC<UserZodiacSignProps> = ({
  memberData,
  width,
  height,
}) => {
  return (
    <>
      <StyledAllWrapper>
        <Text size="Medium" color="White" fontFamily="PyeongChang-Bold">
          {memberData?.nickname}
          {MY_PAGE_STAR}
        </Text>
        {/* 별자리 wrapper */}
        <Wrapper
          size="Standard"
          color="WhiteGhost"
          padding="Narrow"
          className="mt-2"
        >
          <StyledZodiacWrapper>
            <LineChart width={width} height={height} />
          </StyledZodiacWrapper>
        </Wrapper>
      </StyledAllWrapper>
    </>
  );
};

export default UserZodiacSign;

/** 별자리 차트 감싸는 그라디언트 박스 */
const StyledZodiacWrapper = styled.div`
  ${FlexCenter}
  width: 100%;
  height: 174px;
  border-radius: 28px;
  background: linear-gradient(
    180deg,
    #190a37 0%,
    rgba(83, 22, 132, 0.54) 60.42%,
    rgba(194, 180, 222, 0.3) 99.97%,
    rgba(176, 164, 202, 0.25) 99.98%,
    rgba(150, 123, 208, 0.18) 99.99%,
    rgba(145, 114, 211, 0) 100%
  );
`;
