import React, { useState } from "react";
import axios from "axios";
import { styled } from "styled-components";
import Img from "../atoms/Img";
import Btn from "../atoms/Btn";
import Text from "../atoms/Text";
import HashTag from "../atoms/HashTag";
import { FlexCenter, FlexColBetween } from "../../commons/style/SharedStyle";
import { FOLLOW } from "../../commons/constants/String";

type UserProps = {
  id: number;
  nickname: string;
  image: string;
  hashtags: string[];
};

interface Props {
  user: UserProps;
  isSelected: boolean;
  onSelect: () => void;
}

const FollowUserItem = ({
  user,
  isSelected: selectedFromParent,
  onSelect,
}: Props) => {
  const [isSelected, setIsSelected] = useState(selectedFromParent);
  const { id, nickname, image, hashtags } = user;

  /**클릭 시 사용자 ID를 이용해 프로필 이동 */
  const handleToClickedUser = async () => {
    setIsSelected(!isSelected);
    onSelect();
    try {
      /** 백서버에 사용자 정보 요청 */
      const response = await axios.get(`api 주소/${id}`);
      console.log(response.data.user);

      // 받은 데이터 프로필에 뿌리기
    } catch (error) {
      console.error("데이터 가져오기 실패", error);
    }
  };
  return (
    <StyledUserContainer>
      <StyledCenterContainer
        isSelected={isSelected}
        onClick={handleToClickedUser}
      >
        <Img size="Large" src={image} />
        <StyledColBetweenContainer>
          <div>{nickname}</div>
          <div>
            {hashtags.map((hashtag, index) => (
              <HashTag key={index} size="Standard" color="White">
                {hashtag}
              </HashTag>
            ))}
          </div>

          <div>
            <Btn size="Small" color="Black">
              <Text size="X-Small" color="White" fontFamily="YESGothic-Regular">
                {FOLLOW}
              </Text>
            </Btn>
          </div>
        </StyledColBetweenContainer>
      </StyledCenterContainer>
    </StyledUserContainer>
  );
};

export default FollowUserItem;

const StyledUserContainer = styled.div`
  ${FlexCenter}
  border: solid 0.5px white;
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
