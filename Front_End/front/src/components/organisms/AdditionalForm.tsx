import React, { ChangeEvent, useState } from "react";
import { useSetRecoilState } from "recoil";
import { styled } from "styled-components";
import { UserJoinInfoState } from "../../pages/store/State";
import {
  ADDITIONAL_INFO_NICKNAME,
  ADDITIONAL_INFO_NICKNAME_PLACEHOLDER,
  ADDITIONAL_INFO_GENDER,
  ADDITIONAL_INFO_GENDER_F,
  ADDITIONAL_INFO_GENDER_M,
  ADDITIONAL_INFO_AGE,
  ADDITIONAL_INFO_AGE_PLACEHOLDER,
  ADDITIONAL_INFO_INTRODUCE,
  ADDITIONAL_INFO_INTRODUCE_PLACEHOLDER,
  SAVE,
} from "../../commons/constants/String";
import {
  FlexCenter,
  FlexColBetween,
  FlexRowBetween,
} from "../../commons/style/SharedStyle";
import Wrapper from "../atoms/Wrapper";
import InputBox from "../atoms/InputBox";
import Btn from "../atoms/Btn";

const AdditionalForm = () => {
  const [nickName, setNickName] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [gender, setGender] = useState<string>("");
  const [introduction, setIntroduction] = useState<string>("");

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setter(event.target.value);
    };

  const handleGenderClick = (genderValue: string) => {
    setGender((prev) => (prev === genderValue ? "" : genderValue));
  };

  const setUserJoinInfo = useSetRecoilState(UserJoinInfoState);

  const handleSaveClick = () => {
    setUserJoinInfo((prev) => ({
      ...prev,
      nickName,
      age,
      gender,
      introduction,
    }));
  };

  return (
    <StyledStandardWhiteGhostWrapper
      size="Standard"
      color="WhiteGhost"
      padding="Medium"
    >
      <StyledContainerBetweenCol>
        <StyledContainerRowBetween>
          <StyledLabelContainer>
            {ADDITIONAL_INFO_NICKNAME}
          </StyledLabelContainer>
          <StyledInputContainer>
            <StyledClearInput
              type="text"
              placeholder={ADDITIONAL_INFO_NICKNAME_PLACEHOLDER}
              value={nickName}
              onChange={handleChange(setNickName)}
            />
          </StyledInputContainer>
        </StyledContainerRowBetween>
        <StyledContainerRowBetween>
          <StyledLabelContainer>{ADDITIONAL_INFO_GENDER}</StyledLabelContainer>
          <StyledInputContainer>
            <StyledFemaleContainer>
              <Btn
                size="Medium"
                color={gender === ADDITIONAL_INFO_GENDER_F ? "Black" : "White"}
                onClick={() => handleGenderClick(ADDITIONAL_INFO_GENDER_F)}
              >
                {ADDITIONAL_INFO_GENDER_F}
              </Btn>
            </StyledFemaleContainer>
            <StyledMaleContainer>
              <Btn
                size="Medium"
                color={gender === ADDITIONAL_INFO_GENDER_M ? "Black" : "White"}
                onClick={() => handleGenderClick(ADDITIONAL_INFO_GENDER_M)}
              >
                {ADDITIONAL_INFO_GENDER_M}
              </Btn>
            </StyledMaleContainer>
          </StyledInputContainer>
        </StyledContainerRowBetween>
        <StyledContainerRowBetween>
          <StyledLabelContainer>{ADDITIONAL_INFO_AGE}</StyledLabelContainer>
          <StyledInputContainer>
            <StyledClearInput
              type="number"
              placeholder={ADDITIONAL_INFO_AGE_PLACEHOLDER}
              value={age}
              onChange={(e) => setAge(e.target.valueAsNumber)}
            />
          </StyledInputContainer>
        </StyledContainerRowBetween>
        <StyledContainerRowBetween>
          <StyledLabelContainer>
            {ADDITIONAL_INFO_INTRODUCE}
          </StyledLabelContainer>
          <StyledInputContainer>
            <StyledTextArea
              id="introduction"
              value={introduction}
              placeholder={ADDITIONAL_INFO_INTRODUCE_PLACEHOLDER}
              onChange={handleChange(setIntroduction)}
              maxLength={30}
            ></StyledTextArea>
          </StyledInputContainer>
        </StyledContainerRowBetween>
        <StyledContainerCenter>
          <StyledSaveButton
            size="Medium"
            color="Black"
            onClick={handleSaveClick}
          >
            {SAVE}
          </StyledSaveButton>
        </StyledContainerCenter>
      </StyledContainerBetweenCol>
    </StyledStandardWhiteGhostWrapper>
  );
};

export default AdditionalForm;

const StyledStandardWhiteGhostWrapper = styled(Wrapper)`
  ${FlexCenter}
  width: 100%;
  margin: 0 auto;
`;

const StyledContainerCenter = styled.div`
  ${FlexCenter}
`;

const StyledContainerBetweenCol = styled.div`
  ${FlexColBetween}
  height:500px;
  width: 70%;
`;

const StyledContainerRowBetween = styled.div`
  ${FlexRowBetween}
  width:100%;
`;

const StyledFemaleContainer = styled.div`
  width: 48%;
`;

const StyledMaleContainer = styled.div`
  width: 48%;
`;

const StyledLabelContainer = styled.div`
  width: 25%;
`;

const StyledInputContainer = styled.div`
  ${FlexRowBetween}
  width: 70%;
`;

const StyledClearInput = styled(InputBox)`
  padding: 5px 10px;
`;

export const StyledSaveButton = styled(Btn)`
  width: 200px;
`;

export const StyledTextArea = styled.textarea`
  width: 100%;
  height: 52px;
  font-size: 16px;
  font-family: "YESGothic-Regular";
  border-radius: 12px;
  border: none;
  resize: none;
  padding: 5px 10px;
  box-sizing: border-box;
`;
