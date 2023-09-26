import { styled } from "styled-components";
import Img from "../atoms/Img";
import HashTag from "../atoms/HashTag";
import { FlexCenter } from "../../commons/style/SharedStyle";
import { getMember } from "../../apis/FrontendApi";
import { User } from "../organisms/UserSearchContainer";

interface Props {
  user: User;
  isSelected: boolean;
  onSelect: () => void;
}

const SearchUserItem: React.FC<Props> = ({ user, isSelected, onSelect }) => {
  const handleToClickedUser = async () => {
    onSelect();
    try {
      const response = await getMember(user.memberId);
      console.log(response.data);
      // 받은 데이터 프로필에 뿌리기
    } catch (error) {
      console.error("데이터 가져오기 실패", error);
    }
  };

  return (
    <StyledUserContainer>
      <StyledCenterContainer
        $isSelected={isSelected}
        onClick={handleToClickedUser}
      >
        <div>
          <Img
            size="Medium"
            src={
              user.memberImage !== ""
                ? user.memberImage
                : "/assets/기본프로필.jpg"
            }
          />
          <div>
            <div>{user.nickname}</div>
            <div>
              {user.keywordResDtos.map((keywords, index) => (
                <HashTag
                  key={index}
                  size="Standard"
                  color={isSelected ? "Black" : "White"}
                >
                  {keywords.keywordName}
                </HashTag>
              ))}
            </div>
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

const StyledCenterContainer = styled.div<{ $isSelected?: boolean }>`
  ${FlexCenter}
  background-color: ${(props) => (props.$isSelected ? "white" : "transparent")};
  &:hover {
    cursor: pointer;
  }
`;
