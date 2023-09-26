import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

/** 로그인 여부 저장 */
export const LoginState = atom<boolean>({
  key: "LoginState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

/** 유저 정보 저장 */

type UserInfo = {
  accessToken: string | null;
  refreshToken: string | null;
};

type UserJoinInfo = {
  accessToken: string | null;
  refreshToken: string | null;
  email: string | null;
  nickName: string;
  age: number;
  gender: string;
  introduction: string;
  keywords: string[];
  OTTs: string[];
};

export const UserInfoState = atom<UserInfo>({
  key: "UserInfoState",
  default: {
    accessToken: "",
    refreshToken: "",
  },
  effects_UNSTABLE: [persistAtom],
});

export const UserJoinInfoState = atom<UserJoinInfo>({
  key: "UserJoinInfoState",
  default: {
    accessToken: "",
    refreshToken: "",
    email: "",
    nickName: "",
    age: 0,
    gender: "",
    introduction: "",
    keywords: [],
    OTTs: [],
  },
  effects_UNSTABLE: [persistAtom],
});
