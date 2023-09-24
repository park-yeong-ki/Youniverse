import React from "react";
import Text from "../atoms/Text";
import RecommendYouTube from "./RecommendYouTube";
import MovieItemList from "./MovieItemList";
const RecommendSection = () => {
  return (
    <Text size="Large" color="White" fontFamily="PyeongChang-Bold">
      <RecommendYouTube />
      <MovieItemList listType="유튜브 기반 추천" />
    </Text>
  );
};


export default RecommendSection;
