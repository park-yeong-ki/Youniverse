import { Bar } from "react-chartjs-2";
import "chart.js/auto";

interface OTTData {
  ottId: number;
  ottName: string;
  ottImage: string;
  ottUrl: string;
  count: number;
  ratio: number;
}

interface BarChartProps {
  data?: OTTData[];
}

const OTTBarChart: React.FC<BarChartProps> = ({ data }) => {
  if (!data) {
    return null; // or render some fallback UI
  }
  const sortedData = [...data].sort((a, b) => b.ratio - a.ratio);
  const chartData = {
    labels: sortedData.map((ott) => ott.ottName),

    datasets: [
      {
        label: "",
        data: sortedData.map((ott) => ott.count),
        backgroundColor: [
          "rgba(19, 0, 94, 1)",
          "rgba(31, 0, 155, 1)",
          "rgba(41, 0, 206, 1)",
          "rgba(123, 90, 255, 1)",
          "rgba(199, 185, 255, 1)",
        ],
        borderColor: [
          "rgba(19, 0, 94, 1)",
          "rgba(31, 0, 155, 1)",
          "rgba(41, 0, 206, 1)",
          "rgba(123, 90, 255, 1)",
          "rgba(199, 185, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options: any = {
    indexAxis: "y",
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return <Bar data={chartData} options={options} />;
};

export default OTTBarChart;
