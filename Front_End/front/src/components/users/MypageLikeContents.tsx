// 마이페이지에 있는 ㅇㅇ 님이 좋아한 콘텐츠 컴포넌트

import { MY_PAGE_LIKE } from "../../commons/constants/String";
import Text from "../atoms/Text";
import Wrapper from "../atoms/Wrapper";
import MovieItem from "../movies/MovieItem";

const MypageLikeContents = () => {
  return (
    <div>
      <div>
        <Text size="Medium" color="White" fontFamily="PyeongChang-Bold">
          유저{MY_PAGE_LIKE}
        </Text>
        <Text size="Small" color="White" fontFamily="YESGothic-Regular">
          💖 121{}
        </Text>
      </div>
      {/* 좋아한 콘텐츠 Wrapper movieitem 컴포넌트 및 마지막 컴포넌트 수정 @@@ */}
      <Wrapper size="Standard" color="WhiteGhost" padding="Narrow">
        <div className="grid grid-cols-3">
          <MovieItem />
          <MovieItem />
          <MovieItem />
        </div>
      </Wrapper>
    </div>
  );
};

export default MypageLikeContents;
