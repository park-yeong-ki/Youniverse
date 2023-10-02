import MovieItem from "./MovieItem";
import { MovieType } from "./MovieItemList";

type Props = {
  movies?: MovieType[]; // 추가
};

const SearchMovieItemList: React.FC<Props> = ({
  movies: propMovies = [], // 변수 이름 변경
}) => {

  return (
      <div className="grid grid-cols-5 gap-4">
        {propMovies.map((movie) => (
          <MovieItem key={movie.movieId} movie={movie} />
        ))}
      </div>
  );
};

export default SearchMovieItemList;