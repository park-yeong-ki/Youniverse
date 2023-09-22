import styled from "styled-components";
import Text from "../atoms/Text";
import { StyledMoviePoster } from "./MovieItem";

const SoulMovieItem = ({ ...props }) => {
  // 받아온 영화 이름
  const movieName = "안냐세용";
  const displayMovieName =
    movieName.length > 4 ? movieName.substring(0, 4) + "..." : movieName;
  return (
    <div>
      {/* 영화 포스터 */}
      <StyledPosterImage>
        <StyledMoviePoster src={props.src} />
        {/* 흰색 그라디언트 */}
        <StyledPosterCover />
      </StyledPosterImage>
      {/* 인생영화 순위 + 제목 텍스트 */}
      <div>
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
      </div>

    </div>
  );
};

export default SoulMovieItem;

const StyledPosterImage = styled.div`
  --card-width: 11rem;
  width: var(--card-width);
  height: calc(var(--card-width) * 1.3);
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