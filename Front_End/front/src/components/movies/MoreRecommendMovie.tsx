import React from "react";
import Wrapper from "../atoms/Wrapper";
import MovieItemList from "./MovieItemList";

type MovieProps = {
  selectedOTT: string | null;
  listType?: string | null; 
};

const MoreRecommendMovie: React.FC<MovieProps> = ({ selectedOTT, listType }) => {
  return (
    <Wrapper size="Standard" color="WhiteGhost" padding="Medium">
      <MovieItemList filterOTT={selectedOTT} listType={listType} useSlider={false} />
    </Wrapper>
  );
};


export default MoreRecommendMovie;
