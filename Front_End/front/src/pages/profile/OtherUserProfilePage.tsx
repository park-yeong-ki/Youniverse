import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import OtherProfileContainer from "../../components/organisms/OtherProfileContainer";
import { MainPaddingContainer } from "../../commons/style/layoutStyle";
import UserSearchContainer from "../../components/search/UserSearchContainer";
// import UserRecommendContainer from "../../components/organisms/UserRecommendContainer";
import {
  FlexRowBetween,
  FlexColBetween,
} from "../../commons/style/SharedStyle";
import { getMember } from "../../apis/FrontendApi";
import { UserType } from "../../pages/profile/MyProfilePage";

const OtherUserProfilePage = () => {
  const { userId } = useParams<{ userId: string }>();
  const [memberData, setMemberData] = useState<UserType | null>(null);
  const [selectStatus, setSelectStatus] = useState<string>("");
  const memberId = userId;

  const refreshMemberData = () => {
    getMember(Number(memberId))
      .then((response) => {
        console.log("개별 회원 조회", `${memberId}번 회원=`, response.data);
        setMemberData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
          memberData={memberData}
          selectStatus={selectStatus}
          setSelectStatus={setSelectStatus}
          refreshMemberData={refreshMemberData}
        />
        <StyledSearchRecommend>
          <UserSearchContainer />
          {/* <UserRecommendContainer /> */}
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
