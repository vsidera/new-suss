import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement } from "chart.js";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { deliveryMeter } from "../../pages/api/actions/analytics/analyticsAction";
import dayjs from "dayjs";
import CircularIndeterminate from "../utils/spinner";

ChartJS.register(ArcElement);

function SuccessSummary({ fromDate, toDate }) {
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const [isLoaded, setIsLoaded] = useState(false)
  const fromObject = dayjs(fromDate);
  const toObject = dayjs(toDate);

  const fromUnix = fromObject.unix();
  const toUnix = toObject.unix();

  console.log("DATE IS-!!!!!!!!!!", fromUnix,toUnix)

  const router = useRouter();
  const app_id = router.query.appId;

  const [newData, setDeliveryData] = useState([
    {
        "Count": 4,
        "Description": "Message accepted successfully"
    },
    {
        "Count": 4,
        "Description": "Message delivered successfully"
    }
]);


    const getDeliveryData = () => {

        deliveryMeter({app_id, fromUnix, toUnix})
          .then((res) => {
            if (res.errors) {
              console.log("AN ERROR HAS OCCURED");
            } else {
              setDeliveryData(res.data);
              setTimeout(() => {
                setIsLoaded(true)
              }, 1000);
              
            }
          })
          .catch((err) => {
            console.log(err);
          });
      };
    
      useEffect(() => {
        getDeliveryData();
    
    
      }, [app_id, fromUnix,toUnix]);

  // const sentCount = newData && newData.reduce((acc, item) => acc + item.Count, 0);

  useEffect(() => {
    setChartData({
      labels: newData && newData.map(item => item.Description),
      datasets: [
        //@ts-ignore
        {
          data: newData && newData.map(item => item.Count),
          backgroundColor: ["#3AA52D", "#C12210"], // You can customize the colors here
          border: 1,
          display: true,
        },
      ],
    });
  }, [newData]);

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <CircularIndeterminate />
      </div>
    );
  }
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
        {/* <p className="mr-4">SENT <br/> <span className="text-blue-500">{sentCount}</span></p> */}
          <p className="mr-4">ACCEPTED <br/><span className="text-green-500">{newData && newData[0] && newData[0].Count}</span></p>
          <p>DELIVERED <br/> <span className="text-red-500">{newData && newData[1] && newData[1].Count}</span></p>
        </div>
      </div>
    </div>
  );
}

export default SuccessSummary;
