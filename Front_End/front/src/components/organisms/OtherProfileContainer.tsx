import styled from "styled-components";
//import { SEARCH_USER_PAGE } from "../../commons/constants/String";
import { FlexCenter } from "../../commons/style/SharedStyle";
import Wrapper from "../atoms/Wrapper";
//import Text from "../atoms/Text";
import Img from "../atoms/Img";
import Btn from "../atoms/Btn";
import ProfileReview from "../review/ProfileReview";
import UserZodiacSign from "../users/UserZodiacSign";
import SoulMovieItemList from "../movies/SoulMovieItemList";
import { UserType } from "../../pages/profile/MyProfilePage";
import {
  FOLLOW,
  FOLLOWING,
  FOLLOWER,
  LIKEIT,
} from "../../commons/constants/String";

interface ProfileUserInfoProps {
  memberData: UserType | null;
}

const OtherProfileContainer: React.FC<ProfileUserInfoProps> = ({
  memberData,
}) => {
  return (
    <StyledStandardWhiteGhostWrapper
      size="Standard"
      color="WhiteGhost"
      padding="Medium"
    >
      {/* <Text size="X-Large" color="Black" fontFamily="PyeongChang-Light">
        {SEARCH_USER_PAGE}
      </Text> */}
      <Img
        size="X-Large"
        src={memberData?.memberImage || "/assets/기본프로필.jpg"}
      ></Img>
      <div>
        <div>
          <div>{memberData?.nickname}</div>
          <Btn size="Small" color="Black">
            {FOLLOW}
          </Btn>
        </div>
        <div>{memberData?.introduce}</div>
        <div>
          <div>{LIKEIT}</div>
          {/* <div>{memberData?.heartMovieResDtos}</div> */}
          <div>{FOLLOWER}</div>
          <div>{memberData?.followers.length}</div>
          <div>{FOLLOWING}</div>
          <div>{memberData?.followings.length}</div>
        </div>
      </div>
      <div>
        <UserZodiacSign />
        <ProfileReview />
      </div>
      <SoulMovieItemList />
    </StyledStandardWhiteGhostWrapper>
  );
};
export default OtherProfileContainer;

const StyledStandardWhiteGhostWrapper = styled(Wrapper)`
  ${FlexCenter}
  height: 100%;
  width: 78%;
`;
