import React, { useEffect, useState } from "react";
import { getMovie } from "../../apis/FrontendApi";
import Text from "../atoms/Text";
import { StyledMoviePoster } from "./MovieItem";

const MovieDetail = () => {
  const [movie, setMovie] = useState([]);

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

  console.log(movie);

  return (
    <div>
      {/* 영화 포스터 */}
      <div>
        {/* <StyledMoviePoster /> */}
      </div>

      {/* 영화 상세 정보 */}
      <div>
        <div>
          <Text size="Large" color="Black" fontFamily="PyeongChang-Light">
            영화 제목
          </Text>
          <div>
            <div>별점 버튼</div>
            <div>좋아요 버튼</div>
          </div>
        </div>

        <div>키워드들 들어가는 공간</div>

        <div>영화 설명 들어가는 공간</div>

        <div>
          <div>감독</div>
          <div>감독 이름</div>
        </div>

        <div>
          <div>배우</div>
          <div>배우 이름</div>
        </div>

        <div>
          <div>OTT 행성</div>
          <div>OTT 행성</div>
          <div>OTT 행성</div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
