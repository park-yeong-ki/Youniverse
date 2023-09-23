import SoulMovieItemList from "../../components/movies/SoulMovieItemList";
import MypageUserInfo from "../../components/users/MypageUserInfo";

const MyProfilePage = () => {
  return (
    <div>
      마이페이지
      <MypageUserInfo />
      <SoulMovieItemList />
    </div>
  );
};

export default MyProfilePage;
