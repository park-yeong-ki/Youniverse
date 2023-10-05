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
import { getMember } from "../../apis/FrontendApi";
import { User } from "../search/UserSearchContainer";
import { useSetRecoilState } from "recoil";
import { SelectStatusState } from "../../pages/store/State";

interface Props {
  user: User;
  isSelected: boolean;
  onSelect: () => void;
}

const SearchUserItem: React.FC<Props> = ({ user, isSelected }) => {
  const setSelectStatus = useSetRecoilState(SelectStatusState);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleToClickedUser = async () => {
    try {
      const response = await getMember(user.memberId);
      console.log(response.data);
      navigate(`/profile/${user.memberId}`);
      setSelectStatus("");
      console.log("클릭한 유저id", `${user.memberId}`);
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
                user.memberImage !== null
                  ? user.memberImage
                  : "/assets/DefaultProfile.png"
              }
            />
          </StyledProfileImageContainer>
          <StyledColBetweenContainer>
            <StyledNicknameContainer>{user.nickname}</StyledNicknameContainer>
            <StyledkeywordContainer>
              {user.youtubeKeywordResDtos.slice(0, 2).map((keywords, index) => (
                <HashTag
                  key={index}
                  size="Standard"
                  color={isHovered ? "Black" : isSelected ? "Black" : "White"}
                >
                  {keywords.youtubeKeywordName}
                </HashTag>
              ))}
            </StyledkeywordContainer>
          </StyledColBetweenContainer>
        </StyledRowBetweenContainer>
      </StyledCenterContainer>
    </StyledUserContainer>
  );
};

export default SearchUserItem;

const StyledUserContainer = styled.div`
  padding: 5px 5px;
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
const StyledRowBetweenContainer = styled.div`
  ${FlexRowBetween}
  width: 90%;
`;

const StyledProfileImageContainer = styled.div``;

const StyledColBetweenContainer = styled.div`
  ${FlexColBetweenLeft}
  margin-left: 15px;
`;

const StyledNicknameContainer = styled.div`
  height: 40%;
`;

const StyledkeywordContainer = styled.div`
  ${FlexRowBetween}
`;
