// 마이페이지에서 팔로우, 팔로워 눌렀을 때 우측에 보이는 wrapper

// import { useState } from "react";
import { useNavigate } from "react-router";
import Text from "../atoms/Text";
import Btn from "../atoms/Btn";
import {
  SEARCH_USER,
  FOLLOWING,
  FOLLOWER,
} from "../../commons/constants/String";
import Wrapper from "../atoms/Wrapper";
import styled from "styled-components";
import IconBox from "../atoms/IconBox";
import { HiChevronLeft } from "react-icons/hi";
import { UserType } from "../../pages/profile/MyProfilePage";
import { AlignCenter, FlexRowBetween } from "../../commons/style/SharedStyle";
import UserFollowContainer from "../organisms/UserFollowContainer";
import { ROUTES } from "../../commons/constants/Routes";

interface MypageFollowProps {
  memberData: UserType | null;
  followStatus: string;
  setFollowStatus: React.Dispatch<React.SetStateAction<string>>;
}

const MypageFollowWrap: React.FC<MypageFollowProps> = ({
  memberData,
  followStatus,
  setFollowStatus,
}) => {
  const navigate = useNavigate();
  const keywords = memberData?.keywordResDtos;
  console.log(keywords);

  const handleToUserSearch = () => {
    navigate(ROUTES.PROFILE);
  };

  return (
    <Wrapper size="Standard" color="WhiteGhost" padding="Medium">
      {/* 팔로잉, 팔로워, 새로운 유저 찾기 */}
      <StyledTopWrap>
        <StyledChangeWrap>
          <IconBox
            Icon={HiChevronLeft}
            size={32}
            color="Black"
            onClick={() => setFollowStatus("")}
          />
          <StyledTextNumWrap>
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
          </StyledTextNumWrap>
          <StyledTextNumWrap>
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
          </StyledTextNumWrap>
        </StyledChangeWrap>
        <Btn size="Small" color="White" onClick={handleToUserSearch}>
          {SEARCH_USER}
        </Btn>
      </StyledTopWrap>

      {/* 팔로잉 / 팔로워 목록 보여주는 공간 */}
      {followStatus === FOLLOWING && (
        <StyledFollowWrap size="Standard" color="WhiteGhost" padding="Medium">
          <UserFollowContainer followStatus={followStatus} />
        </StyledFollowWrap>
      )}
      {followStatus === FOLLOWER && (
        <StyledFollowWrap size="Standard" color="WhiteGhost" padding="Medium">
          <UserFollowContainer followStatus={followStatus} />
        </StyledFollowWrap>
      )}
    </Wrapper>
  );
};

export default MypageFollowWrap;

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

/** 팔로잉/ 팔로워와 옆의 숫자 묶음 */
const StyledTextNumWrap = styled.div`
  ${AlignCenter}
  & > * {
    margin-right: 8px;
  }
`;
const StyledChangeWrap = styled.div`
  ${AlignCenter}
  & > * {
    margin-right: 20px;
  }
`;
const StyledTopWrap = styled.div`
  ${FlexRowBetween}
  & > button {
    width: 20%;
  }
  height: 12%;
  margin-bottom: 3%;
`;

const StyledFollowWrap = styled(Wrapper)`
  overflow-y: auto;
  border-radius: 28px;
`;
