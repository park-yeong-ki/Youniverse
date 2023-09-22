import React from "react";
import Text from "../atoms/Text";
import MovieItemList from "./MovieItemList";

const RecommendNotYouTube = () => {
  return (
    <Text size="Large" color="White" fontFamily="PyeongChang-Bold">

      <MovieItemList />
      <MovieItemList />

    </Text>
  );
};

export default RecommendNotYouTube;
