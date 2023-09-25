import { MainPaddingContainer } from "../../commons/style/layoutStyle";
import SoulMovieItemList from "../../components/movies/SoulMovieItemList";
import MypageUserInfo from "../../components/users/MypageUserInfo";

const MyProfilePage = () => {
  return (
    <MainPaddingContainer>
      <div className="grid grid-cols-3 gap-4">
        <MypageUserInfo />
        <div>
          <SoulMovieItemList />
        </div>
      </div>
    </MainPaddingContainer>
  );
};

export default MyProfilePage;
