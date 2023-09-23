import styled from "styled-components";
import Text from "../atoms/Text";
import { StyledMoviePoster } from "./MovieItem";
import { FlexRowBetween } from "../../commons/style/SharedStyle";

const SoulMovieItem = ({ ...props }) => {
  const handleClickMovie = () => {
    console.log("영화 클릭함");
  };
  // 받아온 영화 이름
  const movieName = props.movie;
  const displayMovieName =
    movieName.length > 4 ? movieName.substring(0, 4) + "..." : movieName;
  return (
    <StyledSoulMovieWrapper onClick={handleClickMovie}>
      {/* 영화 포스터 */}
      <StyledPosterImage>
        <StyledMoviePoster src={props.src} />
        {/* 흰색 그라디언트 */}
        <StyledPosterCover />
      </StyledPosterImage>
      {/* 인생영화 순위 + 제목 텍스트 */}
      <StyledSoulTextWrapper>
        <Text size="X-Large" color="Black" fontFamily="PyeongChang-Bold">
          1
        </Text>
        <Text
          size="Medium"
          color="Black"
          fontFamily="YESGothic-Regular"
          title={movieName}
        >
          {displayMovieName}
        </Text>
      </StyledSoulTextWrapper>
    </StyledSoulMovieWrapper>
  );
};

export default SoulMovieItem;

const StyledPosterImage = styled.div`
  width: 100%;
  padding-top: 130%; // 너비의 1.3배에 해당하는 높이 설정
  border-radius: 0.75rem;
  overflow: hidden;

  position: relative;
`;

/** 포스터 흰색 그라디언트 wrap */
const StyledPosterCover = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;

  background: linear-gradient(
    to top,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0) 70%
  );
`;

/** 인생영화 Wrapper */
const StyledSoulMovieWrapper = styled.div`
  width: 100%;
  cursor: pointer;
`;

/** 인생영화 텍스트 Wrapper */
const StyledSoulTextWrapper = styled.div`
  ${FlexRowBetween}
  width: 85%;
  margin: -1.25rem auto 0 auto; // 20px만큼 위로 이동
  position: relative;
`;
