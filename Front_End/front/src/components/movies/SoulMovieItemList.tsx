import { useRecoilValue } from "recoil";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Text from "../atoms/Text";
import { FAVORITE_MOVIE } from "../../commons/constants/String";
import SoulMovieItem from "./SoulMovieItem";
import { UserDetailInfoState } from "../../pages/store/State";
import { getMember } from "../../apis/FrontendApi";
import styled from "styled-components";
import SearchContainer from "../search/SearchContainer";
import ResultContainers from "../search/ResultContainers";
import { MovieType } from "../../components/movies/MovieItemList";
import { FlexCenter, FlexColBetween } from "../../commons/style/SharedStyle";
import IconBox from "../atoms/IconBox";
import { HiOutlineX } from "react-icons/hi";

type KeywordResDto = {
  keywordId: number;
  keywordName: string;
  source: number;
};

type MemberSimpleResDto = {
  memberId: number;
  nickname: string;
  memberImage: string;
  keywordResDtos: KeywordResDto[];
};

type MovieSimpleResDto = {
  movieId: number;
  title: string;
  movieImage: string;
  keywordResDtos: KeywordResDto[];
  rate: number;
  runtime: number;
};

export type SoulMovie = {
  bestMovieId: number;
  memberSimpleResDto: MemberSimpleResDto;
  movieSimpleResDto: MovieSimpleResDto;
};

const SoulMovieItemList = () => {
  const [soulMovieData, setSoulMovieData] = useState<SoulMovie[]>([]);
  const [addMovieModal, setAddMovieModal] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<MovieType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const nickname = useRecoilValue(UserDetailInfoState).nickname;

  // 로그인유저와 페이지유저가 동일한지 확인하는 과정
  const memberId = useRecoilValue(UserDetailInfoState).memberId; // 리코일에서 가져온 아이디 (로그인 되어있는 유저)
  const userId = useParams(); // 페이지에 붙어있는 memberId(userId)
  const soulMemberId = Number(userId.userId);

  const isUser = memberId === soulMemberId;

  useEffect(() => {
    getMember(Number(soulMemberId))
      .then((response) => {
        setSoulMovieData(response.data.bestMovieResDtos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [soulMemberId]);

  const handleDeleteSoulMovie = (bestIdToDelete: number) => {
    setSoulMovieData((prevData) =>
      prevData.filter((item) => item.bestMovieId !== bestIdToDelete)
    );
  };
  const onAddMovie = () => {
    setAddMovieModal(true);
  };
  return (
    <>
      {/* 모달창 */}
      {addMovieModal && (
        <StyledModalWrapper>
          <StyledBlackHover />
          <StyledSearchModal>
            <SearchContainer
              setSearchResults={setSearchResults}
              setSearchTerm={setSearchTerm}
            />
            <ResultContainers
              searchResults={searchResults}
              searchTerm={searchTerm}
            />
            <IconBox
              Icon={HiOutlineX}
              size={32}
              onClick={() => setAddMovieModal(false)}
            />
          </StyledSearchModal>
        </StyledModalWrapper>
      )}
      <div>
        <Text size="Medium" color="White" fontFamily="PyeongChang-Bold">
          {nickname}
          {FAVORITE_MOVIE}
        </Text>
        <div className="grid grid-cols-5 gap-4">
          {soulMovieData?.map((soulMovie, index) => (
            <SoulMovieItem
              key={index}
              src={soulMovie.movieSimpleResDto.movieImage}
              movie={soulMovie.movieSimpleResDto.movieId}
              bestId={soulMovie.bestMovieId}
              rank={index + 1}
              title={soulMovie.movieSimpleResDto.title}
              isUser={isUser}
              onDeleteSoulMovie={handleDeleteSoulMovie}
            />
          ))}
          {Array(5 - (soulMovieData?.length || 0))
            .fill(0)
            .map((_, index) => (
              <SoulMovieItem
                key={index + 5}
                rank={(soulMovieData?.length || 0) + index + 1}
                isEmpty
                onAddMovie={onAddMovie}
                isUser={isUser}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default SoulMovieItemList;

const StyledSearchModal = styled.div`
  ${FlexColBetween}
  position: absolute;
  width: 70%;
  height: 90%;
  z-index: 1104;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 28px;
  padding: 20px;
  & > *:first-child {
    height: 30%;
    margin-bottom: 20px;
  }
  & > *:nth-child(2) {
    overflow-y: auto;
  }
  & > *:last-child {
    position: absolute;
    top: 32px;
    right: 32px;
  }
`;

const StyledModalWrapper = styled.div`
  ${FlexCenter}
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
`;

const StyledBlackHover = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1103;
`;