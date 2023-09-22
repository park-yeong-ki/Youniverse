import React from "react";

import Wrapper from "../atoms/Wrapper";
import ReviewCreateForm from "../organisms/ReviewCreateForm";

const ReviewCreate = () => {
  return (
    <Wrapper size="Standard" color="WhiteGhost" padding="Medium">
      <ReviewCreateForm />
    </Wrapper>
  );
};

export default ReviewCreate;
