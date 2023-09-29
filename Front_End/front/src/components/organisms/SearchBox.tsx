import React, { useState } from "react";
import styled from "styled-components";
import { HiSearch } from "react-icons/hi";

import {
  SEARCH_PLACEHOLDER,
  DROP_DOWN_ALL,
  DROP_DOWN_NICKNAME,
  DROP_DOWN_KEYWORD,
  DROP_DOWN_DIRECTOR,
  DROP_DOWN_TITLE,
  DROP_DOWN_ACTOR,
} from "./../../commons/constants/String";
import { FlexCenter } from "./../../commons/style/SharedStyle";
import Dropdown from "../@commons/Dropdown";
import InputBox, { InputColor } from "../atoms/InputBox";
import Btn, { ButtonColor } from "../atoms/Btn";
import IconBox from "../atoms/IconBox";

// SearchBox에 사용될 prop들의 타입 정의
interface SearchBoxProps {
  theme?: "light" | "dark"; // 테마 타입 (기본값 light)
  type?: "user" | "movie"; // 검색 옵션의 타입 (기본값 user)
  onSearch?: (term: string, option: string | null) => void;
  onSubmitSearch?: (term: string) => void; // 추가
}

// 테마에 따른 스타일 값을 저장하는 객체
type ThemeStyle = {
  inputColor: InputColor;
  btnColor: ButtonColor;
  iconColor: string;
};

const THEME_STYLES: Record<"light" | "dark", ThemeStyle> = {
  light: {
    inputColor: "WhiteStroke",
    btnColor: "White",
    iconColor: "black",
  },
  dark: {
    inputColor: "BlackStroke",
    btnColor: "Black",
    iconColor: "white",
  },
};

const USER_OPTIONS = [
  { label: DROP_DOWN_ALL, value: "total" },
  { label: DROP_DOWN_NICKNAME, value: "nickname" },
  { label: DROP_DOWN_KEYWORD, value: "keyword" },
];

const MOVIE_OPTIONS = [
  { label: DROP_DOWN_ALL, value: "all" },
  { label: DROP_DOWN_TITLE, value: "title" },
  { label: DROP_DOWN_DIRECTOR, value: "director" },
  { label: DROP_DOWN_ACTOR, value: "actor" },
];

const SearchBox: React.FC<SearchBoxProps> = ({
  theme = "light",
  type = "user",
  onSearch,
  onSubmitSearch,
}) => {
  const [term, setTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const { inputColor, btnColor, iconColor } = THEME_STYLES[theme];
  const options = type === "user" ? USER_OPTIONS : MOVIE_OPTIONS;

  const handleSearchClick = () => {
    console.log(`Search term: ${term}, Option: ${selectedOption}`);
    onSubmitSearch?.(term); // 상위 컴포넌트로 검색 텍스트 전달
    onSearch?.(term, selectedOption);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <StyledSearchBox>
      <Dropdown
        options={options}
        theme={theme}
        onSelectedChange={(selected) => {
          setSelectedOption(selected?.value ?? null); // 선택된 값이 없다면 null로 설정
        }}
      />
      <InputBox
        placeholder={SEARCH_PLACEHOLDER}
        type="text"
        color={inputColor}
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        onKeyPress={handleKeyPress} // 엔터 키에 대한 이벤트 핸들러 추가
      />
      <Btn size={"Medium"} color={btnColor} onClick={handleSearchClick}>
        <IconBox Icon={HiSearch} size={24} color={iconColor} />
      </Btn>
    </StyledSearchBox>
  );
};

export default SearchBox;

// 검색박스 전체 스타일
const StyledSearchBox = styled.div`
  ${FlexCenter}

  // 드롭다운, 입력 필드, 검색 버튼의 flex 비율 설정
  & > *:nth-child(1) {
    flex: 2;
    margin-right: 8px; // 드롭다운의 오른쪽 마진 추가
  } // Dropdown
  & > *:nth-child(2) {
    flex: 7;
    margin-right: 8px; // 입력 필드의 오른쪽 마진 추가
  } // InputBox
  & > *:nth-child(3) {
    width: 44px;
  } // Btn
`;
