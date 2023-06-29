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
        //   hoverBackgroundColor: ["blue", "#5f6062"],
          display: true,
        },
      ],
    });
  }, []);

  return (
    <div className="  grid grid-cols-4 h-full w-full m-4">
      <div className="h-full flex-col w-full col-span-3 ml-2">
        {/*@ts-ignore */}
        <Doughnut
          data={chartData}
          options={{
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                enabled: true,
              },
              datalabels: {
                display: false,
              },
              title: {
                display: false,
                text: "SMS Success Summary",
                align: "start",
                padding: 12,
                font: {
                  //@ts-ignore
                  size: "16",
                  family: "Ubuntu",
                  color: "#5f6062",
                  weight: "600",
                  lineHeight: "16px",
                  letterSpacing: "-0.025em",
                },
              },
            },
            rotation: -160,
            border: 0,
            stroke: 0,
            cutout: "67%",
            maintainAspectRatio: true,
            responsive: true,
          }}
        />
        <div className="text-xl text-primary flex justify-center m-16">
          {" "}
          300k messages sent
        </div>
      </div>
      <div className="mt-auto mb-6 ml-1" style={{ width: "100%" }}>
        <ul className="list-disc text-primary tracking-tight flex items-center sm:block sm:mt-22 md:block xl:block lg:mt-30 md:mt-10">
          <li className="marker:text-[#3AA52D] marker:text-[36px] flex-row text-xs md:text-sm lg:text-base mr-2">
            Delivered
          </li>
          <li className="marker:text-[#C12210] marker:text-[36px] text-xs md:text-sm lg:text-base mr-2">
            Failed
          </li>
        </ul>
      </div>
    </div>
  );
}
export default SuccessSummary;
