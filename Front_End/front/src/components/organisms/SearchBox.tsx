import React, { useState } from "react";
import styled from "styled-components";
import { HiSearch } from "react-icons/hi";

import { SEARCH_PLACEHOLDER } from "./../../commons/constants/String";
import { FlexCenter } from "./../../commons/style/SharedStyle";
import Dropdown from "../@commons/Dropdown";
import InputBox, { InputColor } from "../atoms/InputBox";
import Btn, { ButtonColor } from "../atoms/Btn";
import IconBox from "../atoms/IconBox";

// SearchBox에 사용될 prop들의 타입 정의
interface SearchBoxProps {
  theme?: "light" | "dark"; // 테마 타입 (기본값 light)
  type?: "user" | "movie"; // 검색 옵션의 타입 (기본값 user)
  onSearch: (term: string, option: string | null) => void; // 은경 반영
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
  { label: "전체", value: "all" },
  { label: "닉네임", value: "nickname" },
  { label: "키워드", value: "keyword" },
];

const MOVIE_OPTIONS = [
  { label: "전체", value: "all" },
  { label: "제목", value: "title" },
  { label: "감독", value: "director" },
  { label: "배우", value: "actor" },
];

const SearchBox: React.FC<SearchBoxProps> = ({
  theme = "light",
  type = "user",
  onSearch, // 은경 반영
}) => {
  const [term, setTerm] = useState(""); // 은경 반영
  const [selectedOption, setSelectedOption] = useState(null); // 은경 반영
  const { inputColor, btnColor, iconColor } = THEME_STYLES[theme];
  const options = type === "user" ? USER_OPTIONS : MOVIE_OPTIONS;

  const handleSearchClick = () => {
    onSearch(term, selectedOption);
  };

  return (
    <StyledSearchBox>
      <Dropdown
        options={options}
        theme={theme}
        onSelectedChange={(selected) => console.log(selected)} // 이 부분은 콘솔 로그 대신 원하는 로직으로 변경하세요.
      />
      <InputBox
        placeholder={SEARCH_PLACEHOLDER}
        type="text"
        color={inputColor}
        value={term} // 은경 반영
        onChange={(e) => setTerm(e.target.value)} // 은경 반영
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
