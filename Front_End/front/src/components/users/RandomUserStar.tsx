import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMember } from "../../apis/FrontendApi";

interface MemberResponse {
  memberId: number;
}
interface RandomProps {
  className?: string;
}
const RandomUserStar: React.FC = ({ className }: RandomProps) => {
  const [memberId, setMemberId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await getMember(0);

        const memberData: MemberResponse = response.data;
        setMemberId(memberData.memberId);
      } catch (error) {
        console.error("Error fetching member:", error);
      }
    };

    fetchMember();
  }, []);

  const handleButtonClick = () => {
    if (memberId !== null) {
      navigate(`/profile/${memberId}`);
    }
  };

  return (
    <div className={className}>
      <button onClick={handleButtonClick}>⭐</button>
    </div>
  );
};

export default RandomUserStar;
