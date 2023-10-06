import styled from "styled-components";
import { ReviewType } from "../../pages/recommend/ContentDetailPage";
import Text from "../atoms/Text";
import HashTag from "../atoms/HashTag";

interface ReviewItemProps {
  memberId: number | null;
  review: ReviewType;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ memberId, review }) => {
  const isReviewOwner = memberId === review.memberSimpleResDto.memberId;

  if (isReviewOwner) return null;

  return (
    <ReviewContainer>
      <MemberImage
        src={
          review.memberSimpleResDto.memberImage
            ? review.memberSimpleResDto.memberImage
            : "/assets/DefaultProfile.png"
        }
        alt="memberImg"
      />

      <MemberInfoContainer>
        <InfoContainerTop>
          <ReviewText size="Small" color="Black" fontFamily="YESGothic-Bold">
            {review.memberSimpleResDto.nickname}
          </ReviewText>
          <HashTag size="Standard" color="WhiteGhost">
            ⭐{review.reviewRate}
          </HashTag>
        </InfoContainerTop>
        <ReviewContent>{review.reviewContent}</ReviewContent>
      </MemberInfoContainer>
    </ReviewContainer>
  );
};

export default ReviewItem;

const ReviewContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #000;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

const MemberInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
`;

const MemberImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 10px;
`;

const ReviewText = styled(Text)`
  margin-right: 10px;
  display: inline;
`;

const InfoContainerTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ReviewContent = styled.p`
  margin-top: 5px;
`;
