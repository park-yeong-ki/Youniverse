import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Wrapper from "../atoms/Wrapper";
import Text from "../atoms/Text";
import { FlexCenter, FlexColBetween } from "../../commons/style/SharedStyle";
import RecommendUserItemList from "../users/RecommendUserItemList";
import { SEARCH_USER_RECOMMEND } from "../../commons/constants/String";
type User = {
  id: number;
  nickname: string;
  image: string;
  hashtags: string[];
};

const UserRecommendForm = () => {
  const [recommendList, setrecommendList] = useState<User[]>([]);

  useEffect(() => {
    const getRecommendUsers = async () => {
      try {
        const response = await axios.get("api 주소");
        setrecommendList(response.data.users);
      } catch (error) {
        console.error("추천 사용자 리스트 가져오기 실패: ", error);
      }
    };

    getRecommendUsers();
  }, []);

  return (
    <StyledStandardWhiteGhostWrapper
      size="Standard"
      color="WhiteGhost"
      padding="Medium"
    >
      <StyledColBetweenContainer>
        <StyledTextContainer>
          <Text size="Small" color="Black" fontFamily="YESGothic-Regular">
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

export default UserRecommendForm;

const StyledStandardWhiteGhostWrapper = styled(Wrapper)`
  ${FlexCenter}
  height: 800px;
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
