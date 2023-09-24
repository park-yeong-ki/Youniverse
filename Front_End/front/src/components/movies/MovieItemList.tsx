import React from "react";
import MovieItem from "./MovieItem";

type Props = {
  filterOTT?: string | null;
  listType?: string;
};

const MovieItemList: React.FC<Props> = ({ filterOTT, listType }) => {
  // 필요한 경우 filterOTT 값을 사용하여 영화 목록을 필터링하면 됩니다.
  // listType: 유튜브 기반 추천, @@님의 선호도 기반, @@@님의 인생영화 ... 이런 텍스트
  // filterOTT: 추천 -> 더보기 들어갔을 때 OTT 선택해서 필터링 하는거
  // 검색결과에 맞는 영화 추가 필요

  return (
    <>
      {filterOTT}
      <div>{listType}</div>
      <MovieItem /> 
    </>
  );
};

export default MovieItemList;
