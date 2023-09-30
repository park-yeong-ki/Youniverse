import { styled } from "styled-components";
import AdditionalForm from "../../components/organisms/AdditionalForm";
import { ADDITIONAL_INFO_PAGE } from "../../commons/constants/String";
import { FlexCenter, FlexColBetween } from "../../commons/style/SharedStyle";
import Text from "../../components/atoms/Text";
import { MainContainer } from "../../commons/style/layoutStyle";
import axios from "axios";

const AdditionalInfoPage = () => {
  const currentURL = window.location.href;
  const urlParams = new URLSearchParams(new URL(currentURL).search);
  const codes: string | null = urlParams.get("code");
  const apiKey = "AIzaSyAbqPlaSAh5ppO1pOrnOS21vx0mIMGmMfs HTTP/1.1";
  const fastURL = "http://127.0.0.1:8000"; //로컬
  // const fastURL = 'http://j9b204.p.ssafy.io/fast';//서버

  // 상태 변수 추가
  let allData: string = "";

  // 문자열을 이어붙이는 함수
  const appendToAllData = (text: string) => {
    allData += ", " + text;
  };

  //fastapi로 요청 보낼 함수
  const sendDataToServer = async () => {
    try {
      const dataToSend = {
        allData: allData,
      };

      const response = await axios.post(fastURL + "/youtube", dataToSend, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        console.log("데이터를 서버로 전송했습니다.");
      } else {
        console.error("서버 응답이 실패했습니다.");
      }
    } catch (error) {
      console.error("데이터를 서버로 보내는 동안 오류 발생:", error);
    }
  };

  // useEffect(() => {
  const tokenUrl = "https://accounts.google.com/o/oauth2/token";
  const requestData = new URLSearchParams();

  if (codes !== null) {
    console.log("code 데이터:", codes);
    requestData.append("code", codes);
    requestData.append("redirect_uri", "http://localhost:3000/addinfo");
    requestData.append("grant_type", "authorization_code");
    //동key
    // requestData.append('client_id', '781680119308-d0jbnhpcmrcj7fb65ls9crj7lh6k7v9q.apps.googleusercontent.com');
    // requestData.append('client_secret', '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');
    // const apiKey = 'AIzaSyC54-nXX1Zj-HFzgqaNrY4ikA4NaIp5IUE HTTP/1.1';
    //소key
    requestData.append(
      "client_id",
      "776331757143-c17p5tgmtrc53mnrqrst4f5s6ltg3npj.apps.googleusercontent.com"
    );
    requestData.append("client_secret", "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");

    // 토큰을 얻는 POST 요청
    axios
      .post(tokenUrl, requestData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        const access_token = response.data.access_token;
        console.log("토큰: ", access_token);

        const apiHeaders = {
          Authorization: "Bearer " + access_token,
          Accept: "application/json",
        };

        /** 1. 구독 리스트 불러와 구독 채널의 영상 데이터 가져오기 */
        // 구독 리스트 요청
        axios
          .get("https://youtube.googleapis.com/youtube/v3/subscriptions", {
            params: {
              maxResults: 50, // maxResults 파라미터 추가
              part: "snippet", // 필요한 파트 추가
              mine: true,
              key: apiKey,
            },
            headers: apiHeaders,
          })
          .then((response) => {
            // console.log('구독 응답 데이터:', response.data.items);
            interface SubscriptionItem {
              etag: string;
              id: string;
              kind: string;
              snippet: {
                channelId: string;
                description: string;
                publishedAt: string;
                resourceId: {
                  kind: string;
                  channelId: string;
                };
                title: string;
              };
            }

            const data: SubscriptionItem[] = response.data.items; // 데이터 배열을 직접 설정
            const channelId: string[] = data.map((item) => item.snippet.resourceId.channelId); //채널 아이디
            const titles: string[] = data.map((item) => item.snippet.title); //채널 제목
            const description: string[] = data.map((item) => item.snippet.description); //채널 설명
            // console.log("데이터 추출: ", titles, channelId, description);

            // 배열을 쉼표로 구분된 하나의 텍스트로 만듭니다.
            const titlesText: string = titles.join(", ");
            const descriptionText: string = description.join(", ");

            // allData에 이어붙입니다.
            appendToAllData(titlesText);
            appendToAllData(descriptionText);

            //채널 안 영상 정보 가져오기
            const sendAxiosRequests = async (channelIds: string[]) => {
              try {
                for (const channelId of channelIds) {
                  axios
                    .get("https://youtube.googleapis.com/youtube/v3/search", {
                      params: {
                        type: "video",
                        maxResults: 50,
                        part: "snippet",
                        channelId: channelId, // 각 채널 ID에 대한 요청을 보냅니다.
                        key: apiKey,
                      },
                      headers: apiHeaders,
                    })
                    .then((response) => {
                      console.log("영상 정보: ", response.data.items);

                      // interface VideoItem {
                      //   kind: "youtube#searchResult";
                      //   etag: string;
                      //   id: {
                      //     kind: string;
                      //     videoId: string;
                      //   };
                      //   snippet: {
                      //     channelId: string;
                      //     title: string;
                      //     description: string;
                      //     channelTitle: string;
                      //   };
                      // }

                      // const data: VideoItem[] = response.data.items;
                      // const videoId: string[] = data.map((item) => item.id.videoId);
                      // const titles: string[] = data.map((item) => item.snippet.title);
                      // const description: string[] = data.map((item) => item.snippet.description);

                      // 배열을 쉼표로 구분된 하나의 텍스트 만들기
                      appendToAllData(response.data.item.snippet.title);
                      appendToAllData(response.data.item.snippet.description);

                      // // 각 인덱스 위치의 항목을 합쳐서 하나의 배열로 만듭니다.
                      // const combinedData: Array<{
                      //   videoId: string;
                      //   title: string;
                      //   description: string;
                      // }> = videoId.map((_, index) => ({
                      //   videoId: videoId[index],
                      //   title: titles[index],
                      //   description: description[index],
                      // }));
                      // console.log("채널 영상 추출: ", combinedData);
                    })
                    .catch((error) => {
                      console.error("영상 정보 요청 실패:", error);
                    });
                }
              } catch (error) {
                console.error(`Error fetching data for channel ${channelId}:`, error);
              }
            };
            sendAxiosRequests(channelId);
          })
          .catch((error) => {
            console.error("구독 정보 요청 실패:", error);
          });

        /** 2. 내 계정 채널 재생목록, 재생목록의 영상 데이터 가져오기 */
        // 계정정보 요청
        axios
          .get("https://youtube.googleapis.com/youtube/v3/channels", {
            params: {
              part: "snippet",
              mine: true,
            },
            headers: apiHeaders,
          })
          .then((response) => {
            const MyData = response.data.items[0];
            // console.log("MyData: ", MyData);
            const Nikname = MyData.snippet.title;
            const description = MyData.snippet.description;
            const channelId = MyData.id;
            console.log("내 계정 데이터: ", Nikname, description, channelId);

            //재생목록 요청
            axios
              .get("https://youtube.googleapis.com/youtube/v3/playlists", {
                params: {
                  maxResults: 50,
                  part: "snippet",
                  channelId: channelId,
                },
                headers: apiHeaders,
              })
              .then((response) => {
                // console.log("플레이리스트: ", response.data.items);
                interface Playlist {
                  etag: string;
                  id: string;
                  kind: string;
                  snippet: {
                    channelId: string;
                    channelTitle: string;
                    description: string;
                    title: string;
                  };
                }
                const data: Playlist[] = response.data.items;
                const playlistId: string[] = data.map((item) => item.id); //플레이리스트 아이디
                const playlistTitle: string[] = data.map((item) => item.snippet.title); //플레이리스트 제목
                console.log("플레이리스트 목록: ", playlistId, playlistTitle);

                //플레이리스트 안 영상 정보 가져오기
                const sendPlaylistRequests = async (playlistIds: string[]) => {
                  // 모든 요청이 완료될 때 상태를 저장할 배열
                  const requestStatus = [];
                  try {
                    for (const playlistId of playlistIds) {
                      if (!playlistId) {
                        console.log(`Skipping playlistId because it is null.`);
                        // console.log("모든 데이터: ", allData);
                        sendDataToServer();
                        continue;
                      }

                      axios
                        .get("https://youtube.googleapis.com/youtube/v3/playlistItems", {
                          params: {
                            type: "video",
                            maxResults: 50,
                            part: "snippet",
                            playlistId: playlistId,
                          },
                          headers: apiHeaders,
                        })
                        .then((response) => {
                          console.log("플레이리스트 영상 정보: ", response.data.items);

                          // interface PlaylistItem {
                          //   kind: "youtube#searchResult";
                          //   etag: string;
                          //   snippet: {
                          //     description: string;
                          //     title: string;
                          //     resourceId: {
                          //       kind: string;
                          //       videoId: string;
                          //     };
                          //   };
                          // }

                          // const data: PlaylistItem[] = response.data.items;
                          // // const videoId: string[] = data.map((item) => item.snippet.resourceId.videoId);
                          // const titles: string[] = data.map((item) => item.snippet.title);
                          // const description: string[] = data.map(
                          //   (item) => item.snippet.description
                          // );

                          // // 배열을 쉼표로 구분된 하나의 텍스트 만들기
                          // allData += ", " + titles.join(", ");
                          // allData += ", " + description.join(", ");
                          appendToAllData(response.data.item.snippet.title);
                          appendToAllData(response.data.item.snippet.description);

                          // // 각 인덱스 위치의 항목을 합쳐서 하나의 배열로 만듭니다.
                          // const combinedData: Array<{
                          //   title: string;
                          //   description: string;
                          // }> = videoId.map((_, index) => ({
                          //   title: titles[index],
                          //   description: description[index],
                          // }));
                          // console.log("플레이리스트 영상 추출: ", combinedData);
                          // console.log("모든 데이터: ", allData);

                          // 요청이 성공한 경우 상태 배열에 추가
                          requestStatus.push("success");
                          // 모든 요청이 완료되었는지 확인
                          const isAllRequestsCompleted =
                            requestStatus.length === playlistIds.length;

                          // 모든 요청이 완료된 경우 sendDataToServer 호출
                          if (isAllRequestsCompleted) sendDataToServer();
                        })

                        .catch((error) => {
                          console.error("플레이리스트 영상 요청 실패:", error);

                          // 요청이 실패한 경우 상태 배열에 추가
                          requestStatus.push("error");
                        });
                    }
                  } catch (error) {
                    console.error(`Error fetching data for playlist ${playlistId}:`, error);
                  }
                };
                sendPlaylistRequests(playlistId);
              })
              .catch((error) => {
                console.error("재생목록 요청 실패:", error);
              });
          })
          .catch((error) => {
            console.error("내 계정 정보 요청 실패:", error);
          });
      })
      .catch((error) => {
        console.error("토큰 요청 실패:", error);
      });
  }
  // }, []);

  return (
    <MainContainer>
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
    </MainContainer>
  );
};

export default AdditionalInfoPage;

export const StyledContainerCenter = styled.div`
  ${FlexCenter}
  height: 100%;
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
