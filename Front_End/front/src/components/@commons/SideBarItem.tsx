import React from "react";
import styled from "styled-components";

import Text from "../atoms/Text";
import { FlexColAround } from "../../commons/style/SharedStyle";

interface MenuType {
  name: string;
  path: string;
}

interface SidebarItemProps {
  menu: MenuType;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ menu }) => {
  return (
    <StyledMenu>
      <Text size={"Medium"} color={"White"} fontFamily={"YESGothic-Regular"}>
        {menu.name}
      </Text>
    </StyledMenu>
  );
};

export default SidebarItem;

const StyledMenu = styled.div`
  ${FlexColAround}
  margin: 3rem;
  &:hover {

      // Text 컴포넌트가 p 태그를 사용한다고 가정합니다.
      text-shadow: 0 0 20px rgba(255, 255, 255, 1);

  }
`;
