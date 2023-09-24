import React, { useState } from "react";
import { styled } from "styled-components";
import FollowUserItem from "./FollowUserItem";
import { FlexColBetween } from "../../commons/style/SharedStyle";

type User = {
  id: number;
  nickname: string;
  image: string;
  hashtags: string[];
};

interface Props {
  users: User[];
}

const FollowUserItemList: React.FC<Props> = ({ users }) => {
  /** 선택된 사용자의 ID를 저장 */
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  return (
    <StyledCenter>
      {users.map((user) => (
        <FollowUserItem
          key={user.id}
          user={user}
          isSelected={selectedUserId === user.id}
          onSelect={() => setSelectedUserId(user.id)}
        />
      ))}
    </StyledCenter>
  );
};

export default FollowUserItemList;

const StyledCenter = styled.div`
  ${FlexColBetween}
`;
