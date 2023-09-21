import React, { useState } from "react";

import styled from "styled-components";
import Text from "../atoms/Text";
import {
  FlexCenter,
  FlexColBetween,
  FlexRowBetween,
} from "../../commons/style/SharedStyle";
import HashTag from "../atoms/HashTag";
import Btn from "../atoms/Btn";

const MovieItem = () => {
  const [likeStatus, setLikeStatus] = useState(false);
  const [recommendStatus, setRecommendStatus] = useState(false);

  const handleLikePush = () => {
    if (likeStatus === false) {
      console.log("좋아요 버튼을 눌렀어요");
      setLikeStatus(true);
      // 여기에 좋아요 버튼 눌렀을 때, axios 요청
    } else if (likeStatus === true) {
      console.log("좋아요 취소 버튼을 눌렀어요");
      setLikeStatus(false);
      // 여기에 좋아요 취소 버튼 눌렀을 때, axios 요청
    }
  };

  const handleRecommendPush = () => {
    if (recommendStatus === false) {
      console.log("추천받지 않을래요 버튼을 눌렀어요");
      setRecommendStatus(true);
      // 여기에 추천받지 않을래요 버튼 눌렀을 때, axios 요청
    } else if (recommendStatus === true) {
      console.log("다시 추천해주세요 버튼을 눌렀어요");
      setRecommendStatus(false);
      // 여기에 다시 추천해주세요 버튼 눌렀을 때, axios 요청
    }
  };
  return (
    <StyledCardWrapper>
      <StyledMoviePoster src="https://www.themoviedb.org/t/p/w440_and_h660_face/w7eApyAshbepBnDyYRjSeGyRHi2.jpg" />
      {/* hover이거나 focus가 되어있을 때 적용시킬 부분 */}
      <StyledCardHover>
        <StyledDetailOut>
          {/* focus가 되어있을 때는 Large / 아닐 때는 Medium */}
          <Text size="Large" color="White" fontFamily="PyeongChang-Bold">
            엘리멘탈
          </Text>
          <Text size="Small" color="White" fontFamily="YESGothic-Regular">
            평점4.0
          </Text>
          <Text size="Small" color="White" fontFamily="YESGothic-Regular">
            러닝타임
          </Text>
          <StyledDetailInCol>
            <StyledDetailInRow>
              {/* for문 적용하기 (데이터 어떻게 오는지 확인 후) */}
              <HashTag size="Standard" color="WhiteGhost">
                # 키워드
              </HashTag>
              <HashTag size="Standard" color="WhiteGhost">
                # 키워드
              </HashTag>
              <HashTag size="Standard" color="WhiteGhost">
                # 키워드
              </HashTag>
            </StyledDetailInRow>
          </StyledDetailInCol>
          <StyledDetailInCol>
            {likeStatus === false ? (
              <Btn size="Circle" color="White" onClick={handleLikePush}>
                💖
              </Btn>
            ) : (
              <Btn size="Circle" color="White" onClick={handleLikePush}>
                ✅
              </Btn>
            )}
            {recommendStatus === false ? (
              <Btn size="X-Small" color="Black" onClick={handleRecommendPush}>
                추천받지 않을래요
              </Btn>
            ) : (
              <Btn size="X-Small" color="White" onClick={handleRecommendPush}>
                다시 추천해주세요
              </Btn>
            )}
          </StyledDetailInCol>
        </StyledDetailOut>
      </StyledCardHover>
    </StyledCardWrapper>
  );
};

export default MovieItem;

/** 영화 포스터 Img 스타일 */
const StyledMoviePoster = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
`;

/** 영화 카드 Wrap */
const StyledCardWrapper = styled.div`
  --card-width: 20rem;
  width: var(--card-width);
  height: calc(var(--card-width) * 1.3);
  background-color: #ccc;
  border-radius: 0.75rem;
  overflow: hidden;

  position: relative;
`;

/** hover 혹은 focus일 때 영화 정보 */
const StyledCardHover = styled.div`
  ${FlexCenter}
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  padding: 0.75rem;
  box-sizing: border-box;

  position: absolute;
  top: 0;
  left: 0;
`;

/** 영화 정보 1차 Wrap */
const StyledDetailOut = styled.div`
  ${FlexColBetween}
  width: 100%;
  height: 80%;
  text-align: center;
`;

/** 영화 정보 2차 Wrap */
const StyledDetailInCol = styled.div`
  ${FlexColBetween}
  width: 60%;
  text-align: center;
`;

/** 해시태그 가로 정렬 ~~~수정필요 */
const StyledDetailInRow = styled.div`
  ${FlexRowBetween}
  width: 60%;
  text-align: center;
  flex-wrap: wrap;
`;
