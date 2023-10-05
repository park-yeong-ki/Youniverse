import { useState } from "react";
import { useNavigate } from "react-router";
import { styled } from "styled-components";
import Img from "../atoms/Img";
import HashTag from "../atoms/HashTag";
import { FlexCenter, FlexColBetween } from "../../commons/style/SharedStyle";
import { User } from "./FollowUserItemList";
import { useSetRecoilState } from "recoil";
import { SelectStatusState } from "../../pages/store/State";

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
  const setSelectStatus = useSetRecoilState(SelectStatusState);

  /**클릭 시 사용자 ID를 이용해 프로필 이동 */
  const handleToClickedUser = async () => {
    setIsSelected(!isSelected);
    onSelect();
    navigate(`/profile/${id}`);
    setSelectStatus("");
  };
  return (
    <StyledUserContainer>
      <StyledCenterContainer isSelected={isSelected}>
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
  gap: 10px;
  &:hover {
    cursor: pointer;
  }
`;

const StyledColBetweenContainer = styled.div`
  ${FlexColBetween}
  margin: 0px 10px;
  gap: 10px;
`;

const StyledHashTag = styled(HashTag)`
  width: 100px;
`;
