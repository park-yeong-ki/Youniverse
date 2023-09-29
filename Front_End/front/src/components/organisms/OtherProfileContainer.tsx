import styled from "styled-components";
import { SEARCH_USER_PAGE } from "../../commons/constants/String";
import { FlexCenter } from "../../commons/style/SharedStyle";
import Wrapper from "../atoms/Wrapper";
import Text from "../atoms/Text";
import ProfileReview from "../review/ProfileReview";

const OtherProfileContainer = () => {
  return (
    <StyledStandardWhiteGhostWrapper
      size="Standard"
      color="WhiteGhost"
      padding="Medium"
    >
      <Text size="X-Large" color="Black" fontFamily="PyeongChang-Light">
        {SEARCH_USER_PAGE}
        <ProfileReview />
      </Text>
    </StyledStandardWhiteGhostWrapper>
  );
};
export default OtherProfileContainer;

const StyledStandardWhiteGhostWrapper = styled(Wrapper)`
  ${FlexCenter}
  height: 100%;
  width: 78%;
`;
