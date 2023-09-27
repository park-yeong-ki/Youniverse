import { useRecoilValue } from "recoil";

import Text from "../atoms/Text";
import { FAVORITE_MOVIE } from "../../commons/constants/String";
import SoulMovieItem from "./SoulMovieItem";
import { UserDetailInfoState } from "../../pages/store/State";

interface SoulMovieListProps {
  soulMovieData?: SoulMovie[];
}

type KeywordResDto = {
  keywordId: number;
  keywordName: string;
  source: number;
};

type MemberSimpleResDto = {
  memberId: number;
  nickname: string;
  memberImage: string;
  keywordResDtos: KeywordResDto[];
};

type MovieSimpleResDto = {
  movieId: number;
  title: string;
  movieImage: string;
  keywordResDtos: KeywordResDto[];
  rate: number;
  runtime: number;
};

export type SoulMovie = {
  bestMovieId: number;
  memberSimpleResDto: MemberSimpleResDto;
  movieSimpleResDto: MovieSimpleResDto;
};

const SoulMovieItemList: React.FC<SoulMovieListProps> = ({ soulMovieData }) => {
  const nickname = useRecoilValue(UserDetailInfoState).nickname;
  const onAddMovie = () => {
    console.log("모달창 띄워야됨요");
  };
  return (
    <div>
      <Text size="Medium" color="White" fontFamily="PyeongChang-Bold">
        {nickname}
        {FAVORITE_MOVIE}
      </Text>
      <div className="grid grid-cols-5 gap-4">
        {soulMovieData?.map((soulMovie, index) => (
          <SoulMovieItem
            key={index}
            src={soulMovie.movieSimpleResDto.movieImage}
            movie={soulMovie.movieSimpleResDto.movieId}
            rank={index + 1}
            title={soulMovie.movieSimpleResDto.title}
          />
        ))}
        {Array(5 - (soulMovieData?.length || 0))
          .fill(0)
          .map((_, index) => (
            <SoulMovieItem
              key={index + 5}
              rank={(soulMovieData?.length || 0) + index + 1}
              isEmpty
              onAddMovie={onAddMovie}
            />
          ))}
      </div>
    </div>
  );
};

export default SoulMovieItemList;
