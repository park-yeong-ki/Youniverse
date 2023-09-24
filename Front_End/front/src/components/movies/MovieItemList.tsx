import React from "react";

type Props = {
  filterOTT?: string | null;
  listType?: string;
};

const MovieItemList: React.FC<Props> = ({ filterOTT, listType  }) => {
  // 필요한 경우 filterOTT 값을 사용하여 영화 목록을 필터링하면 됩니다.

  return (
    <>
      {filterOTT}
      <div>{listType}</div>
    </>
  );
};

export default MovieItemList;
