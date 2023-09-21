import React from "react";
import styled from "styled-components";
import { HiSearch } from "react-icons/hi";

import { FlexRowBetween } from "./../../commons/style/SharedStyle";
import Dropdown, { OptionType } from "../@commons/Dropdown";
import InputBox, { InputColor } from "../atoms/InputBox";
import Btn, { ButtonColor } from "../atoms/Btn";
import IconBox from "../atoms/IconBox";

// SearchBox에 사용될 prop들의 타입 정의
interface SearchBoxProps {
  theme?: "light" | "dark"; // 테마 타입 (기본값 light)
  type?: "user" | "movie"; // 검색 옵션의 타입 (기본값 user)
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
}) => {
  const { inputColor, btnColor, iconColor } = THEME_STYLES[theme];
  const options = type === "user" ? USER_OPTIONS : MOVIE_OPTIONS;

  return (
    <StyledSearchBox>
      <Dropdown
        options={options}
        theme={theme}
        onSelectedChange={(selected) => console.log(selected)} // 이 부분은 콘솔 로그 대신 원하는 로직으로 변경하세요.

      />
      <InputBox
        placeholder="검색어를 입력하세요"
        type="text"
        color={inputColor}
      />
      <Btn size={"Medium"} color={btnColor}>
        <IconBox Icon={HiSearch} size={24} color={iconColor} />
      </Btn>
    </StyledSearchBox>
  );
};

export default SearchBox;

// 스타일드 컴포넌트: 검색박스 전체 스타일
const StyledSearchBox = styled.div`
  ${FlexRowBetween}

  // 드롭다운, 입력 필드, 검색 버튼의 flex 비율 설정
  & > *:nth-child(1) {
    flex: 2;
  } // Dropdown
  & > *:nth-child(2) {
    flex: 7;
  } // InputBox
  & > *:nth-child(3) {
    flex: 1;
  } // Btn
`;
