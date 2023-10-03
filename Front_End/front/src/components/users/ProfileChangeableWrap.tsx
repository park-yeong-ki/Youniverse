import Text from "../atoms/Text";
import {
  FOLLOWING,
  FOLLOWER,
  LIKEIT,
  MY_PAGE_LIKE,
} from "../../commons/constants/String";
import Wrapper from "../atoms/Wrapper";
import styled from "styled-components";
import IconBox from "../atoms/IconBox";
import { HiChevronLeft } from "react-icons/hi";
import { UserType } from "../../pages/profile/MyProfilePage";
import ProfileLikeContents from "./ProfileLikeContents";
import ProfileUserFollowContainer from "../organisms/ProfileUserFollowContainer";

interface ProfileChangeableProps {
  memberData: UserType | null;
  selectStatus: string;
  setSelectStatus: React.Dispatch<React.SetStateAction<string>>;
}

const ProfileChangeableWrap: React.FC<ProfileChangeableProps> = ({
  memberData,
  selectStatus,
  setSelectStatus,
}) => {
  const keywords = memberData?.keywordResDtos;
  console.log(keywords);

  return (
    <Wrapper size="Standard" color="WhiteGhost" padding="Medium">
      {/* 팔로잉, 팔로워, 새로운 유저 찾기 */}
      <StyledRowContainer>
        <StyledArrowContainer className="w-1/10">
          <IconBox
            Icon={HiChevronLeft}
            size={32}
            color="Black"
            onClick={() => setSelectStatus("")}
          />
        </StyledArrowContainer>
        <div className="w-9/10">
          {selectStatus === LIKEIT && (
            <StyledRowContainer>
              <Text size="Medium" color="White" fontFamily="PyeongChang-Light">
                {memberData?.nickname} {MY_PAGE_LIKE}
              </Text>
              <StyledCircleNumber $isActive={selectStatus === LIKEIT}>
                {memberData?.heartMovieResDtos.length}
              </StyledCircleNumber>
            </StyledRowContainer>
          )}
          {selectStatus === FOLLOWING && (
            <StyledRowContainer>
              <Text size="Medium" color="White" fontFamily="PyeongChang-Light">
                {memberData?.nickname} 님의 {FOLLOWING}
              </Text>
              <StyledCircleNumber $isActive={selectStatus === FOLLOWING}>
                {memberData?.followings.length}
              </StyledCircleNumber>
            </StyledRowContainer>
          )}
          {selectStatus === FOLLOWER && (
            <StyledRowContainer>
              <Text size="Medium" color="White" fontFamily="PyeongChang-Light">
                {memberData?.nickname} 님의 {FOLLOWER}
              </Text>
              <StyledCircleNumber $isActive={selectStatus === FOLLOWER}>
                {memberData?.followers.length}
              </StyledCircleNumber>
            </StyledRowContainer>
          )}
        </div>
      </StyledRowContainer>
      <div>
        {/* 팔로잉 / 팔로워 목록 보여주는 공간 */}
        {selectStatus === FOLLOWING && memberData && (
          <ProfileUserFollowContainer
            followStatus={selectStatus}
            currentUserId={memberData?.memberId}
          />
        )}
        {selectStatus === FOLLOWER && memberData && (
          <ProfileUserFollowContainer
            followStatus={selectStatus}
            currentUserId={memberData?.memberId}
          />
        )}
        {selectStatus === LIKEIT && (
          <ProfileLikeContents memberData={memberData} />
        )}
      </div>
    </Wrapper>
  );
};

export default ProfileChangeableWrap;

const StyledArrowContainer = styled.div`
  display: flex;
  align-items: center;
`;
export const StyledCircleNumber = styled.div<{ $isActive?: boolean }>`
  width: 24px;
  height: 24px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  font-weight: bold;
  font-size: 12px;
  border-radius: 50%;
  background-color: ${(props) => (props.$isActive ? "#000" : "#ccc")};
  margin-left: 5px;
`;

const StyledRowContainer = styled.div`
  display: flex;
  align-items: center;
`;
