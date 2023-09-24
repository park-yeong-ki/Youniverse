import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import Img from "../atoms/Img";
import HashTag from "../atoms/HashTag";
import { FlexCenter } from "../../commons/style/SharedStyle";

type UserProps = {
  id: number;
  nickname: string;
  image: string;
  hashtags: string[];
};

const SearchUserItem = ({ user }: { user: UserProps }) => {
  const navigate = useNavigate();
  const { id, nickname, image, hashtags } = user;
  /**클릭 시 사용자 ID를 이용해 프로필 이동 */
  const handleToClickedUser = () => {
    try {
      navigate(`/profile/${id}`);
    } catch (error) {
      console.error("사용자 프로필로 이동할 수 없음:", error);
    }
  };
  return (
    <StyledUserContainer>
      <StyledCenterContainer onClick={handleToClickedUser}>
        <Img size="Medium" src={image} />
        <div>
          <div>{nickname}</div>
          <div>
            {hashtags.map((hashtag, index) => (
              <HashTag key={index} size="Standard" color="White">
                {hashtag}
              </HashTag>
            ))}
          </div>
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
