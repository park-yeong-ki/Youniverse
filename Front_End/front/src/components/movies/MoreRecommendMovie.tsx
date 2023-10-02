import React from "react";
import Wrapper from "../atoms/Wrapper";
import MovieItemList from "./MovieItemList";

type MovieProps = {
  selectedOTT: string | null;
};

const MoreRecommendMovie: React.FC<MovieProps> = ({ selectedOTT }) => {
  return (
    <Wrapper size="Standard" color="WhiteGhost" padding="Medium">
      <MovieItemList filterOTT={selectedOTT} useSlider={false}/>
    </Wrapper>
  );
};


export default MoreRecommendMovie;
