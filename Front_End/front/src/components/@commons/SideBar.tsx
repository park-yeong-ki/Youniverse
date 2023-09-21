import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { FlexColAround } from "../../commons/style/SharedStyle";
import {
  SIDE_BAR_USER_STAR,
  SIDE_BAR_RECOMMEND,
  SIDE_BAR_SEARCH_USER,
  SIDE_BAR_MY_PAGE,
} from "./../../commons/constants/String";
import SidebarItem from "./SideBarItem";
import SearchBox from "../organisms/SearchBox";

interface Menu {
  name: string;
  path: string;
}

interface SideBarProps {
  onClose: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ onClose }) => {
  // 사이드바 외부 클릭 감지를 위한 참조 생성
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  // 사이드바 메뉴 정의
  const menus: Menu[] = [
    { name: SIDE_BAR_USER_STAR, path: "/" },
    { name: SIDE_BAR_RECOMMEND, path: "/" },
    { name: SIDE_BAR_SEARCH_USER, path: "/" },
    { name: SIDE_BAR_MY_PAGE, path: "/" },
  ];

  useEffect(() => {
    // 사이드바 외부를 클릭했을 때 처리
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    // 외부 클릭 이벤트 리스너 추가
    document.addEventListener("mousedown", handleClickOutside);
    // 컴포넌트 unmount시 이벤트 리스너 제거
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <StyledSidebar ref={sidebarRef} className="sidebar open">
      <StyledMenu>
        {/* 로그인 버튼, 검색 */}
          <SearchBox theme="light" type="movie" />

        {/* 메뉴 아이템 렌더링 */}
        <div>
          {menus.map((menu, index) => (
            <Link to={menu.path} key={index} onClick={onClose}>
              <SidebarItem menu={menu} />
            </Link>
          ))}
        </div>

        {/* 로그아웃 */}
      </StyledMenu>
    </StyledSidebar>
  );
};

export default SideBar;

const StyledSidebar = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 30%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  transform: translateX(100%);
  z-index: 1000;
  padding: 20px; /* 사이드바 내부의 패딩 추가 */

  &.open {
    transform: translateX(0);
  }
`;

const StyledMenu = styled.div`
  ${FlexColAround}
  margin-top: 80px; /* 메뉴 시작 부분에 마진 추가 */

  /* 로그인 버튼, 검색에 대한 스타일 */
  > div:first-child {
    margin-bottom: 28px; /* 검색박스 아래에 마진 추가 */
    border-bottom: 1px solid #fff; /* 선 추가 */
    padding-bottom: 20px; /* border-bottom 위에 padding 추가하여 공간 확보 */
  }

  /* 메뉴 아이템 렌더링에 대한 스타일 */
  > div:last-child {
    > a {
      display: block;
      margin-bottom: 28px; /* 메뉴 아이템 간의 간격 추가 */

      /* 링크에 대한 스타일 (예: 호버 효과) */
      &:hover {
        color: #fff; /* 링크 호버 시 글자색 변경 */
      }
    }
  }
`;

