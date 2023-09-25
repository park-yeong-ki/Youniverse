// import { useEffect } from "react";

import Text from "../atoms/Text";
import { FAVORITE_MOVIE } from "../../commons/constants/String";
import SoulMovieItem from "./SoulMovieItem";

const SoulMovieItemList = () => {
  // axios요청
  // useEffect(() => {}, []);

  return (
    <div>
      <Text size="Medium" color="White" fontFamily="PyeongChang-Bold">
        유저{FAVORITE_MOVIE}
      </Text>
      <div className="grid grid-cols-5 gap-4">
        <SoulMovieItem
          src="https://www.themoviedb.org/t/p/original/w7eApyAshbepBnDyYRjSeGyRHi2.jpg"
          movie="영화이름입니다."
        />
        <SoulMovieItem
          src="https://www.themoviedb.org/t/p/original/w7eApyAshbepBnDyYRjSeGyRHi2.jpg"
          movie="영화이름입니다."
        />
        <SoulMovieItem
          src="https://www.themoviedb.org/t/p/original/w7eApyAshbepBnDyYRjSeGyRHi2.jpg"
          movie="영화이름입니다."
        />
        <SoulMovieItem
          src="https://www.themoviedb.org/t/p/original/w7eApyAshbepBnDyYRjSeGyRHi2.jpg"
          movie="영화이름입니다."
        />
        <SoulMovieItem
          src="https://www.themoviedb.org/t/p/original/w7eApyAshbepBnDyYRjSeGyRHi2.jpg"
          movie="영화이름입니다."
        />
      </div>
    </div>
  );
};

export default SoulMovieItemList;
