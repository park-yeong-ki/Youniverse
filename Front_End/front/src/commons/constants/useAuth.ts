import { useRecoilValue, useSetRecoilState } from "recoil";
import axios from 'axios';
import {
  UserInfoState,
} from "../../pages/store/State";
import { useState, useEffect } from 'react';


  // 소key
  // const client_id =
  //   "776331757143-c17p5tgmtrc53mnrqrst4f5s6ltg3npj.apps.googleusercontent.com";
  // const client_secret = "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";
  
  // 동key
  // const client_id =
  //   "781680119308-d0jbnhpcmrcj7fb65ls9crj7lh6k7v9q.apps.googleusercontent.com";
  // const client_secret = "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";
  
  // 동key2
  const client_id =
    "515621990572-qofqid3d40c2u7t7in2n5gjmf4hg4tre.apps.googleusercontent.com";
  const client_secret = "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";

export function useAuth() {
  const accessToken = useRecoilValue(UserInfoState).accessToken;
  const refreshToken = useRecoilValue(UserInfoState).refreshToken;
  const setUserInfo = useSetRecoilState(UserInfoState);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  // console.log("accessToken: ", accessToken)

  useEffect(() => {
    // console.log("accessToken(UseEffect진입): ", accessToken)
    async function checkAuthentication() {
      // console.log("accessToken(checkAuthentication): ", accessToken)
        if (!accessToken) { //atk없으면
            setIsAuthenticated(false);
            setIsChecking(false);
            return;
        }
        const url = `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`;
        try {
          await axios.get(url);
          setIsAuthenticated(true);
        } catch (error) {
            if (refreshToken) {
                console.log("rtk로 재발급 O 진입");
                const data = {
                    client_id: client_id,
                    client_secret: client_secret,
                    refresh_token: refreshToken,
                    grant_type: "refresh_token",
                };
                try {
                    const response = await axios.post(`https://oauth2.googleapis.com/token`, new URLSearchParams(data));
                    setUserInfo((prev) => ({ ...prev, accessToken: response.data.access_token }));
                    setIsAuthenticated(true);
                } catch (error) {
                    console.log("catch 진입 (refresh token error)");
                    console.log("error log: {}", error);
                    setIsAuthenticated(false);
                }
            } else {
                console.log("else 진입");
                setIsAuthenticated(false);
            }
        }
      setIsChecking(false);
  }
  checkAuthentication();
}, [accessToken, refreshToken]);

return { isAuthenticated, isChecking };
}
