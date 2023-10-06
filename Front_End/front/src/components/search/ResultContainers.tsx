import styled from "styled-components";
import Wrapper from "../atoms/Wrapper";
import Text from "../atoms/Text";
import SearchMovieItemList from "../movies/SearchMovieItemList";
import { MovieType } from "../../types/MovieType";

interface ResultContainersProps {
  onMovieSelect?: (movie: MovieType) => void;
  searchResults: MovieType[];
  searchTerm: string;
}

const ResultContainers: React.FC<ResultContainersProps> = ({
  onMovieSelect,
  searchResults,
  searchTerm,
}) => {
  return (
    <StyledWrapper size="Standard" color="WhiteGhost" padding="Medium">
      <Text size="Medium" color="Black" fontFamily="YESGothic-Bold">
        #{searchTerm}
      </Text>
      {searchResults.length > 0 ? (
        <SearchMovieItemList
          onMovieSelect={onMovieSelect}
          movies={searchResults}
        />
      ) : (
        <Text size="Medium" color="Black" fontFamily="YESGothic-Bold">
          검색결과가 없습니다
        </Text>
      )}
    </StyledWrapper>
  );
};

export default ResultContainers;

const StyledWrapper = styled(Wrapper)`
  max-height: 600px; // 원하는 높이 설정
  overflow-y: auto;
`;
