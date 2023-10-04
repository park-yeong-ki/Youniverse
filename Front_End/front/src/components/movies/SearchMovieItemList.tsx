import MovieItem from "./MovieItem";
import { MovieType } from "../../types/MovieType";

type Props = {
  onMovieSelect?: (movie: MovieType) => void;
  movies?: MovieType[]; // 추가
};

const SearchMovieItemList: React.FC<Props> = ({
  onMovieSelect,
  movies: propMovies = [], // 변수 이름 변경
}) => {
  return (
    <div className="grid grid-cols-5 gap-4">
      {propMovies.map((movie) => (
        <MovieItem
          key={movie.movieId}
          movie={movie}
          onClick={() => onMovieSelect && onMovieSelect(movie)}
        />
      ))}
    </div>
  );
};

export default SearchMovieItemList;
