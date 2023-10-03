import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useRecoilValue } from "recoil";
import { UserDetailInfoState } from "../../pages/store/State";
import { getMember } from "../../apis/FrontendApi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  width?: string | number; // 수정
  height?: string | number; // 수정
}

export const options = {
  responsive: false,
  plugins: {
    legend: {
      display: false, // 범례를 숨깁니다.
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
  scales: {
    x: {
      grid: {
        display: false, // x축의 그리드 라인을 숨깁니다.
      },
      ticks: {
        display: true, // x축의 눈금을 숨깁니다.
      },
    },
    y: {
      grid: {
        display: false, // y축의 그리드 라인을 숨깁니다.
      },
      ticks: {
        display: false, // y축의 눈금을 숨깁니다.
      },
    },
  },
  elements: {
    line: {
      tension: 0, // 이 부분은 라인을 곡선 없이 직선으로 만듭니다. 필요에 따라 제거할 수 있습니다.
    },
    point: {
      radius: 5, // 포인트의 크기를 조절합니다. 원하는 크기로 조절하세요.
      backgroundColor: "rgb(255, 249, 200)", // 포인트의 색상입니다. 원하는 색상으로 조절하세요.
    },
  },
};

const LineChart: React.FC<LineChartProps> = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Youtube Keyword Movie Ranks",
        data: [],
        borderColor: "rgb(255, 249, 200)",
        backgroundColor: "#ffffff",
      },
    ],
  });
  const memberId = useRecoilValue(UserDetailInfoState).memberId;

  useEffect(() => {
    const getChartData = async () => {
      try {
        // memberId 가 null 또는 undefined인 경우 함수 실행 중지
        if (memberId == null) {
          console.error("memberId is null or undefined");
          return;
        }
        const response = await getMember(memberId);
        const youtubeKeywords = response.data.youtubeKeywordResDtos;
        const labels = youtubeKeywords.map((k: any) => k.youtubeKeywordName);
        const data = youtubeKeywords.map((k: any) => k.movieRank);

        setChartData({
          labels,
          datasets: [
            {
              label: "Youtube Keyword Movie Ranks",
              data,
              borderColor: "rgb(255, 249, 200)",
              backgroundColor: "#ffffff",
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching the chart data", error);
      }
    };

    getChartData();
  }, [memberId]);

  return <Line options={options} data={chartData} />;
};

export default LineChart;
