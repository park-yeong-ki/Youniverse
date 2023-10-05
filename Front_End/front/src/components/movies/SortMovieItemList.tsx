import styled from "styled-components";
import Text from "../atoms/Text";
import MovieItem from "./MovieItem";
import { MovieType } from "../../types/MovieType";

type Props = {
  movies?: MovieType[];
};

const SortMovieItemList: React.FC<Props> = ({ movies: propMovies = [] }) => {
  const NoMovieText = () => (
    <Text size="Medium" color="Black" fontFamily="PyeongChang-Bold">
      영화가 없습니다.
    </Text>
  );

  const renderMovies = () => {
    return propMovies && propMovies.length > 0 ? (
      <div className="grid grid-cols-6 gap-5">
        {propMovies.map((movie) => (
          <MovieItem key={movie.movieId} movie={movie} />
        ))}
      </div>
    ) : (
      <NoMovieText />
    );
  };

  return (
    <RecommendPaddingContainer>
      <div>{renderMovies()}</div>
    </RecommendPaddingContainer>
  );
};

export default SortMovieItemList;

const RecommendPaddingContainer = styled.div`
  padding: 2rem;
`;
