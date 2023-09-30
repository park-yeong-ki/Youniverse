import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Text from "../atoms/Text";
import { StyledMoviePoster } from "./MovieItem";
import { FlexCenter, FlexRowBetween } from "../../commons/style/SharedStyle";
import { ROUTES } from "../../commons/constants/Routes";
import IconBox from "../atoms/IconBox";
import { HiPlusCircle, HiMinusCircle } from "react-icons/hi";
import { deletBest } from "../../apis/FrontendApi";
import { useRecoilValue } from "recoil";
import { UserDetailInfoState } from "../../pages/store/State";

interface SoulMovieItemProps {
  src?: string;
  movie?: number;
  bestId?: number;
  rank?: number;
  title?: string;
  isEmpty?: boolean;
  onAddMovie?: () => void;
  isUser: boolean;
  onDeleteSoulMovie?: (bestId: number) => void;
}

const SoulMovieItem: React.FC<SoulMovieItemProps> = ({
  src,
  movie,
  bestId,
  rank,
  title,
  isEmpty = false,
  onAddMovie,
  isUser,
  onDeleteSoulMovie,
}) => {
  const navigate = useNavigate();
  const memberId = useRecoilValue(UserDetailInfoState).memberId;

  /** 아이템 클릭했을 때, 상세 페이지로 이동 */
  const handleClickMovie = (res: number) => {
    if (isEmpty && onAddMovie) {
      if (isUser) {
        onAddMovie();
      } else {
        console.log("눌러도 아무 일이 일어나지 않음");
      }
    } else {
      navigate(ROUTES.MOVIE_DETAIL.replace(":movieId", res.toString()));
    }
  };

  const handleSoulMovieDelete = (event: React.MouseEvent) => {
    event.stopPropagation(); // 이벤트 전파 중단

    deletBest(Number(bestId))
      .then((response) => {
        console.log("인생영화 삭제", response.data);
        if (onDeleteSoulMovie) {
          onDeleteSoulMovie(Number(bestId));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const movieName = title || "-"; // 텍스트 수정

  /** 이름 다섯 글자 이상일 때 */
  const displayMovieName =
    movieName.length > 4 ? movieName.substring(0, 4) + "..." : movieName;

  return (
    <StyledSoulMovieWrapper onClick={() => handleClickMovie(movie || 0)}>
      {/* 영화 포스터 */}
      <StyledPosterImage>
        {src ? (
          <>
            <StyledMoviePoster src={src} />
            {/* 흰색 그라디언트 */}
            <StyledPosterCover />
          </>
        ) : (
          <StyledAddMovie $isUser={isUser}>
            {isUser ? <HiPlusCircle size={32} /> : <></>}
          </StyledAddMovie>
        )}
      </StyledPosterImage>

      {/* 인생영화 순위 + 제목 텍스트 */}
      <StyledSoulTextWrapper>
        <Text size="X-Large" color="Black" fontFamily="PyeongChang-Bold">
          {rank}
        </Text>
        <Text
          size="Small"
          color="Black"
          fontFamily="YESGothic-Regular"
          title={movieName}
        >
          {displayMovieName}
        </Text>
        {isUser && !isEmpty && (
          <IconBox
            Icon={HiMinusCircle}
            onClick={(e) => handleSoulMovieDelete(e)}
          />
        )}
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

/** 내용이 없을 때 */
const StyledAddMovie = styled.div<{ $isUser: boolean }>`
  ${FlexCenter}
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background-color: #ccc;
  color: #000;
  font-family: YESGothic-Bold;

  ${(props) =>
    props.$isUser &&
    `
    &:hover {
      background-color: #b2b2b2;
    }
  `}
`;
