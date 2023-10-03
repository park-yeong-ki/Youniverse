import { useRecoilValue, useSetRecoilState } from "recoil";
import axios from 'axios';
import {
  UserInfoState,
} from "../../pages/store/State";
import jwtDecode from 'jwt-decode';
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

type DecodedToken = {
  exp: number;
};

export function useAuth() {
  const accessToken = useRecoilValue(UserInfoState).accessToken;
  const refreshToken = useRecoilValue(UserInfoState).refreshToken;
  const setUserInfo = useSetRecoilState(UserInfoState);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  const isTokenExpired = (): boolean => {
    if(!accessToken) {
      return false;
    }
    const decodedToken = jwtDecode(accessToken) as DecodedToken;  
    const expirationTime = decodedToken.exp; //토큰 만료시간이 초 단위라서
    const now = Date.now() / 1000; // 초 단위로 변환
    return now > expirationTime; //토큰 만료시 true
  };

  useEffect(() => {
    async function checkAuthentication() {
        if (!accessToken) { //atk없으면
            setIsAuthenticated(false);
            setIsChecking(false);
            return;
        }
        const url = `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`;
        try {
            if (!isTokenExpired()) { //atk 만료안되었으면
                await axios.get(url);
                setIsAuthenticated(true);
            } else if (refreshToken) { //atk 만료되었으면
                const data = {
                    client_id: client_id,
                    client_secret: client_secret,
                    refresh_token: refreshToken,
                    grant_type: "refresh_token",
                };
                const response = await axios.post(`https://oauth2.googleapis.com/token`, new URLSearchParams(data));
                setUserInfo((prev) => ({ ...prev, accessToken: response.data.access_token }));
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        } catch (error) {
            setIsAuthenticated(false);
        }
        setIsChecking(false);
    }
    checkAuthentication();
}, [accessToken, refreshToken]);

return { isAuthenticated, isChecking };
}
