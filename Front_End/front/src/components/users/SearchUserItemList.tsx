import React, { useState } from "react";
import { styled } from "styled-components";
import SearchUserItem from "./SearchUserItem";
import { FlexColBetween } from "../../commons/style/SharedStyle";
import { User } from "../search/UserSearchContainer";

interface Props {
  users: User[];
}

const SearchUserItemList: React.FC<Props> = ({ users }) => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  return (
    <StyledCenter>
      {users.map((user) => (
        <SearchUserItem
          key={user.memberId}
          user={user}
          isSelected={selectedUserId === user.memberId}
          onSelect={() => setSelectedUserId(user.memberId)}
        />
      ))}
    </StyledCenter>
  );
};

export default SearchUserItemList;

const StyledCenter = styled.div`
  ${FlexColBetween}
`;
