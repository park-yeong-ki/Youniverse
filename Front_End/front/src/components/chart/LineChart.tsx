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
import { Loader } from "../../pages/main/LoadingPage";
import styled from "styled-components";

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
  otherMemberId?: number;
}

// YoutubeKeyword 타입을 정의
interface YoutubeKeyword {
  youtubeKeywordName: string;
  movieRank: number;
}

const options = {
  responsive: false,
  plugins: {
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
        color: "black",
      },
    },
    y: {
      grid: {
        display: false, // y축의 그리드 라인을 숨깁니다.
      },
      ticks: {
        display: false, // y축의 눈금을 숨깁니다.
      },
      reverse: true,
    },
  },
  elements: {
    line: {
      tension: 0, // 라인을 곡선 없이 직선으로 만듭니다. 필요에 따라 제거할 수 있습니다.
      borderDash: [5, 5], // 이 부분을 추가하여 라인을 점선 스타일로 만듭니다. 첫 번째 숫자는 점의 길이, 두 번째 숫자는 공백의 길이입니다.
    },
    point: {
      radius: 5, // 포인트의 크기를 조절합니다. 원하는 크기로 조절하세요.
      backgroundColor: "rgb(255, 249, 200)", // 포인트의 색상입니다. 원하는 색상으로 조절하세요.
      pointStyle: "star",
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

const LineChart: React.FC<LineChartProps> = ({
  width,
  height,
  otherMemberId,
}) => {
  const defaultMemberId = useRecoilValue(UserDetailInfoState).memberId;
  const [memberId, setMemberId] = useState<number | null>(defaultMemberId);
  const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩여부

  useEffect(() => {
    if (otherMemberId) {
      setMemberId(otherMemberId);
    }
  }, [otherMemberId]);

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

  useEffect(() => {
    const getChartData = async () => {
      try {
        if (memberId == null) {
          console.error("memberId is null or undefined");
          return;
        }
        setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    };

    getChartData();
  }, [memberId]);

  if (isLoading) {
    // 로딩 중이면, 로딩 스피너나 다른 로딩 UI를 반환합니다.
    return (
      <StyledLoaderWrapper>
        <Loader />
      </StyledLoaderWrapper>
    );
  } else {
    // 로딩이 완료되면, 차트를 렌더링합니다.
    return (
      <Line options={options} data={chartData} width={width} height={height} />
    );
  }
};

export default LineChart;

const StyledLoaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  & > * {
    width: 100%;
    height: 100%;
  }
`;
