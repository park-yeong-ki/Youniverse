import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

/** 로그인 여부 저장 */
export const LoginState = atom<boolean>({
  key: "LoginState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

/** 데이터 분석 여부 저장 */
export const DataState = atom<boolean>({
  key: "DataState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

/** 멤버 아이디 저장 */
export const MemberIdState = atom<number | null>({
  key: "MemberIdState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

/** 유저 정보 저장 */

type UserInfo = {
  accessToken: string | null;
  refreshToken: string | null;
  email: string | null;
  image: string | null;
};

type UserDetailInfo = {
  nickname: string | null;
  memberId: number | null;
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

/** 프로필 조회 컴포넌트 상태 저장 */
export const SelectStatusState = atom<string>({
  key: "SelectStatusState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const UserInfoState = atom<UserInfo>({
  key: "UserInfoState",
  default: {
    accessToken: null,
    refreshToken: null,
    email: null,
    image: null,
  },
  effects_UNSTABLE: [persistAtom],
});

export const UserDetailInfoState = atom<UserDetailInfo>({
  key: "UserDetailInfoState",
  default: {
    nickname: null,
    memberId: null,
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
