import { mainAxios } from "../libs/axios";

type UserJoinInfo = {
  email: string | null;
  nickname: string;
  age: number;
  gender: string;
  introduce: string;
  keywordList: number[];
  ottList: number[];
};

export interface UserSearchParams {
  term: string;
  option?: string | null;
  page?: number;
  size?: number;
  nickname?: string;
  keyword?: string;
  total?: string;
}

export interface keywordsParams {
  random?: boolean;
}

/** 회원가입 */
export const postMember = (userJoinInfo: UserJoinInfo) =>
  mainAxios.post(`/members/register`, userJoinInfo, {
    headers: { Accept: "application/json" },
  });

/** 회원정보 수정 */
export const putMember = (memberId: number) =>
  mainAxios.put(`/members/${memberId}`, {
    headers: { Accept: "application/json" },
  });

/** 회원 탈퇴 */
export const deleteMember = (memberId: number) =>
  mainAxios.delete(`/members/${memberId}`, {
    headers: { Accept: "application/json" },
  });

/** 개별 회원조회 */
export const getMember = (memberId: number) =>
  mainAxios.get(`/members/${memberId}`, {
    headers: { Accept: "application/json" },
  });

/** 이메일로 회원조회 */
export const getEmailMember = (email: string) =>
  mainAxios.get(`/members/email/${email}`, {
    headers: { Accept: "application/json" },
  });

/** 전체 회원조회 */
export const getAllMembers = (userSearchParams: UserSearchParams) =>
  mainAxios.get(
    `/members?page=${userSearchParams.page}&size=${userSearchParams.size}`,
    {
      headers: { Accept: "application/json" },
      params: userSearchParams,
    }
  );

// =======================================================

/** 키워드 조회 */
export const getKeyword = (keywordId: number) =>
  mainAxios.get(`/keywords/${keywordId}`, {
    headers: { Accept: "application/json" },
  });

/** 전체 키워드조회 */
export const getAllKeywords = (keywordsParams: keywordsParams) =>
  mainAxios.get(`/keywords`, {
    headers: { Accept: "application/json" },
    params: keywordsParams,
  });

// ======================================================

/** OTT 조회 */
export const getOTT = (ottId: number) =>
  mainAxios.get(`/otts/${ottId}`, {
    headers: { Accept: "application/json" },
  });

/** 전체 OTT조회 */
export const getAllOTTs = () =>
  mainAxios.get(`/otts`, {
    headers: { Accept: "application/json" },
  });

// ==============================

/** 팔로우 등록 */
export const postFollow = () =>
  mainAxios.post(`/follows/register`, {
    headers: { Accept: "application/json" },
  });

/** 팔로우 조회 */
export const getFollow = (followId: number) =>
  mainAxios.get(`/follows/${followId}`, {
    headers: { Accept: "application/json" },
  });

/** 팔로우 전체 조회 */
export const getAllFollows = () =>
  mainAxios.get(`/follows`, {
    headers: { Accept: "application/json" },
  });

/** 팔로우 삭제 */
export const deleteFollow = (followId: number) =>
  mainAxios.delete(`/follows/${followId}`, {
    headers: { Accept: "application/json" },
  });

// ==============================

/** 영화 조회 */
export const getMovie = (movieId: number) =>
  mainAxios.get(`/movies/${movieId}`, {
    headers: { Accept: "application/json" },
  });

/** 영화 전체 조회 */
export const getAllMovies = (filters = {}) =>
  mainAxios.get(`/movies`, {
    params: filters,
    headers: { Accept: "application/json" },
  });

// ========================================

/** 좋아요 등록 */
export const postHeart = (memberId: number, movieId: number) =>
  mainAxios.post(
    `/heart-movies/register`,
    {
      memberId,
      movieId,
    },
    {
      headers: { Accept: "application/json" },
    }
  );

/** 좋아요 조회 */
export const getHeart = (heartMovieId: number) =>
  mainAxios.get(`/heart-movies/${heartMovieId}`, {
    headers: { Accept: "application/json" },
  });

/** 좋아요 삭제 */
export const deleteHeart = (heartMovieId: number) =>
  mainAxios.delete(`/heart-movies/${heartMovieId}`, {
    headers: { Accept: "application/json" },
  });

//====================================================

/** 싫어요 등록 */
export const postHate = (memberId: number, movieId: number) =>
  mainAxios.post(
    `/hate-movies/register`,
    {
      memberId,
      movieId,
    },
    {
      headers: { Accept: "application/json" },
    }
  );

/** 싫어요 조회 */
export const getHate = (hateMovieId: number) =>
  mainAxios.get(`/hate-movies/${hateMovieId}`, {
    headers: { Accept: "application/json" },
  });

/** 싫어요 삭제 */
export const deleteHate = (hateMovieId: number) =>
  mainAxios.delete(`/hate-movies/${hateMovieId}`, {
    headers: { Accept: "application/json" },
  });

//====================================================

/** 인생영화 등록 */
export const postBest = () =>
  mainAxios.post(`/best-movies/register`, {
    headers: { Accept: "application/json" },
  });

/** 인생영화 조회 */
export const getBest = (bestMovieId: number) =>
  mainAxios.get(`/best-movies/${bestMovieId}`, {
    headers: { Accept: "application/json" },
  });

/** 인생영화 삭제 */
export const deletBest = (bestMovieId: number) =>
  mainAxios.delete(`/best-movies/${bestMovieId}`, {
    headers: { Accept: "application/json" },
  });

//==============================================

/** 리뷰 등록 */
export const postReview = (reviewData: {
  memberId: number;
  movieId: number;
  reviewContent: string;
  reviewRate: number;
}) => {
  return mainAxios.post(`/reviews/register`, reviewData, {
    headers: { Accept: "application/json" },
  });
};

/** 리뷰 조회 */
export const getReview = (reviewId: number) =>
  mainAxios.get(`/reviews/${reviewId}`, {
    headers: { Accept: "application/json" },
  });

/** 리뷰 삭제 */
export const deletReview = (reviewId: number) =>
  mainAxios.delete(`/reviews/${reviewId}`, {
    headers: { Accept: "application/json" },
  });

//===============================================
