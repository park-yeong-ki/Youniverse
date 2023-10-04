import { useRecoilValue, useSetRecoilState } from "recoil";
import axios from 'axios';
import {
  UserInfoState,
} from "../../pages/store/State";
import { useState, useEffect } from 'react';

  const client_id = process.env.REACT_APP_CLIENTID || "";
   
  const client_secret = process.env.REACT_APP_SECRET || "";


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
}, [accessToken, refreshToken, setUserInfo]);

return { isAuthenticated, isChecking };
}
