import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Wrapper from "../atoms/Wrapper";
import Text from "../atoms/Text";
import MovieItemList from "../movies/MovieItemList";

const ResultContainers = () => {
  const location = useLocation();
  const initialSearchTerm = location.state?.searchTerm ?? '';
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  useEffect(() => {
    setSearchTerm(location.state?.searchTerm ?? "");
  }, [location.state?.searchTerm]);

  return (
    <Wrapper size="Standard" color="WhiteGhost" padding="Medium">
      <Text size="Medium" color="Black" fontFamily="YESGothic-Bold">
        #{searchTerm}
      </Text>
      <MovieItemList/>
    </Wrapper>
  );
};

export default ResultContainers;
