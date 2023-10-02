import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
// import Slider from "react-slick";

import {
  UserDetailInfoState,
  UserJoinInfoState,
} from "./../../pages/store/State";
import styled from "styled-components";
import { FlexRowBetween } from "../../commons/style/SharedStyle";
import Btn from "../atoms/Btn";
import Text from "../atoms/Text";
import MovieItem from "./MovieItem";
import { getAllMovies } from "../../apis/FrontendApi";
import { MovieType, OTTType } from "../../types/MovieType";

type Props = {
  filterOTT?: string | null;
  listType?: string | null;
  movies?: MovieType[];
  showMoreButton?: boolean;
  useSlider?: boolean;
  page?: number;
};

// const sliderSettings = {
//   infinite: true,
//   slidesToShow: 8,
//   swipeToSlide: true,
//   autoplay: true,
//   autoplaySpeed: 3000,
//   arrows: true,
//   pauseOnHover: true,
// };

const MovieItemList: React.FC<Props> = ({
  filterOTT,
  listType,
  movies: propMovies = [],
  showMoreButton,
  page, // 이 부분 추가
}) => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<MovieType[]>([]);

  const memberId = useRecoilValue(UserDetailInfoState).memberId;
  const memberAge = useRecoilValue(UserJoinInfoState).age;
  const memberGender = useRecoilValue(UserJoinInfoState).gender;

  // const sortTypeMap = {
  //   "선호도기반 추천 영화": 1,
  //   [`${memberAge}세 ${memberGender} 추천 영화`]: 2,
  //   "유튜브 기반 추천 영화": 3,
  // };

  // 더보기 버튼 클릭 처리
  const handleMoreClick = () => {
    let sortType: number | null = null;

    switch (listType) {
      case "선호도기반 추천 영화":
        sortType = 1;
        break;
      case `${memberAge}세 ${memberGender} 추천 영화`:
        sortType = 2;
        break;
      case "유튜브 기반 추천 영화":
        sortType = 3;
        break;
      default:
        break;
    }

    // navigate to the recommendation page with a sort type
    if (sortType) {
      navigate(`/recommend/more?sort=${sortType}`);
    }
  };

  const convertOTTNameToId = (
    ottName: string | null | undefined
  ): number | null => {
    if (!ottName) return null;
    const ottList = [
      { name: "넷플릭스", id: 8 },
      { name: "디즈니플러스", id: 337 },
      { name: "왓챠", id: 97 },
      { name: "애플티비", id: 2 },
      { name: "애플티비플러스", id: 350 },
      { name: "웨이브", id: 356 },
    ];

    const ott = ottList.find((o) => o.name === ottName);
    return ott ? ott.id : null;
  };

  // 영화 데이터 가져오기
  useEffect(() => {
    const loadMovies = async () => {
      let requestParams: any = { page, size: 20 };

      if (listType === "선호도기반 추천 영화" || listType === "1") {
        requestParams = {
          ...requestParams,
          "member-id": memberId,
          type: 1,
        };
      } else if (
        listType === `${memberAge}세 ${memberGender} 추천 영화` ||
        listType === "2"
      ) {
        requestParams = {
          ...requestParams,
          "member-id": memberId,
          type: 2,
        };
      } else if (listType === "유튜브 기반 추천 영화" || listType === "3") {
        requestParams = {
          ...requestParams,
          "member-id": memberId,
          type: 3,
        };
      }

      try {
        const response = await getAllMovies(requestParams);
        const targetOttId = convertOTTNameToId(filterOTT);

        const filteredMovies = response.data.content.filter(
          (movie: MovieType) => {
            if (!targetOttId) return true;
            return movie.ottResDtos.some(
              (ott: OTTType) => ott.ottId === targetOttId
            );
          }
        );
        if (page === 0) {
          // 첫 페이지일 경우 기존 영화 목록을 리셋
          setMovies(filteredMovies);
        } else {
          setMovies((prevMovies) => [...prevMovies, ...filteredMovies]);
        }
      } catch (err) {
        console.log(err);
      }
    };

    loadMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterOTT, listType, memberId]);

  return (
    <>
      <StyledListBtn>
        <Text size="Large" color="White" fontFamily="PyeongChang-Bold">
          {listType}
        </Text>
        {showMoreButton && (
          <StyledBtn
            size="Medium"
            color="Black"
            onClick={() => handleMoreClick()}
          >
            더보기
          </StyledBtn>
        )}
      </StyledListBtn>
      <div className="grid grid-cols-10 gap-4">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieItem key={movie.movieId} movie={movie} />)
        ) : (
          <Text size="Medium" color="Black" fontFamily="PyeongChang-Bold">
            영화가 없습니다.
          </Text>
        )}
      </div>
    </>
  );
};

export default MovieItemList;

const StyledListBtn = styled.div`
  ${FlexRowBetween}
`;

const StyledBtn = styled(Btn)`
  width: 100px;
`;
