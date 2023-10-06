// 마이페이지에 있는 ㅇㅇ 님이 좋아한 콘텐츠 컴포넌트
import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { MY_PAGE_LIKE } from "../../commons/constants/String";
import Text from "../atoms/Text";
import Wrapper from "../atoms/Wrapper";
import MovieItem from "../movies/MovieItem";
import { FlexCenter } from "../../commons/style/SharedStyle";
import { UserType } from "../../pages/profile/MyProfilePage";
import { StyledPXWrapper } from "../review/MyProfileReview";

interface MypageLikeContentsProps {
  memberData: UserType | null;
}

const MypageLikeContents: React.FC<MypageLikeContentsProps> = ({
  memberData,
}) => {
  // const [movies, setMovies] = useState<MovieType[]>([]);
  const [likedMovies, setLikedMovies] = useState<Array<any>>([]);

  // 좋아요 누른 영화 데이터 설정 로직
  useEffect(() => {
    if (memberData && memberData.heartMovieResDtos) {
      setLikedMovies(memberData.heartMovieResDtos);
    }
  }, [memberData]);

  return (
    <StyledPXWrapper>
      <div>
        <Text size="Medium" color="White" fontFamily="PyeongChang-Bold">
          {memberData?.nickname}
          {MY_PAGE_LIKE}
        </Text>
        <Text
          size="Small"
          color="White"
          fontFamily="YESGothic-Regular"
          className="ml-3"
        >
          💖 {likedMovies.length}
        </Text>
      </div>
      <Wrapper
        size="Standard"
        color="WhiteGhost"
        padding="Narrow"
        className=" mt-2"
      >
        <div className="grid grid-cols-3 gap-3">
          {likedMovies.length === 0 ? (
            <div className="col-span-3 text-center">
              <StyledPXText
                size="Small"
                color="Black"
                fontFamily="PyeongChang-Light"
              >
                아직 좋아요한 콘텐츠가 없어요
              </StyledPXText>
            </div>
          ) : (
            <>
              {likedMovies.slice(0, 2).map((movie) => (
                <MovieItem
                  key={movie.heartMovieId}
                  movie={movie.movieSimpleResDto}
                  $profile
                />
              ))}

              {likedMovies.length > 2 && (
                <StyledThirdWrapper>
                  <MovieItem
                    movie={likedMovies[2].movieSimpleResDto}
                    $profile
                  />
                  <StyledAddWrapper>
                    <Text
                      size="Medium"
                      color="White"
                      fontFamily="PyeongChang-Bold"
                    >
                      +{likedMovies.length - 2}
                    </Text>
                  </StyledAddWrapper>
                </StyledThirdWrapper>
              )}
            </>
          )}
        </div>
      </Wrapper>
    </StyledPXWrapper>
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

const StyledPXText = styled(Text)`
  line-height: 190px;
`;
