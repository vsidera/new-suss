import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { useState, useEffect, useRef } from "react";
import { unitsExpenditure } from '../../pages/api/actions/analytics/analyticsAction';
import { useRouter } from 'next/router';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function UnitsSpent() {

    const router = useRouter();
    const app_id = router.query.appId;
    const [isLoaded, setIsLoaded] = useState(false);

    const [unitsData, setUnitsData] = useState([]);

    setTimeout(() => {
        setIsLoaded(true)
    }, 1000)

    

    const getUnitsExpenditure = () => {

        unitsExpenditure({app_id})
          .then((res) => {
            if (res.errors) {
              console.log("AN ERROR HAS OCCURED");
            } else {
              setUnitsData(res.data);
              setIsLoaded(true)
            }
          })
          .catch((err) => {
            console.log(err);
          });
      };
    
      useEffect(() => {
        getUnitsExpenditure();
    
    
      }, [app_id]);

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        layout: {
            padding: {
                top: 5,
                // bottom: 2,
                right: 10,
                left: 10,
                marginTop: 1,
            }
        },
        plugins: {
            legend: {
                display: false,
            },
            datalabels: {
                display: false,
            },
        },
        scales: {
            x: {
                ticks: {
                    display: true,
                    font: {
                        size: 15,
                        family: 'Ubuntu',
                        lineHeight: '18px',
                        border: '2px solid red'
                    },
                    border: '2px solid red'
                },
                grid: {
                    display: false,
                    drawOnChartArea: false,
                    drawBorder: false
                },
            },
            y: {
                ticks: {
                    stepSize: 50,
                    display: true,
                    font: {
                        size: 15,
                        family: 'Ubuntu',
                        lineHeight: '18px',
                        border: '2px solid red'
                    },
                    border: '2px solid red'
                },
                grid: {
                    display: false,
                    drawOnChartArea: false,
                    drawBorder: false
                },
            },
            yAxes: [{
                ticks: {
                    reverse: false,
                    stepSize: 400
                },
            }]

        },
    };
    if (isLoaded && typeof window !== "undefined") {
        var ctx = document.getElementById('myChart').getContext("2d")
        var gradient = ctx.createLinearGradient(0, 0, 0, 400)
        gradient.addColorStop(0, 'rgb(235, 248, 255)')
        gradient.addColorStop(1, '#094C95')
    }
    // Create an array with all the months (from January to December)
    const allMonths = Array.from({ length: 12 }, (_, index) => (index + 1).toString().padStart(2, '0'));

    // Create an object to hold counts for each month, initialized with zeros
    const countsByMonth = Object.fromEntries(allMonths.map(month => [month, 0]));

    // Update counts for the months that exist in the unitsData
    unitsData && unitsData.forEach(item => {
        const month = item.YearMonth.split('-')[1];
        countsByMonth[month] = item.Count;
    });

    const shortMonthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];
    
      // Extract the counts and labels for the chart with short month names
      const data = {
        labels: allMonths.map(month => shortMonthNames[Number(month) - 1]),
        datasets: [
          {
            label: 'Units Data',
            data: allMonths.map(month => countsByMonth[month]),
            backgroundColor: gradient,
            borderRadius: 7.5,
            barPercentage: 0.9,
            categoryPercentage: 0.9
          }
        ],
      };
   
    return(
        <div className='flex flex-col w-full h-full'>
            <div>
                <h1 className='mt-4 mb-8 ml-2'>Units Expenditure by Month</h1>
            <Bar id="myChart" options={options} data={data} />
            </div></div>
    );

}
export default UnitsSpent;