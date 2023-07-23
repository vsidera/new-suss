import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement } from "chart.js";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { unitsExpenditure } from "../../pages/api/actions/analytics/analyticsAction";

ChartJS.register(ArcElement);

function SuccessSummary() {
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const router = useRouter();
  const app_id = router.query.appId;

  const [deliveryData, setDeliveryData] = useState([]);

    const getDeliveryData = () => {

        unitsExpenditure({app_id})
          .then((res) => {
            if (res.errors) {
              console.log("AN ERROR HAS OCCURED");
            } else {
              setDeliveryData(res.data);
              setIsLoaded(true)
            }
          })
          .catch((err) => {
            console.log(err);
          });
      };
    
      useEffect(() => {
        getDeliveryData();
    
    
      }, [app_id]);

  // Sample data with new values
  const newData = [
    {
      "Description": "Message delivered",
      "Count": 5
    },
    {
      "Description": "Message failed",
      "Count": 2
    }
  ];

  const sentCount = newData.reduce((acc, item) => acc + item.Count, 0);

  useEffect(() => {
    setChartData({
      labels: newData.map(item => item.Description),
      datasets: [
        //@ts-ignore
        {
          data: newData.map(item => item.Count),
          backgroundColor: ["#3AA52D", "#C12210"], // You can customize the colors here
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
        <p className="mr-4">SENT <br/> <span className="text-blue-500">{sentCount}</span></p>
          <p className="mr-4">DELIVERED <br/><span className="text-green-500">{newData[0].Count}</span></p>
          <p>FAILED <br/> <span className="text-red-500">{newData[1].Count}</span></p>
        </div>
      </div>
    </div>
  );
}

export default SuccessSummary;
