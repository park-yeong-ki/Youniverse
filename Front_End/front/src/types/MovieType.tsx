export type OTTType = {
    ottId: number;
    ottImage: string;
    ottName: string;
    ottPrice: number;
    ottUrl: string;
  };
  
  export type ActorType = {
    actorId: number;
    actorImage: string;
    actorName: string;
  };
  
  export type DirectorType = {
    directorId: number;
    directorImage: string;
    directorName: string;
  };
  
  export type GenreType = {
    genreId: number;
    genreName: string;
  };
  
  export type KeywordType = {
    keywordId: number;
    keywordName: string;
    source: number;
  };
  
  export type MovieType = {
    movieId: number;
    title: string;
    movieImage: string;
    rate: number;
    runtime: number;
    ottResDtos: OTTType[];
    overView: string;
    heartMovieResDtos: {
      heartMovieId: number;
      memberSimpleResDto: {
        memberId: number;
        memberImage: string | null;
        nickname: string;
      };
    }[];
    hateMovieResDtos: {
      hateMovieId: number;
      memberSimpleResDto: {
        memberId: number;
        memberImage: string | null;
        nickname: string;
      };
    }[];
    actorResDtos: ActorType[];
    directorResDtos: DirectorType[];
    keywordResDtos: KeywordType[];
    genreResDtos: GenreType[];
  };
  
  export type BestMovieType = {
    bestMovieId: number;
    movieSimpleResDto: {
      movieId: number;
      title: string;
      movieImage: string;
      keywordResDtos: {
        keywordId: number;
        keywordName: string;
      }[];
      rate: number;
      runtime: number;
    };
    movie: MovieType;
  };