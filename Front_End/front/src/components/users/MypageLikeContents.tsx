// 마이페이지에 있는 ㅇㅇ 님이 좋아한 콘텐츠 컴포넌트
import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { MY_PAGE_LIKE } from "../../commons/constants/String";
import { getAllMovies } from "../../apis/FrontendApi";
import Text from "../atoms/Text";
import Wrapper from "../atoms/Wrapper";
import { MovieType } from "../../types/MovieType";
import MovieItem from "../movies/MovieItem";
import { FlexCenter } from "../../commons/style/SharedStyle";

const MypageLikeContents = () => {
  const [movies, setMovies] = useState<MovieType[]>([]);

  // 영화 데이터를 불러오는 로직
  useEffect(() => {
    getAllMovies()
      .then((response) => {
        console.log(response.data.content);
        setMovies(response.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <div>
        <Text size="Medium" color="White" fontFamily="PyeongChang-Bold">
          유저{MY_PAGE_LIKE}
        </Text>
        <Text size="Small" color="White" fontFamily="YESGothic-Regular">
          💖 {movies.length}
        </Text>
      </div>
      <Wrapper size="Standard" color="WhiteGhost" padding="Narrow">
        <div className="grid grid-cols-3 gap-3">
          {movies.length === 0 ? (
            <div className="col-span-3 text-center">
              아직 좋아요한 영화가 없습니다
            </div>
          ) : (
            <>
              {movies.slice(0, 2).map((movie) => (
                <MovieItem key={movie.movieId} movie={movie} />
              ))}

              {movies.length > 2 && (
                <StyledThirdWrapper>
                  <MovieItem movie={movies[2]} />
                  <StyledAddWrapper>
                    <Text
                      size="Medium"
                      color="White"
                      fontFamily="YESGothic-Bold"
                    >
                      +{movies.length - 2}
                    </Text>
                  </StyledAddWrapper>
                </StyledThirdWrapper>
              )}
            </>
          )}
        </div>
      </Wrapper>
    </div>
  );
};

export default MypageLikeContents;

const StyledThirdWrapper = styled.div`
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  & > div:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

const StyledAddWrapper = styled.div`
  ${FlexCenter}
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`;
