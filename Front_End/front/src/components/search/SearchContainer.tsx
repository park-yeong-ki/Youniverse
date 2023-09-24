import { useLocation, useNavigate } from "react-router-dom"; // useNavigate 추가
import { useState } from 'react';

import { SEARCH_PAGE } from "../../commons/constants/String";
import Wrapper from "../atoms/Wrapper";
import SearchBox from "../organisms/SearchBox";
import Text from "../atoms/Text";

const SearchContainer = () => {
  const location = useLocation();
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수를 가져옵니다.

  const initialSearchTerm = location.state?.searchTerm ?? "";
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  // 검색 콜백 함수
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    // 여기에서 추가적인 검색 로직을 수행할 수 있습니다.

    // navigate를 사용하여 현재 경로로 업데이트된 검색어를 포함한 상태를 푸시합니다.
    navigate(location.pathname, { state: { searchTerm: term } });
  };

  return (
    <Wrapper size="Standard" color="WhiteGhost" padding="Medium">
      <Text size="Large" color="Black" fontFamily="YESGothic-Bold">
        {searchTerm} {SEARCH_PAGE}
      </Text>
      <SearchBox theme="dark" onSubmitSearch={handleSearch} />
    </Wrapper>
  );
};

export default SearchContainer;
