import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  UserDetailInfoState,
  UserJoinInfoState,
} from "./../../pages/store/State";
import styled from "styled-components";
import { FlexRowBetween } from "../../commons/style/SharedStyle";
import Btn from "../atoms/Btn";
import Text from "../atoms/Text";
import MovieItem from "./MovieItem";
import { MovieType, OTTType } from "../../types/MovieType";
import { getAllMovies } from "../../apis/FrontendApi";

type Props = {
  filterOTT?: string | null;
  listType?: string | null;
  movies?: MovieType[];
  showMoreButton?: boolean; // 더보기 버튼 더보기 페이지에는 안보여야 하니까
  useSlider?: boolean;
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

const sliderSettings = {
  infinite: true,
  slidesToShow: 8, // 한 번에 보여줄 아이템 수
  swipeToSlide: true,
  autoplay: true, // 자동 캐러셀
  autoplaySpeed: 3000,
  arrows: true, // 좌,우 버튼
  pauseOnHover: true, // hover시 정지
  // 다른 설정들도 추가 가능
};

const MovieItemList: React.FC<Props> = ({
  filterOTT,
  listType,
  movies: propMovies = [],
  showMoreButton,
}) => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<MovieType[]>([]);

  const memberId = useRecoilValue(UserDetailInfoState).memberId;
  const memberAge = useRecoilValue(UserJoinInfoState).age;
  const memberGender = useRecoilValue(UserJoinInfoState).gender;

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

  useEffect(() => {
    let requestParams: any = { page: 0, size: 20 };

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

    getAllMovies(requestParams)
      .then((response) => {
        console.log("API Response:", response);

        const targetOttId = convertOTTNameToId(filterOTT);

        const filteredMovies = response.data.content.filter(
          (movie: MovieType) => {
            if (!targetOttId) return true;
            return movie.ottResDtos.some(
              (ott: OTTType) => ott.ottId === targetOttId
            );
          }
        );

        console.log("Filtered Movies:", filteredMovies);
        setMovies(filteredMovies);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterOTT, listType, memberId]);

  return (
    <>
      {/* {filterOTT} */}
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
      <Slider {...sliderSettings}>
        {movies.map((movie) => (
          <MovieItem key={movie.movieId} movie={movie} />
        ))}
      </Slider>
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
