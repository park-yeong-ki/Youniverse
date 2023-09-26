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
  email: string | null;
  nickname: string;
  age: number;
  gender: string;
  introduce: string;
  keywordList: number[];
  ottList: number[];
};

export const UserInfoState = atom<UserInfo>({
  key: "UserInfoState",
  default: {
    accessToken: null,
    refreshToken: null,
  },
  effects_UNSTABLE: [persistAtom],
});

export const UserJoinInfoState = atom<UserJoinInfo>({
  key: "UserJoinInfoState",
  default: {
    email: "",
    nickname: "",
    age: 0,
    gender: "",
    introduce: "",
    keywordList: [],
    ottList: [],
  },
  effects_UNSTABLE: [persistAtom],
});
