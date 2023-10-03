import React, { useState } from "react";
import { useNavigate } from "react-router";
import { styled } from "styled-components";
import Img from "../atoms/Img";
import Btn from "../atoms/Btn";
import Text from "../atoms/Text";
import HashTag from "../atoms/HashTag";
import { FlexCenter, FlexColBetween } from "../../commons/style/SharedStyle";
import { FOLLOW } from "../../commons/constants/String";
import { User } from "./FollowUserItemList";

interface FollowerUserItemProps {
  user: User;
  isSelected: boolean;
  onSelect: () => void;
}

const FollowUserItem = ({
  user,
  isSelected: selectedFromParent,
  onSelect,
}: FollowerUserItemProps) => {
  const navigate = useNavigate();
  const [isSelected, setIsSelected] = useState(selectedFromParent);
  const { id, nickname, image, hashtags } = user;

  /**클릭 시 사용자 ID를 이용해 프로필 이동 */
  const handleToClickedUser = async () => {
    setIsSelected(!isSelected);
    onSelect();
    navigate(`/profile/${id}`);
  };
  return (
    <StyledUserContainer>
      <StyledCenterContainer
        isSelected={isSelected}
        onClick={handleToClickedUser}
      >
        <StyledColBetweenContainer>
          <Img size="Large" src={image} onClick={handleToClickedUser} />
          <div>{nickname}</div>
          <div>
            {hashtags.slice(0, 1).map((hashtag, index) => (
              <StyledHashTag key={index} size="Profile" color="White">
                {hashtag}
              </StyledHashTag>
            ))}
          </div>
          <div>
            <StyledBtn size="X-Small" color="Black">
              <Text size="X-Small" color="White" fontFamily="YESGothic-Regular">
                {FOLLOW}
              </Text>
            </StyledBtn>
          </div>
        </StyledColBetweenContainer>
      </StyledCenterContainer>
    </StyledUserContainer>
  );
};

export default FollowUserItem;

const StyledUserContainer = styled.div`
  ${FlexCenter}
  border-radius: 12px;
  padding: 5px;
  width: 100%;
`;

const StyledCenterContainer = styled.div<{ isSelected?: boolean }>`
  ${FlexCenter}
  &:hover {
    cursor: pointer;
  }
`;

const StyledColBetweenContainer = styled.div`
  ${FlexColBetween}
`;

const StyledHashTag = styled(HashTag)`
  width: 100px;
`;

const StyledBtn = styled(Btn)`
  width: 80px;
`;
