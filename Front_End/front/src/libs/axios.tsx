import axios from "axios";

export const mainAxios = axios.create({
  // baseURL: `https://j9b204.p.ssafy.io/api`,
  baseURL: `http://localhost:8080`,
});
