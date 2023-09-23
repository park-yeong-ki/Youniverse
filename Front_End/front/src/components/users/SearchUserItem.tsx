import React from "react";
import { styled } from "styled-components";
import Img from "../atoms/Img";
import HashTag from "../atoms/HashTag";
import { FlexCenter } from "../../commons/style/SharedStyle";

const SearchUserItem = () => {
  const handleToClickedUser = () => {
    // 사용자 ID를 이용해 프로필 이동
    try {
    } catch (error) {}
  };
  return (
    <StyledUserContainer>
      <StyledCenterContainer>
        <Img
          size="Medium"
          src="assets/Logo/GoogleLogo.svg"
          onClick={handleToClickedUser}
        />
        <div>
          <div>닉네임</div>
          <div>키워드 리스트 해시태그 형태</div>
        </div>
      </StyledCenterContainer>
    </StyledUserContainer>
  );
};

export default SearchUserItem;

const StyledUserContainer = styled.div`
  border: solid 0.5px white;
  border-radius: 12px;
  padding: 5px;
  width: 100%;
`;

const StyledCenterContainer = styled.div`
  ${FlexCenter}
`;
