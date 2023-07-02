import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement } from "chart.js";
import { useEffect, useState } from "react";
ChartJS.register(ArcElement);

function SuccessSummary() {
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const delivered = 300000;
  const failed = 100000;

  useEffect(() => {
    setChartData({
      labels: ["Delivered", "Failed"],
      datasets: [
        //@ts-ignore
        {
          data: [delivered, failed],
          backgroundColor: ["#3AA52D", "#C12210"],
          border: 1,
          display: true,
        },
      ],
    });
  }, []);

  return (
    <div className="grid grid-cols-4 h-full w-full m-4">
      <div className="h-full flex-col w-full col-span-3 ml-2">
        <Doughnut
          data={chartData}
          options={{
            plugins: {
              legend: {
                display: true,
              },
              tooltip: {
                enabled: true,
                mode: "index",
              },
              datalabels: {
                display: true,
              },
              title: {
                display: true,
                text: "Delivered vs Failed",
                align: "start",
                padding: 12,
                font: {
                  size: "16",
                  family: "Poppins",
                  color: "#000000",
                  weight: "100",
                  lineHeight: "16px",
                  letterSpacing: "-0.025em",
                },
              },
            },
            interaction: {
              intersect: false,
            },
            rotation: -160,
            border: 0,
            stroke: 0,
            cutout: "67%",
            maintainAspectRatio: true,
            responsive: true,
          }}
        />
        <div className="text-md flex justify-center m-16">
        <p>SENT <span className="text-blue-500">400k</span></p>

          <p>DELIVERED <span className="text-red-500">300k</span></p>
          <p>FAILED <span className="text-green-500">100k</span></p>
        </div>
      </div>
    </div>
  );
}

export default SuccessSummary;
