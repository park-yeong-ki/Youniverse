import { styled } from "styled-components";
import AdditionalForm from "../../components/organisms/AdditionalForm";
import { ADDITIONAL_INFO_PAGE } from "../../commons/constants/String";
import { FlexCenter, FlexColBetween } from "../../commons/style/SharedStyle";
import Text from "../../components/atoms/Text";
import axios from 'axios';
import { useEffect, useState } from "react";

const AdditionalInfoPage = () => {

  const currentURL = window.location.href;
  const urlParams = new URLSearchParams(new URL(currentURL).search);
  const codes: string | null = urlParams.get("code");

  // 상태 변수 추가
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenUrl = 'https://accounts.google.com/o/oauth2/token';
    const requestData = new URLSearchParams();

    if (codes !== null) {
      console.log("code 데이터:", codes);

      requestData.append('code', codes);
      requestData.append('client_id', '781680119308-d0jbnhpcmrcj7fb65ls9crj7lh6k7v9q.apps.googleusercontent.com');
      requestData.append('client_secret', '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');
      requestData.append('redirect_uri', 'http://localhost:3000/addinfo');
      requestData.append('grant_type', 'authorization_code');

      // 토큰을 얻는 POST 요청
      axios.post(tokenUrl, requestData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((response) => {
        const access_token = response.data.access_token;
        console.log('응답 데이터:', access_token);

        setAccessToken(access_token); // 토큰을 상태 변수에 저장
      
      
         // 토큰으로 구독리스트 요청
        axios.get('https://youtube.googleapis.com/youtube/v3/subscriptions', {
          params: {
            maxResults: 5, // maxResults 파라미터 추가
            part: 'snippet', // 필요한 파트 추가
            mine: true,
            key: 'AIzaSyC54-nXX1Zj-HFzgqaNrY4ikA4NaIp5IUE HTTP/1.1'
          },  
          headers: {
            'Authorization': 'Bearer '+access_token,
            'Accept': 'application/json'
          },
        })
        .then((response) => {
          console.log('구독 응답 데이터:', response.data.items);
        })
        .catch((error) => {
          console.error('구독 요청 실패:', error);
        });
        
      
      })
      .catch((error) => {
        console.error('요청 실패:', error);
      });
    }
  }, [codes]);

    return (
      <StyledContainerCenter>
        <StyledContainerBetweenCol>
          <Text size="Large" color="White" fontFamily="PyeongChang-Bold">
            {ADDITIONAL_INFO_PAGE}
          </Text>
          <StyledForm>
            <AdditionalForm />
          </StyledForm>
        </StyledContainerBetweenCol>
      </StyledContainerCenter>
    );
  };

export default AdditionalInfoPage;

export const StyledContainerCenter = styled.div`
  ${FlexCenter}
  height: 100vh;
`;

export const StyledContainerBetweenCol = styled.div`
  ${FlexColBetween};
  height: 80%;
`;

export const StyledForm = styled.div`
  ${FlexCenter}
  height: 80%;
  width: 100%;
`;
