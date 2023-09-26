// 마이페이지에 있는 ㅇㅇ 님이 좋아한 콘텐츠 컴포넌트
import React, { useState, useEffect } from "react";
import { MY_PAGE_LIKE } from "../../commons/constants/String";
import { getAllMovies } from "../../apis/FrontendApi";
import Text from "../atoms/Text";
import Wrapper from "../atoms/Wrapper";
import { MovieType } from "../movies/MovieItemList";
import MovieItem from "../movies/MovieItem";

const MypageLikeContents = () => {
  const [movies, setMovies] = useState<MovieType[]>([]);

  // 영화 데이터를 불러오는 로직
  useEffect(() => {
    getAllMovies()
      .then((response) => {
        console.log(response.data.content);
        setMovies(response.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <div>
        <Text size="Medium" color="White" fontFamily="PyeongChang-Bold">
          유저{MY_PAGE_LIKE}
        </Text>
        <Text size="Small" color="White" fontFamily="YESGothic-Regular">
          💖 121{}
        </Text>
      </div>
      <Wrapper size="Standard" color="WhiteGhost" padding="Narrow">
        <div className="grid grid-cols-3">
          {movies.map((movie) => (
            <MovieItem key={movie.movieId} movie={movie} />
          ))}
        </div>
      </Wrapper>
    </div>
  );
};

export default MypageLikeContents;
