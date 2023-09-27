import MovieItem from "./MovieItem";

type Props = {
  filterOTT?: string | null;
  listType?: string;
  movies?: MovieType[]; // 추가
};

type ActorType = {
  actorId: number;
  actorImage: string;
  actorName: string;
};

type DirectorType = {
  directorId: number;
  directorImage: string;
  directorName: string;
};

type KeywordType = {
  keywordId: number;
  keywordName: string;
  source: number;
};

// 기존 MovieType 확장
export type MovieType = {
  movieId: number;
  title: string;
  movieImage: string;
  rate: number;
  runtime: number;
  ottResDtos: OTTType[];
  heartMovieResDtos: {
    heartMovieId: number;
    memberSimpleResDto: {
      memberId: number;
    }[];
  }[];
  hateMovieResDtos: {
    hateMovieId: number;
    memberSimpleResDto: {
      memberId: number;
    }[];
  }[];
  actorResDtos: ActorType[];
  directorResDtos: DirectorType[];
  keywordResDtos: KeywordType[];
};

type OTTType = {
  ottId: number;
  ottImage: string;
  ottName: string;
  ottPrice: number;
  ottUrl: string;
};

const convertOTTNameToId = (
  ottName: string | null | undefined
): number | null => {
  if (!ottName) return null; // 이 줄을 추가하여 null 또는 undefined를 처리합니다.

  switch (ottName) {
    case "넷플릭스":
      return 1;
    case "디즈니플러스":
      return 2;
    case "왓챠":
      return 3;
    case "애플티비":
      return 4;
    case "웨이브":
      return 5;
    default:
      return null;
  }
};

const SearchMovieItemList: React.FC<Props> = ({
  filterOTT,
  movies: propMovies = [], // 변수 이름 변경
}) => {

  const targetOttId = convertOTTNameToId(filterOTT);
  const filteredMovies = propMovies.filter((movie: MovieType) => {
    if (!targetOttId) return true;
    return movie.ottResDtos.some((ott: OTTType) => ott.ottId === targetOttId);
  });

  return (
    <>
      <div className="grid grid-cols-5 gap-4">
        {filteredMovies.map((movie) => (
          <MovieItem key={movie.movieId} movie={movie} />
        ))}
      </div>
    </>
  );
};

export default SearchMovieItemList;