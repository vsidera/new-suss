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

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function UnitsSpent() {
    const [isLoaded, setIsLoaded] = useState(false);
    setTimeout(() => {
        setIsLoaded(true)
    }, 1000)
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
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = {
        labels,
        datasets: [
            {
                label: 'Units Data',
                data: labels.map(() => faker.datatype.number({ min: 0, max: 200 })),
                backgroundColor: gradient,
                borderRadius: 7.5,
                barPercentage: 0.9,
                categoryPercentage: 0.9
            },

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