import axios from "axios";

export const mainAxios = axios.create({
  baseURL: `https://j9b204.p.ssafy.io/api`,
  // baseURL: `http://localhost:8080`,
});

export const fastApiAxios = axios.create({
  baseURL: `https://j9b204.p.ssafy.io/fast`,
  // baseURL: `http://localhost:8000`,
});
