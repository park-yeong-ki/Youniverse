import React from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,  // 범례를 숨깁니다.
      },
      title: {
        display: false,
        text: "Chart.js Line Chart",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,  // x축의 그리드 라인을 숨깁니다.
        },
        ticks: {
          display: true,  // x축의 눈금을 숨깁니다.
        }
      },
      y: {
        grid: {
          display: false,  // y축의 그리드 라인을 숨깁니다.
        },
        ticks: {
          display: false,  // y축의 눈금을 숨깁니다.
        }
      }
    },
    elements: {
      line: {
        tension: 0,  // 이 부분은 라인을 곡선 없이 직선으로 만듭니다. 필요에 따라 제거할 수 있습니다.
      },
      point: {
        radius: 5,  // 포인트의 크기를 조절합니다. 원하는 크기로 조절하세요.
        backgroundColor: "rgb(255, 249, 200)"  // 포인트의 색상입니다. 원하는 색상으로 조절하세요.
      }
    },
  };
  

const labels = [
  "키워드1",
  "키워드2",
  "키워드3",
  "키워드4",
  "키워드5",
  "키워드6",
  "키워드7",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [500, 600, 400, 700, 650, 720, 590],
      borderColor: "rgb(255, 249, 200)",
      backgroundColor: "#ffffff",
    },
  ],
};

const LineChart = () => {
  return <Line options={options} data={data} />;
};

export default LineChart;
