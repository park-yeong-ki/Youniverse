import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import Img from "../atoms/Img";
import HashTag from "../atoms/HashTag";
import {
  FlexCenter,
  FlexColBetweenLeft,
  FlexRowBetween,
} from "../../commons/style/SharedStyle";
import { RecommendUser } from "../organisms/UserRecommendContainer";
import { getMember } from "../../apis/FrontendApi";
import { useSetRecoilState } from "recoil";
import { SelectStatusState } from "../../pages/store/State";
interface Props {
  user: RecommendUser;
  isSelected: boolean;
  onSelect: () => void;
}

const RecommendUserItem = ({ user, isSelected }: Props) => {
  const setSelectStatus = useSetRecoilState(SelectStatusState);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const navigate = useNavigate();
  /**클릭 시 사용자 ID를 이용해 프로필 이동 */
  const handleToClickedUser = async () => {
    try {
      const response = await getMember(user.member_id);
      console.log(response.data);
      navigate(`/profile/${user.member_id}`);
      setSelectStatus("");
      console.log("클릭한 유저id", `${user.member_id}`);
    } catch (error) {
      console.error("데이터 가져오기 실패", error);
    }
  };

  return (
    <StyledUserContainer>
      <StyledCenterContainer
        $isSelected={isSelected}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleToClickedUser}
      >
        <StyledRowBetweenContainer>
          <StyledProfileImageContainer>
            <Img
              size="Small"
              src={
                user.member_image !== null
                  ? user.member_image
                  : "/assets/DefaultProfile.png"
              }
            />
          </StyledProfileImageContainer>
          <StyledColBetweenContainer>
            <div>{user.nickname}</div>
            <StyledHashTagRowBetweenContainer>
              {user.keyword.slice(0, 2).map((hashtag, index) => (
                <HashTag
                  key={index}
                  size="Standard"
                  color={isHovered ? "Black" : isSelected ? "Black" : "White"}
                >
                  {hashtag}
                </HashTag>
              ))}
            </StyledHashTagRowBetweenContainer>
          </StyledColBetweenContainer>
        </StyledRowBetweenContainer>
      </StyledCenterContainer>
    </StyledUserContainer>
  );
};

export default RecommendUserItem;

const StyledUserContainer = styled.div`
  border-radius: 12px;
  padding: 5px;
  width: 100%;
`;

const StyledCenterContainer = styled.div<{ $isSelected?: boolean }>`
  ${FlexCenter}
  width: 100%;
  padding: 10px;
  border-radius: 12px;
  background-color: ${(props) => (props.$isSelected ? "white" : "transparent")};
  &:hover {
    cursor: pointer;
    background-color: white;
  }
`;
const StyledProfileImageContainer = styled.div``;

const StyledColBetweenContainer = styled.div`
  ${FlexColBetweenLeft}
  margin-left: 15px;
`;

const StyledRowBetweenContainer = styled.div`
  ${FlexRowBetween}
  width: 90%;
`;

const StyledHashTagRowBetweenContainer = styled.div`
  ${FlexRowBetween}
`;
