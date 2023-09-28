import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { UserDetailInfoState } from "../../pages/store/State";
import { SEARCH_USER_PAGE } from "../../commons/constants/String";
import { FlexCenter } from "../../commons/style/SharedStyle";
import Wrapper from "../atoms/Wrapper";
import Text from "../atoms/Text";
import ProfileReview from "../review/ProfileReview";
import UserZodiacSign from "../users/UserZodiacSign";
import SoulMovieItemList from "../movies/SoulMovieItemList";
import { UserType } from "../../pages/profile/MyProfilePage";
import { getMember } from "../../apis/FrontendApi";

const OtherProfileContainer = () => {
  const { memberId } = useRecoilValue(UserDetailInfoState);
  const [memberData, setMemberData] = useState<UserType | null>(null);

  useEffect(() => {
    getMember(Number(memberId))
      .then((response) => {
        console.log("개별 회원 조회", `${memberId}번 회원=`, response.data);
        setMemberData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [memberId]);

  return (
    <StyledStandardWhiteGhostWrapper
      size="Standard"
      color="WhiteGhost"
      padding="Medium"
    >
      <Text size="X-Large" color="Black" fontFamily="PyeongChang-Light">
        {SEARCH_USER_PAGE}
      </Text>
      <UserZodiacSign />
      <SoulMovieItemList />
      <ProfileReview />
    </StyledStandardWhiteGhostWrapper>
  );
};
export default OtherProfileContainer;

const StyledStandardWhiteGhostWrapper = styled(Wrapper)`
  ${FlexCenter}
  height: 100%;
  width: 78%;
`;
