import { useState } from "react";
import { MainPaddingContainer } from "../../commons/style/layoutStyle";
import SoulMovieItemList from "../../components/movies/SoulMovieItemList";
import MyOTTPlanet from "../../components/users/MyOTTPlanet";
import MypageFollowWrap from "../../components/users/MypageFollowWrap";
import MypageLikeContents from "../../components/users/MypageLikeContents";
import MypageUserInfo from "../../components/users/MypageUserInfo";
import UserZodiacSign from "../../components/users/UserZodiacSign";

const MyProfilePage = () => {
  const [followStatus, setFollowStatus] = useState<string>("");
  return (
    <MainPaddingContainer>
      <div className="grid grid-cols-2 gap-4">
        <MypageUserInfo
          followStatus={followStatus}
          setFollowStatus={setFollowStatus}
        />
        {!followStatus && (
          <div>
            {/* <SoulMovieItemList />
            <MyOTTPlanet />
            <MypageLikeContents /> */}
            <UserZodiacSign />
          </div>
        )}

        {followStatus && (
          <MypageFollowWrap
            followStatus={followStatus}
            setFollowStatus={setFollowStatus}
          />
        )}
      </div>
    </MainPaddingContainer>
  );
};

export default MyProfilePage;
