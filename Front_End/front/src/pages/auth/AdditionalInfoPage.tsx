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
      requestData.append('redirect_uri', 'http://localhost:3000/addinfo');
      requestData.append('grant_type', 'authorization_code');
      //동key
      // requestData.append('client_id', '781680119308-d0jbnhpcmrcj7fb65ls9crj7lh6k7v9q.apps.googleusercontent.com');
      // requestData.append('client_secret', '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');
      // const apiKey = 'AIzaSyC54-nXX1Zj-HFzgqaNrY4ikA4NaIp5IUE HTTP/1.1';
      //소key
      requestData.append('client_id', '776331757143-c17p5tgmtrc53mnrqrst4f5s6ltg3npj.apps.googleusercontent.com');
      requestData.append('client_secret', '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');
      const apiKey = 'AIzaSyAbqPlaSAh5ppO1pOrnOS21vx0mIMGmMfs HTTP/1.1';


      // 토큰을 얻는 POST 요청
      axios.post(tokenUrl, requestData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((response) => {
        const access_token = response.data.access_token;
        console.log('토큰: ', access_token);

        setAccessToken(access_token); // 토큰을 상태 변수에 저장

        const apiHeaders = {
          'Authorization': 'Bearer ' + access_token,
          'Accept': 'application/json'
        };
        
      
        // /** 구독 리스트 불러와 구독 채널의 영상 데이터 가져오기 */
        // // 구독 리스트 요청 
        // axios.get('https://youtube.googleapis.com/youtube/v3/subscriptions', {
        //   params: {
        //     maxResults: 50, // maxResults 파라미터 추가
        //     part: 'snippet', // 필요한 파트 추가
        //     mine: true,
        //     key: apiKey
        //   },  
        //   headers: apiHeaders,
        // })
        // .then((response) => {
        //   // console.log('구독 응답 데이터:', response.data.items);
        //   interface SubscriptionItem {
        //     etag: string;
        //     id: string;
        //     kind: string;
        //     snippet: {
        //       channelId: string;
        //       description: string;
        //       publishedAt: string;
        //       resourceId: {
        //         kind: string;
        //         channelId: string;
        //       };
        //       title: string;
        //     };
        //   }
          
        //   const data: SubscriptionItem[] = response.data.items; // 데이터 배열을 직접 설정
        //   const channelId: string[] = data.map(item => item.snippet.resourceId.channelId);//채널 아이디
        //   const titles: string[] = data.map(item => item.snippet.title);//채널 제목
        //   const description: string[] = data.map(item => item.snippet.description);//채널 설명
        //   console.log("데이터 추출: ", titles, channelId, description);

        //   //채널 안 영상 정보 가져오기
        //   const sendAxiosRequests = async (channelIds: string[]) => {
        //     for (const channelId of channelIds) {
        //       try {
        //         axios.get('https://youtube.googleapis.com/youtube/v3/search', {
        //           params: {
        //             type: 'video',
        //             maxResults: 50,
        //             part: 'snippet',
        //             channelId: channelId, // 각 채널 ID에 대한 요청을 보냅니다.
        //             key: apiKey 
        //           },  
        //           headers: apiHeaders,
        //         }).then((response) => {
        //           // console.log('영상 정보: ', response.data.items)

        //           interface VideoItem      {
        //             "kind": "youtube#searchResult",
        //             "etag": string,
        //             "id": {
        //               "kind": string,
        //               "videoId": string
        //             },
        //             "snippet": {
        //               "channelId": string,
        //               "title": string,
        //               "description": string,
        //               "channelTitle": string
        //             };
        //           }

        //           const data: VideoItem[] = response.data.items;
        //           const videoId: string[] = data.map(item => item.id.videoId);
        //           const titles: string[] = data.map(item => item.snippet.title);
        //           const description: string[] = data.map(item => item.snippet.description);

        //           // 각 인덱스 위치의 항목을 합쳐서 하나의 배열로 만듭니다.
        //           const combinedData: Array<{ videoId: string, title: string, description: string }> = videoId.map((_, index) => ({
        //             videoId: videoId[index],
        //             title: titles[index],
        //             description: description[index]
        //           }));
        //           console.log("채널 영상 추출: ", combinedData);

        //         })
        //         .catch((error) => {
        //           console.error('영상 정보 요청 실패:', error);
        //         });

        //       } catch (error) {
        //         console.error(`Error fetching data for channel ${channelId}:`, error);
        //       }
        //     }

        //   };
        //   sendAxiosRequests(channelId);

        // })
        // .catch((error) => {
        //   console.error('구독 정보 요청 실패:', error);
        // });
        
        /** 내 계정 채널 재생목록, 재생목록의 영상 데이터 가져오기 */
        // 재생목록 요청 
        axios.get('https://youtube.googleapis.com/youtube/v3/channels', {
          params: {
            maxResults: 50, // maxResults 파라미터 추가
            part: 'snippet', // 필요한 파트 추가
            mine: true,
            key: apiKey
          },  
          headers: apiHeaders,
        })
          .then((response) => {
          const MyData = response.data.items[0];
          const Nikname = MyData.snippet.title;
          const description = MyData.snippet.description;
          const channelId = MyData.id;
          console.log("내 계정 데이터: ", Nikname, description, channelId);



            
        })
        .catch((error) => {
          console.error('내 계정 정보 요청 실패:', error);
        });

      })
      .catch((error) => {
        console.error('토큰 요청 실패:', error);
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
