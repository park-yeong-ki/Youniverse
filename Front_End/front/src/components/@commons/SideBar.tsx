import React, { useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import { FlexColAround } from "../../commons/style/SharedStyle";
import {
  SIDE_BAR_USER_STAR,
  SIDE_BAR_RECOMMEND,
  SIDE_BAR_SEARCH_USER,
  SIDE_BAR_MY_PAGE,
} from "./../../commons/constants/String";
import { ROUTES } from "../../commons/constants/Routes";
import SidebarItem from "./SideBarItem";
import SearchBox from "../organisms/SearchBox";
import GoogleLoginBtn from "./GoogleLoginBtn";
import Text from "../atoms/Text";
import { useResetRecoilState } from "recoil";
import {
  LoginState,
  UserInfoState,
  UserJoinInfoState,
} from "../../pages/store/State";

interface Menu {
  name: string;
  path: string;
}

interface SideBarProps {
  onClose: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const resetUserInfo = useResetRecoilState(UserInfoState);
  const resetUserJoinInfo = useResetRecoilState(UserJoinInfoState);
  const resetLogin = useResetRecoilState(LoginState);

  const handleSearchSubmit = (searchTerm: string) => {
    navigate("/search", { state: { searchTerm } }); // 변경
    onClose();
  };

  // 로그아웃
  const handleLogOut = () => {
    resetUserInfo();
    resetUserJoinInfo();
    resetLogin();
  };

  // 사이드바 외부 클릭 감지를 위한 참조 생성
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  // 사이드바 메뉴 정의
  const menus: Menu[] = [
    { name: SIDE_BAR_USER_STAR, path: ROUTES.MAIN },
    { name: SIDE_BAR_RECOMMEND, path: ROUTES.RECOMMEND },
    { name: SIDE_BAR_SEARCH_USER, path: ROUTES.PROFILE },
    { name: SIDE_BAR_MY_PAGE, path: ROUTES.MYPAGE },
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
        <div>
          <GoogleLoginBtn />
          <SearchBox
            theme="light"
            type="movie"
            onSubmitSearch={handleSearchSubmit}
          />
        </div>

        {/* 메뉴 아이템 렌더링 */}
        <div>
          {menus.map((menu, index) => (
            <Link to={menu.path} key={index} onClick={onClose}>
              <SidebarItem menu={menu} />
            </Link>
          ))}
        </div>

        {/* 로그아웃 */}
        <Text
          size="Small"
          color="White"
          fontFamily="YESGothic-Bold"
          onClick={handleLogOut}
        >
          로그아웃
        </Text>
      </StyledMenu>
    </StyledSidebar>
  );
};

export default SideBar;

// 슬라이드 애니메이션
const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const StyledSidebar = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 30%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  transform: translateX(100%);
  z-index: 1000;
  padding: 20px;

  /* 사이드바가 기본적으로 화면 밖에 위치하도록 설정 */
  transform: translateX(100%);

  /* 사이드바가 열릴 때 슬라이드 인 애니메이션 적용 */
  &.open {
    animation: ${slideIn} 0.2s forwards;
  }
`;

const StyledMenu = styled.div`
  ${FlexColAround}
  margin-top: 80px; /* 메뉴 시작 부분에 마진 추가 */

  /* 로그인 버튼, 검색에 대한 스타일 */
  > div:first-child {
    display: flex; /* 수직 배치를 수평 배치로 변경 */
    flex-direction: column; /* 자식 요소들을 수직 배치 */
    gap: 15px; /* 로그인 버튼과 검색박스 사이의 간격 설정 */

    margin-bottom: 28px; /* 검색박스 아래에 마진 추가 */
    border-bottom: 1px solid #fff; /* 선 추가 */
    padding-bottom: 20px; /* border-bottom 위에 padding 추가하여 공간 확보 */

    /* Google 로그인 버튼에 대한 스타일 */
    > button {
      margin: 10px 0; /* 위아래에 마진 추가 */
    }
  }

  /* 메뉴 아이템 렌더링에 대한 스타일 */
  > div:last-child {
    > a {
      display: block;
      margin-bottom: 28px; /* 메뉴 아이템 간의 간격 추가 */

      /** 호버했을 때 반짝이게 */
      &:hover {
        text-shadow: 0px 0px 20px rgba(255, 255, 255, 0.9);
      }
    }
  }
`;
