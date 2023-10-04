import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    * {
        padding: 0;
        text-decoration: none;

        /* 기본 고정 폰트 지정 */
        font-family: "YESGothic-Regular";
    }

    /* 임시 배경 */
    html, body {
        width: 100%;
        height: 100%;
        background: linear-gradient(
        180deg,
        #190a37 0%,
        rgba(83, 22, 132, 0.54) 60.42%,
        rgba(194, 180, 222, 0.3) 99.97%,
        rgba(176, 164, 202, 0.25) 99.98%,
        rgba(150, 123, 208, 0.18) 99.99%,
        rgba(145, 114, 211, 0) 100%
  );
    }

    @font-face {
        font-family: 'PyeongChangPeace-Bold';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2206-02@1.0/PyeongChangPeace-Bold.woff2') format('woff2');
        font-weight: 700;
        font-style: normal;
    }
    @font-face {
        font-family: 'PyeongChangPeace-Light';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2206-02@1.0/PyeongChangPeace-Light.woff2') format('woff2');
        font-weight: 300;
        font-style: normal;
    }
    @font-face {
        font-family: 'YESGothic-Regular';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_13@1.0/YESGothic-Regular.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }
    @font-face {
        font-family: 'YESGothic-Bold';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_13@1.0/YESGothic-Bold.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }

    /* 스크롤바 */
    ::-webkit-scrollbar{
        width: 8px;
    }

    /* 스크롤바 막대 설정*/
    ::-webkit-scrollbar-thumb{
        background: linear-gradient(#fff, #ffe498);
        border-radius: 12px; 
    }
    /* 스크롤바 뒷 배경 설정*/
    ::-webkit-scrollbar-track{
        border-radius: 12px; 
        background-color: rgba(0,0,0,0.5);
        overflow: hidden;
    }
`;
