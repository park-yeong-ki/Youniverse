import React, { useState } from "react";
import axios from "axios";
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

interface Props {
  user: UserProps;
  isSelected: boolean;
  onSelect: () => void;
}

const RecommendUserItem = ({
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
        <div>
          <Img size="Medium" src={image} />
          <div>
            <div>{nickname}</div>
            <div>
              {hashtags.map((hashtag, index) => (
                <HashTag
                  key={index}
                  size="Standard"
                  color={isSelected ? "Black" : "White"}
                >
                  {hashtag}
                </HashTag>
              ))}
            </div>
          </div>
        </div>
      </StyledCenterContainer>
    </StyledUserContainer>
  );
};

export default RecommendUserItem;

const StyledUserContainer = styled.div`
  border: solid 0.5px white;
  border-radius: 12px;
  padding: 5px;
  width: 100%;
`;

const StyledCenterContainer = styled.div<{ isSelected?: boolean }>`
  ${FlexCenter}
  background-color: ${(props) => (props.isSelected ? "white" : "transparent")};
  &:hover {
    cursor: pointer;
  }
`;
