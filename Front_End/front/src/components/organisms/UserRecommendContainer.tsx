import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Wrapper from "../atoms/Wrapper";
import Text from "../atoms/Text";
import { useRecoilValue } from "recoil";
import { UserDetailInfoState } from "../../pages/store/State";
import { FlexCenter, FlexColBetween } from "../../commons/style/SharedStyle";
import RecommendUserItemList from "../users/RecommendUserItemList";
import { SEARCH_USER_RECOMMEND } from "../../commons/constants/String";
import { getMember } from "../../apis/FrontendApi";

type User = {
  id: number;
  nickname: string;
  image: string;
  hashtags: string[];
};

const UserRecommendContainer = () => {
  const { nickname, memberId } = useRecoilValue(UserDetailInfoState);
  const [recommendList, setrecommendList] = useState<User[]>([]);
  // 임시로 나의 프로필 조회하도록 코딩 -> 향후에 추천받은 유저리스트로 변경
  useEffect(() => {
    const getRecommendUsers = async () => {
      if (typeof memberId === "number") {
        try {
          const response = await getMember(memberId);
          setrecommendList(response.data.users);
        } catch (error) {
          console.error("추천 사용자 리스트 가져오기 실패: ", error);
        }
      }
    };

    getRecommendUsers();
  }, [memberId]);

  return (
    <StyledStandardWhiteGhostWrapper
      size="Standard"
      color="WhiteGhost"
      padding="Medium"
    >
      <StyledColBetweenContainer>
        <StyledTextContainer>
          <Text size="Small" color="Black" fontFamily="YESGothic-Regular">
            {nickname}
            {SEARCH_USER_RECOMMEND}
          </Text>
        </StyledTextContainer>
        <StyledUserContainer>
          <RecommendUserItemList users={recommendList} />
          <p>현재는 아무것도 없지만 추천 리스트가 나올 것이다</p>
        </StyledUserContainer>
      </StyledColBetweenContainer>
    </StyledStandardWhiteGhostWrapper>
  );
};

export default UserRecommendContainer;

const StyledStandardWhiteGhostWrapper = styled(Wrapper)`
  ${FlexCenter}
  height: 48.5%;
  margin: 0 auto;
`;

const StyledColBetweenContainer = styled.div`
  ${FlexColBetween}
  height: 100%;
`;

const StyledTextContainer = styled.div`
  font-weight: bold;
`;

const StyledUserContainer = styled.div`
  height: 90%;
`;
