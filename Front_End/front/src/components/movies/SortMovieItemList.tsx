import styled from "styled-components";
import { FlexRowBetween } from "../../commons/style/SharedStyle";
import Text from "../atoms/Text";
import MovieItem from "./MovieItem";
import { MovieType } from "../../types/MovieType";

type Props = {
  listType?: string | null;
  movies?: MovieType[];
  showMoreButton?: boolean;
};

const SortMovieItemList: React.FC<Props> = ({
  listType,
  movies: propMovies = [],
}) => {
  
  const renderMovies = () => {
  if (propMovies && propMovies.length > 0) {  // using propMovies instead of movies
    return propMovies.length > 0 ? (
      <div className="grid grid-cols-5 gap-5">
        {propMovies.map((movie) => (  // using propMovies instead of movies
          <MovieItem key={movie.movieId} movie={movie} />
        ))}
      </div>
    ) : (
      <NoMovieText />
    );
  }
};

  const NoMovieText = () => (
    <Text size="Medium" color="Black" fontFamily="PyeongChang-Bold">
      영화가 없습니다.
    </Text>
  );

  return (
    <RecommendPaddingContainer>
      <StyledListBtn>
        <Text size="Large" color="White" fontFamily="PyeongChang-Bold">
          {listType}
        </Text>
      </StyledListBtn>
      <div>{renderMovies()}</div>
    </RecommendPaddingContainer>
  );
};

export default SortMovieItemList;

const StyledListBtn = styled.div`
  ${FlexRowBetween}
`;

const RecommendPaddingContainer = styled.div`
  padding: 2rem;
`;