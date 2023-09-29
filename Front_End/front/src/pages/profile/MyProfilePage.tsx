import { useState, useEffect } from "react";
import { MainPaddingContainer } from "../../commons/style/layoutStyle";
import SoulMovieItemList, {
  SoulMovie,
} from "../../components/movies/SoulMovieItemList";
import MyOTTPlanet from "../../components/users/MyOTTPlanet";
import MypageFollowWrap from "../../components/users/MypageFollowWrap";
import MypageLikeContents from "../../components/users/MypageLikeContents";
import MypageUserInfo from "../../components/users/MypageUserInfo";
import UserZodiacSign from "../../components/users/UserZodiacSign";
import { useRecoilValue } from "recoil";
import { UserDetailInfoState } from "../store/State";
import { getMember } from "../../apis/FrontendApi";
import { MovieType } from "../../components/movies/MovieItemList";

export type UserType = {
  memberId: number;
  nickname: string;
  email: string;
  gender: string;
  age: number;
  introduce: string;
  memberImage: string;
  ottResDtos: Array<{
    ottImage: string;
    ottName: string;
    ottUrl: string;
  }>;
  keywordResDtos: Array<{
    keywordName: string;
    source: number;
  }>;
  followers: Array<any>; // 구체적인 타입 정보 들어오면 수정 @@@
  followings: Array<any>;
  heartMovieResDtos: Array<MovieType>;
  bestMovieResDtos: Array<SoulMovie>;
  reviewResDtos: Array<any>; // 구체적인 타입 정보 들어오면 수정 @@@
};

const MyProfilePage = () => {
  const memberId = useRecoilValue(UserDetailInfoState).memberId;
  const [memberData, setMemberData] = useState<UserType | null>(null);
  const [followStatus, setFollowStatus] = useState<string>("");

  useEffect(() => {
    getMember(Number(memberId))
      .then((response) => {
        console.log("개별 회원 조회", `${memberId}번 회원=`, response.data);
        setMemberData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [memberId]);

  return (
    <MainPaddingContainer>
      <div className="flex gap-5">
        <div className="w-1/4">
          <MypageUserInfo
            memberData={memberData}
            followStatus={followStatus}
            setFollowStatus={setFollowStatus}
          />
        </div>
        <div className="w-3/4">
          {!followStatus && (
            <div>
              <SoulMovieItemList />
              <MyOTTPlanet />
              <MypageLikeContents />
              <UserZodiacSign />
            </div>
          )}

          {followStatus && (
            <MypageFollowWrap
              memberData={memberData}
              followStatus={followStatus}
              setFollowStatus={setFollowStatus}
            />
          )}
        </div>
      </div>
    </MainPaddingContainer>
  );
};

export default MyProfilePage;
