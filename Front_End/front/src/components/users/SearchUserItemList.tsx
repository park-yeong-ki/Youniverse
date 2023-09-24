import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import axios from "axios";
import { SEARCH_USER_RECOMMEND } from "../../commons/constants/String";
import Wrapper from "../atoms/Wrapper";
import Text from "../atoms/Text";
import SearchUserItem from "./SearchUserItem";
import { FlexCenter, FlexColBetween } from "../../commons/style/SharedStyle";

const SearchUserItemList = () => {
  // 로그인된 유저 정보 -> ID, 닉네임

  /**백 서버에서 받아온 유저 리스트 저장 */
  const [searchResultUsers, setSearchResultUsers] = useState([]);

  useEffect(() => {
    const SearchResultUserList = async () => {
      try {
        const response = await axios.get("api 주소");
        setSearchResultUsers(response.data.users); //백에서 넘어오는 데이터 확인
      } catch (error) {
        console.error("데이터 가져오기 실패", error);
      }
    };

    SearchResultUserList();
  }, []);

  return (
    <StyledStandardWhiteGhostWrapper
      size="Standard"
      color="WhiteGhost"
      padding="Medium"
    >
      <StyledCenter>
        <Text size="Small" color="Black" fontFamily="YESGothic-Regular">
          {SEARCH_USER_RECOMMEND}
        </Text>
        {searchResultUsers.map((user, index) => (
          <SearchUserItem key={index} user={user} />
        ))}
      </StyledCenter>
    </StyledStandardWhiteGhostWrapper>
  );
};

export default SearchUserItemList;

const StyledStandardWhiteGhostWrapper = styled(Wrapper)`
  ${FlexCenter}
  width: 100%;
  margin: 0 auto;
`;

const StyledCenter = styled.div`
  ${FlexColBetween}
`;
