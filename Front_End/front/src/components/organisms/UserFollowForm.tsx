import React, { useState, useEffect } from "react";
import axios from "axios";
import FollowUserItemList from "../users/FollowUserItemList";

type User = {
  id: number;
  nickname: string;
  image: string;
  hashtags: string[];
};

const UserFollowForm = () => {
  // 상위 컴포넌트에서 사용자의 ID와 팔로잉/팔로우 기준 받아오는 코드 필요
  const [followUserList, setfollowUserList] = useState<User[]>([]);
  useEffect(() => {
    const getFollowUsers = async () => {
      try {
        const response = await axios.get("api 주소");
        setfollowUserList(response.data.users);
      } catch (error) {
        console.error("팔로우 리스트 가져오기 실패: ", error);
      }
    };

    getFollowUsers();
  }, []);

  return (
    <div>
      <FollowUserItemList users={followUserList} />
    </div>
  );
};

export default UserFollowForm;
