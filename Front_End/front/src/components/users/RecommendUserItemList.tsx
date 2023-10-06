import React, { useState } from "react";
import { styled } from "styled-components";
import { FlexColBetween } from "../../commons/style/SharedStyle";
import RecommendUserItem from "./RecommendUserItem";
import { RecommendUser } from "../organisms/UserRecommendContainer";

interface recommendListProps {
  users: RecommendUser[];
}

const RecommendUserItemList: React.FC<recommendListProps> = ({ users }) => {
  /** 선택된 사용자의 ID를 저장 */
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  return (
    <StyledCenter>
      {users.map((user) => (
        <RecommendUserItem
          key={user.member_id}
          user={user}
          isSelected={selectedUserId === user.member_id}
          onSelect={() => setSelectedUserId(user.member_id)}
        />
      ))}
    </StyledCenter>
  );
};

export default RecommendUserItemList;

const StyledCenter = styled.div`
  ${FlexColBetween}
  margin-top: 5%;
`;
