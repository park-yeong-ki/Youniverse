import React from "react";
import Text from "../atoms/Text";
import MovieItemList from "./MovieItemList";

type Props = {
  lists: string[];
};

const RecommendNotYouTube: React.FC<Props> = ({ lists }) => {
  return (
    <Text size="Large" color="White" fontFamily="PyeongChang-Bold">
      {lists.map(list => (
        <MovieItemList showMoreButton={true} key={list} listType={list} />
      ))}
    </Text>
  );
};
export default RecommendNotYouTube;
