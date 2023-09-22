import React from "react";

type Props = {
  filterOTT?: string | null;
};

const MovieItemList: React.FC<Props> = ({ filterOTT }) => {
  // 필요한 경우 filterOTT 값을 사용하여 영화 목록을 필터링하면 됩니다.

  return (
    <>
      <div>MovieItemList 인 데 요</div>
      {filterOTT}
    </>
  );
};

export default MovieItemList;
