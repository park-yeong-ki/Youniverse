import Wrapper from "../atoms/Wrapper";
import Text from "../atoms/Text";
import SearchMovieItemList from "../movies/SearchMovieItemList";
import { MovieType } from "../movies/MovieItemList";

interface ResultContainersProps {
  searchResults: MovieType[];
  searchTerm: string;
}

const ResultContainers: React.FC<ResultContainersProps> = ({ searchResults, searchTerm }) => {
  return (
    <Wrapper size="Standard" color="WhiteGhost" padding="Medium">
      <Text size="Medium" color="Black" fontFamily="YESGothic-Bold">
        #{searchTerm}
      </Text>
      {searchResults.length > 0 ? (
        <SearchMovieItemList movies={searchResults} />
      ) : (
        <Text size="Medium" color="Black" fontFamily="YESGothic-Bold">
          검색결과가 없습니다
        </Text>
      )}
    </Wrapper>
  );
};

export default ResultContainers;
