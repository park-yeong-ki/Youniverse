import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { styled } from "styled-components";
import { FlexRowBetween } from "../../commons/style/SharedStyle";

import IconBox from "../atoms/IconBox";

const StyledHeader = styled.div`
  ${FlexRowBetween}
  width: 100%;
  height: 70px;
`;

const Header = () => {

  const navigate = useNavigate();

  const handleToMain = () => {
    navigate("/"); // 메인 페이지로 이동
    console.log('메인으로 이동됐음')
  };

  const handleSideBar = () => {
    console.log("open sidebar");
  };

  return (
    <StyledHeader>
      <div>
        <img src="/assets/Logo/Logo.svg" onClick={handleToMain} />
      </div>
      <IconBox
        Icon={HiMenu}
        size={24}
        color={"white"}
        onClick={handleSideBar}
      />
    </StyledHeader>
  );
};

export default Header;
