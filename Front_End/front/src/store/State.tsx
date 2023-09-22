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
  accessToken: string;
};
export const UserInfoState = atom<UserInfo>({
  key: "UserInfoState",
  default: {
    accessToken: "",
  },
  effects_UNSTABLE: [persistAtom],
});
