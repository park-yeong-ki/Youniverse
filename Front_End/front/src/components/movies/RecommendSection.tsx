import { useRecoilValue } from "recoil";
import RecommendYouTube from "./RecommendYouTube";
import MovieItemList from "./MovieItemList";
import { UserDetailInfoState } from "./../../pages/store/State";
const RecommendSection = () => {
  const memberNickname = useRecoilValue(UserDetailInfoState).nickname;
  return (
    <>
      <RecommendYouTube />
      <MovieItemList
        listType={`${memberNickname}님의 유튜브 기반 추천 영화`}
      />
    </>
  );
};

export default RecommendSection;
