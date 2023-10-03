// 마이페이지에서 ㅇㅇ님의 OTT 행성 컴포넌트

import styled from "styled-components";
import {
  MY_PAGE_OTT,
  MY_PAGE_OTT_RECOMMEND,
  MY_PAGE_OTT_CHART,
} from "../../commons/constants/String";
import Planet from "../atoms/Planet";
import Text from "../atoms/Text";
import Wrapper from "../atoms/Wrapper";
import { FlexRowAround, FlexRowBetween } from "../../commons/style/SharedStyle";
import { UserType } from "../../pages/profile/MyProfilePage";

interface MyOTTPlanetProps {
  memberData: UserType | null;
}

const MyOTTPlanet: React.FC<MyOTTPlanetProps> = ({ memberData }) => {
  return (
    <div>
      <StyledTextWrapper>
        <Text size="Medium" color="White" fontFamily="PyeongChang-Bold">
          {memberData?.nickname}
          {MY_PAGE_OTT}
        </Text>
        {/* 클릭하면 이동하게 변경 @@@ */}
        <Text size="Small" color="White" fontFamily="YESGothic-Regular">
          {MY_PAGE_OTT_RECOMMEND}
        </Text>
      </StyledTextWrapper>
      {/* OTT 행성 Wrapper */}
      <StyledOTTWrapper size="Standard" color="WhiteGhost" padding="Narrow">
        {/* 행성 + 이름 (유저 정보에 따라 변경하기) */}
        <div>
          <Text size="Medium" color="Black" fontFamily="YESGothic-Bold">
            {}넷플릭스
          </Text>
          <Planet size="Medium" src="/assets/TestNetflix.png" $mypage={true} />
        </div>

        {/* 중간 나누는 선 */}
        <StyledDivideLine />

        {/* OTT별 가지고 있는 컨텐츠 차트 (유저 정보에 따라 변경하기) */}
        <div>
          <Text size="Small" color="Black" fontFamily="YESGothic-Regular">
            {MY_PAGE_OTT_CHART} 넷플릭스
          </Text>
          {/* 여기에 차트 들어가요! */}
          <div>차트 공간</div>
        </div>
      </StyledOTTWrapper>
    </div>
  );
};

export default MyOTTPlanet;

const StyledTextWrapper = styled.div`
  ${FlexRowBetween}
`;

const StyledDivideLine = styled.div`
  height: 100px;
  border: 1px solid #000;
`;

const StyledOTTWrapper = styled(Wrapper)`
  ${FlexRowAround}
`;
