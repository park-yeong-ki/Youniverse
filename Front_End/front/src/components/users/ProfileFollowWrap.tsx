import Text from "../atoms/Text";
import Btn from "../atoms/Btn";
import {
  SEARCH_USER,
  FOLLOWING,
  FOLLOWER,
  LIKEIT,
} from "../../commons/constants/String";
import Wrapper from "../atoms/Wrapper";
import styled from "styled-components";
import IconBox from "../atoms/IconBox";
import { HiChevronLeft } from "react-icons/hi";
import { UserType } from "../../pages/profile/MyProfilePage";

interface MypageFollowProps {
  memberData: UserType | null;
  followStatus: string;
  setFollowStatus: React.Dispatch<React.SetStateAction<string>>;
}

const ProfileFollowWrap: React.FC<MypageFollowProps> = ({
  memberData,
  followStatus,
  setFollowStatus,
}) => {
  const keywords = memberData?.keywordResDtos;
  console.log(keywords);

  return (
    <Wrapper size="Standard" color="WhiteGhost" padding="Medium">
      {/* 팔로잉, 팔로워, 새로운 유저 찾기 */}
      <div>
        <div>
          <IconBox
            Icon={HiChevronLeft}
            size={32}
            color="Black"
            onClick={() => setFollowStatus("")}
          />
          {/* <div>
            <Text
              size="Medium"
              color={followStatus === FOLLOWING ? "Black" : "Gray"}
              fontFamily="YESGothic-Bold"
              onClick={() => setFollowStatus(FOLLOWING)}
            >
              {FOLLOWING}
            </Text>
            <StyledCircleNumber isActive={followStatus === FOLLOWING}>
              {memberData?.followings.length}
            </StyledCircleNumber>
          </div>
          <div>
            <Text
              size="Medium"
              color={followStatus === FOLLOWER ? "Black" : "Gray"}
              fontFamily="YESGothic-Bold"
              onClick={() => setFollowStatus(FOLLOWER)}
            >
              {FOLLOWER}
            </Text>
            <StyledCircleNumber isActive={followStatus === FOLLOWER}>
              {memberData?.followers.length}
            </StyledCircleNumber>
          </div> */}
        </div>
        {/* <Btn size="Small" color="White">
          {SEARCH_USER}
        </Btn> */}
      </div>

      {/* 팔로잉 / 팔로워 목록 보여주는 공간 */}
      {followStatus === FOLLOWING && "팔로잉 목록 보여줘용"}
      {followStatus === FOLLOWER && "팔로워 목록 보여줘용"}
      {followStatus === LIKEIT && "좋아요 목록 보여줘용"}
    </Wrapper>
  );
};

export default ProfileFollowWrap;

export const StyledCircleNumber = styled.div<{ isActive?: boolean }>`
  width: 24px;
  height: 24px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  font-weight: bold;
  font-size: 12px;
  border-radius: 50%;
  background-color: ${(props) => (props.isActive ? "#000" : "#ccc")};
`;
