import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function MessageTracker() {
    const [chartData, setChartData] = useState({});
    
    useEffect(() => {
      // Define your chart data here
      const data = {
        labels: ["Jan", "Feb", "March", "April"],
        datasets: [
          {
            label: "Numbers",
            data: [10, 20, 30, 40],
            fill: false,
            borderColor: "rgba(75,192,192,1)",
          },
        ],
      };
      
      setChartData(data);
    }, []);
  
    return (
      <div className="h-full  overflow-hidden flex">
        <Line data={chartData} />
      </div>
    );
  }
  
  export default MessageTracker;