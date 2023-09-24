import { MainPaddingContainer } from "../../commons/style/layoutStyle";
import SoulMovieItemList from "../../components/movies/SoulMovieItemList";
import MyOTTPlanet from "../../components/users/MyOTTPlanet";
import MypageLikeContents from "../../components/users/MypageLikeContents";
import MypageUserInfo from "../../components/users/MypageUserInfo";

const MyProfilePage = () => {
  return (
    <MainPaddingContainer>
      <div className="grid grid-cols-3 gap-4">
        <MypageUserInfo />
        <div>
          <SoulMovieItemList />
          <MyOTTPlanet />
          <MypageLikeContents />
        </div>
      </div>
    </MainPaddingContainer>
  );
};

export default MyProfilePage;
