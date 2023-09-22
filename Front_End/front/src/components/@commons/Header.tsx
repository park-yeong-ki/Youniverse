import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import styled from "styled-components";

import { FlexRowBetween } from "../../commons/style/SharedStyle";
import IconBox from "../atoms/IconBox";
import SideBar from "./SideBar";

const StyledHeader = styled.div`
  ${FlexRowBetween}
  width: 100%;
  height: 70px;
`;

const Header = () => {
  const navigate = useNavigate();

  // Sidebar 상태 추가
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // 메인 페이지로 이동
  const handleToMain = () => {
    navigate("/");
    console.log("메인으로 이동됐음");
  };

  const toggleSidebar = () => {
    // Sidebar 이전 상태를 기반으로 상태 전환
    setIsSidebarOpen((prevState) => !prevState);
    console.log(isSidebarOpen ? "sidebar 닫음" : "sidebar 열었음");
  };

  return (
    <StyledHeader>
      <div>
        <img src="/assets/Logo/Logo.svg" onClick={handleToMain} alt="Logo" />
      </div>
      <IconBox
        Icon={isSidebarOpen ? HiX : HiMenu}
        size={24}
        color={"white"}
        onClick={toggleSidebar}
        style={{ position: 'relative', zIndex: 1100 }} // HiX 아이콘이 사이드바 위에 위치하도록 zIndex 적용
      />
      {/* Sidebar가 표시될 때만 렌더링, */}
      {isSidebarOpen && <SideBar onClose={toggleSidebar} />}
    </StyledHeader>
  );
};

export default Header;
