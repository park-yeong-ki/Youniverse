import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Wrapper from "../atoms/Wrapper";
import Text from "../atoms/Text";
import { useRecoilValue } from "recoil";
import { UserDetailInfoState } from "../../pages/store/State";
import { FlexCenter, FlexColBetween } from "../../commons/style/SharedStyle";
import RecommendUserItemList from "../users/RecommendUserItemList";
import { SEARCH_USER_RECOMMEND } from "../../commons/constants/String";
import { userRecommend } from "../../apis/FrontendApi";

export type RecommendUser = {
  member_id: number;
  age: number;
  email: string;
  gender: string;
  introduce: string;
  member_image: string;
  nickname: string;
  keyword: string[];
};

const UserRecommendContainer = () => {
  const { nickname, memberId } = useRecoilValue(UserDetailInfoState);
  const [recommendList, setrecommendList] = useState<RecommendUser[]>([]);

  useEffect(() => {
    const getRecommendUsers = async () => {
      if (typeof memberId === "number") {
        try {
          const response = await userRecommend(memberId);
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
      padding="Narrow"
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
  width: 100%;
`;

const StyledTextContainer = styled.div`
  font-weight: bold;
  margin-top: 10px;
`;

const StyledUserContainer = styled.div`
  width: 100%;
  height: 85%;
  overflow-y: auto;
`;
