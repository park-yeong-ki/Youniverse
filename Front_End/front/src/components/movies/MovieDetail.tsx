import React, { useEffect, useState } from "react";
import { getMovie } from "../../apis/FrontendApi";

const MovieDetail = () => {
  const [movie, setMovie] = useState([])

  useEffect(() => {
    getMovie(1)
      .then((response) => {
        console.log(response.data);
        setMovie(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div>영화포스터잖아</div>
      {movie}
      <div>기타 정보가 들어갈 자리인데용</div>
    </div>
  );
};

export default MovieDetail;
