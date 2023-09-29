import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import OtherProfileContainer from "../../components/organisms/OtherProfileContainer";
import { MainPaddingContainer } from "../../commons/style/layoutStyle";
import UserSearchContainer from "../../components/organisms/UserSearchContainer";
import UserRecommendContainer from "../../components/organisms/UserRecommendContainer";
import {
  FlexRowBetween,
  FlexColBetween,
} from "../../commons/style/SharedStyle";
import { UserDetailInfoState } from "../../pages/store/State";
import { getMember } from "../../apis/FrontendApi";
import { UserType } from "../../pages/profile/MyProfilePage";

const OtherUserProfilePage = () => {
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
    <MainPaddingContainer>
      <StyledOtherUserProfile>
        <OtherProfileContainer 
        memberData = {memberData}/>
        <StyledSearchRecommend>
          <UserSearchContainer />
          <UserRecommendContainer />
        </StyledSearchRecommend>
      </StyledOtherUserProfile>
    </MainPaddingContainer>
  );
};

export default OtherUserProfilePage;

const StyledSearchRecommend = styled.div`
  ${FlexColBetween}
  height: 100%;
  width: 20.5%;
`;

const StyledOtherUserProfile = styled.div`
  ${FlexRowBetween}
  height: 100%;
`;
