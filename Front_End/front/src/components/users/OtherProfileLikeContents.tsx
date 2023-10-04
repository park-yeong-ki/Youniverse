// 마이페이지에 있는 ㅇㅇ 님이 좋아한 콘텐츠 컴포넌트
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Text from "../atoms/Text";
import MovieItem from "../movies/MovieItem";
import { FlexCenter } from "../../commons/style/SharedStyle";
import { UserType } from "../../pages/profile/MyProfilePage";

interface MypageLikeContentsProps {
  memberData: UserType | null;
}

const OtherProfileLikeContents: React.FC<MypageLikeContentsProps> = ({
  memberData,
}) => {
  const [likedMovies, setLikedMovies] = useState<Array<any>>([]);

  // 좋아요 누른 영화 데이터 설정 로직
  useEffect(() => {
    if (memberData && memberData.heartMovieResDtos) {
      setLikedMovies(memberData.heartMovieResDtos);
    }
  }, [memberData]);

  return (
    <div>
      <StyledNoneContainer>
        <div className="grid grid-cols-3 gap-3">
          {likedMovies.length === 0 ? (
            <div className="col-span-3 text-center">
              아직 좋아요한 영화가 없습니다
            </div>
          ) : (
            <>
              {likedMovies.slice(0, 2).map((movie) => (
                <MovieItem
                  key={movie.heartMovieId}
                  movie={movie.movieSimpleResDto}
                  $profile
                  $cardWidth="80%"
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
      </StyledNoneContainer>
    </div>
  );
};

export default OtherProfileLikeContents;

const StyledNoneContainer = styled.div`
  padding: 1rem 1rem;
`;

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
