import React, { useState, useEffect } from "react";
import Wrapper from "../atoms/Wrapper";
import MovieItemList from "./MovieItemList";

type MovieProps = {
  selectedOTT: string | null;
  listType?: string | null;
};

const MoreRecommendMovie: React.FC<MovieProps> = ({
  selectedOTT,
  listType,
}) => {
  const [page, setPage] = useState(0);

  const handleScroll = (e: any) => {
    const target = e.target;
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      setPage((prev) => prev + 1); // 페이지 번호 증가
    }
  };

  useEffect(() => {
    setPage(0); // selectedOTT가 변경될 때 페이지 번호를 리셋
  }, [selectedOTT]);

  return (

      <Wrapper
        size="Standard"
        color="WhiteGhost"
        padding="Medium"
        onScroll={handleScroll}
        height="70vh" // 예시: Wrapper의 높이를 80vh로 설정
      >
        <MovieItemList
          filterOTT={selectedOTT}
          listType={listType}
          page={page}
          layout="vertical" // 세로 스크롤로 적용
        />
      </Wrapper>

  );
};

export default MoreRecommendMovie;
