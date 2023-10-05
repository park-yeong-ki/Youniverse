// 유저의 별자리를 보여주는 컴포넌트

import styled from "styled-components";
import { MY_PAGE_STAR } from "../../commons/constants/String";
import Text from "../atoms/Text";
import Wrapper from "../atoms/Wrapper";
import { FlexCenter } from "../../commons/style/SharedStyle";
import LineChart from "../chart/LineChart";
import { UserType } from "../../pages/profile/MyProfilePage";

interface UserZodiacSignProps {
  memberData?: UserType | null;
  width: string | number;
  height: string | number;
}
const OtherUserZodiacSign: React.FC<UserZodiacSignProps> = ({
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
            <LineChart
              otherMemberId={memberData?.memberId}
              width={width}
              height={height}
            />
          </StyledZodiacWrapper>
        </Wrapper>
      </StyledAllWrapper>
    </>
  );
};

export default OtherUserZodiacSign;

/** 별자리 차트 감싸는 그라디언트 박스 */
const StyledZodiacWrapper = styled.div`
  ${FlexCenter}
  width: 100%;
  height: 100%;
  border-radius: 28px;
  background: linear-gradient(
    180deg,
    #190a37 0%,
    rgba(83, 22, 132, 0.54) 60.42%,
    rgba(194, 180, 222, 0.3) 99.97%,
    rgba(176, 164, 202, 0.25) 99.98%,
    rgba(27, 6, 71, 0.18) 99.99%,
    rgba(145, 114, 211, 1) 100%
  );
`;

/** 전체 wrapper 텍스트와 콘텐츠 비율 설정 */
export const StyledAllWrapper = styled.div`
  height: 100%;
  width: 49%;
  & > *:first-child {
    height: 14%;
  }
  & > *:last-child {
    height: 87%;
  }
`;
