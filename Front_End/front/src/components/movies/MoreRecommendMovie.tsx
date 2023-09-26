import React from "react";
import Wrapper from "../atoms/Wrapper";
import MovieItemList from "./MovieItemList";

type MovieProps = {
  selectedOTT: string | null;
};

const MoreRecommendMovie: React.FC<MovieProps> = ({ selectedOTT }) => {
  return (
    <Wrapper size="Standard" color="WhiteGhost" padding="Medium">
      <MovieItemList filterOTT={selectedOTT} listType="Recommendations based on OTT" />
    </Wrapper>
  );
};


export default MoreRecommendMovie;
