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
  width?: string | number;
  height?: string | number;
}

// YoutubeKeyword 타입을 정의
interface YoutubeKeyword {
  youtubeKeywordName: string;
  movieRank: number;
}

interface Dataset {
  data: number[];
}

interface MetaData {
  data: any[]; // 여기서 any 타입을 적절한 타입으로 대체할 수 있습니다.
}

interface ChartInstance {
  ctx: CanvasRenderingContext2D;
  scales: {
    [key: string]: any; // 여기서 any 타입을 적절한 타입으로 대체할 수 있습니다.
  };
  data: {
    datasets: Dataset[];
    labels: string[];
  };
  getDatasetMeta: (index: number) => MetaData;
}

const options = {
  responsive: false,
  plugins: {
    afterDraw: (chart: ChartInstance) => {
      try {
        console.log("afterDraw is called");
        const ctx = chart.ctx;
        if (!ctx) {
          console.error("Context is not available");
          return;
        }
        const yAxis = chart.scales["y"];
        const xAxis = chart.scales["x"];

        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#000";

        chart.data.datasets.forEach(
          (dataset: Dataset, datasetIndex: number) => {
            const meta = chart.getDatasetMeta(datasetIndex);
            meta.data.forEach((point: any, pointIndex: number) => {
              // 타입 any를 구체화하는 것을 추천합니다.
              const x = xAxis.getPixelForValue(chart.data.labels[pointIndex]);
              const y = yAxis.getPixelForValue(dataset.data[pointIndex]);
              console.log("Drawing emoji at:", x, y); // 로깅 추가
              ctx.fillText("🚀", x, y - 20);
            });
          }
        );
      } catch (error) {
        console.error("Error inside afterDraw", error);
      }
    },
    legend: {
      display: false,
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
      tension: 0, // 라인을 곡선 없이 직선으로 만듭니다. 필요에 따라 제거할 수 있습니다.
      borderDash: [5, 5], // 이 부분을 추가하여 라인을 점선 스타일로 만듭니다. 첫 번째 숫자는 점의 길이, 두 번째 숫자는 공백의 길이입니다.
    },
    point: {
      radius: 3, // 포인트의 크기를 조절합니다. 원하는 크기로 조절하세요.
      backgroundColor: "rgb(255, 249, 200)", // 포인트의 색상입니다. 원하는 색상으로 조절하세요.
    },
  },
};

interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }>;
}

const LineChart: React.FC<LineChartProps> = () => {
  const [chartData, setChartData] = useState<ChartData>({
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
        if (memberId == null) {
          console.error("memberId is null or undefined");
          return;
        }
        const response = await getMember(memberId);
        const youtubeKeywords: YoutubeKeyword[] =
          response.data.youtubeKeywordResDtos;
        const labels = youtubeKeywords.map(
          (k: YoutubeKeyword) => k.youtubeKeywordName
        );
        const data = youtubeKeywords.map((k: YoutubeKeyword) => k.movieRank);

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
