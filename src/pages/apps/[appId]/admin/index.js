import MiniDrawer2 from "../../../../components/adminSidebar2/adminSidebar2";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Image from "next/image";
import axios from "axios";
import { FormatQuote } from "@mui/icons-material";
import { useRouter } from "next/router";
import DatePickerValue from "../../../../components/utils/datePicker";

const Admin = () => {
  const router = useRouter();

  const quotes = [
    "Create personalized two-way messaging campaigns which bring out experiences that drive conversions.",
    "Target different customer groups and send them SMSs on the latest and offerings not be missed.",
    "Send important notifications and triggers through SMS.",
    "Automate reminders on renewals, payments, next appointments, and other repetitive future events.",
    "Generate leads, upsell, and cross-sell with a low running cost and higher ROI platform as compared to other traditional forms of advertisement."
    // Add more quotes as needed
  ];
  
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };
  const handleNavigate = () => {
    router.push("/requestUnits/SMS");
  };

  return (
    <MiniDrawer2>
      <div className="m-16">
        <h2 className="mt-4 text-xl font-semibold">Dashboard</h2>
        <div className="flex justify-end">
  <div>
    <DatePickerValue />
  </div>
</div>
        

        <Grid container spacing={4} className="mt-8">
          <Grid item xs={12} md={4} lg={4}>
            {/* Left card */}
            <div className="bg-blue-100 h-full p-4 shadow-sm">
              <div className="flex items-center mb-4">
                <FormatQuote className="text-[#094C95] mr-2" />
                <p className="m-16 text-2xl font-bold text-[#094C95]">
                {getRandomQuote()}
                </p>
              </div>
              <p className="text-xs mt-1 text-gray-500">Boost Your Business With An Easy-To-Use SMS Service.</p>
            </div>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                {/* Middle card 1 */}
                <div className="bg-white h-full p-4 flex shadow-sm">
                  <div className="w-1/3">
                    {/* Add your image */}
                    <Image
                      src="/images/image2.avif"
                      alt="Image"
                      layout="responsive"
                      width={500}
                      height={300}
                    />
                  </div>
                  <div className="w-2/3 pl-4">
                    {/* Add your text content */}
                    <h3 className="text-md font-medium mt-4">Messages sent</h3>
                    <p className="text-lg mt-1">150,000</p>
                    <p className="mt-1 text-green-500">+15.55%</p>
                    <p className="mt-1 text-xs text-gray-500">
                      Since last week
                    </p>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12}>
                {/* Middle card 2 */}
                <div className="bg-white h-full p-4 flex shadow-sm">
                  <div className="w-1/3">
                    {/* Add your image */}
                    <Image
                      src="/images/image3.avif"
                      alt="Image"
                      width={500}
                      height={300}
                    />
                  </div>
                  <div className="w-2/3 pl-4">
                    {/* Add your text content */}
                    <h3 className="text-md font-medium mt-4">
                      Messages delivered
                    </h3>
                    <p className="text-lg mt-1">141,000</p>
                    <p className="mt-1 text-red-500">-10%</p>
                    <p className="text-xs mt-1 text-gray-500">
                      Since last week
                    </p>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                {/* Right card 1 */}
                <div className="bg-white h-full p-4 shadow-sm mb-6">
                  <h3 className="text-md font-medium mt-4">Units Spent</h3>
                  <p className="text-lg mt-1">50,000</p>
                  <p className="mt-1 text-green-500">+15.55%</p>
                  <p className="mt-1 text-xs text-gray-500">Since last week</p>
                </div>
              </Grid>
              <Grid item xs={12}>
                {/* Right card 2 */}
                <div className="bg-white h-full p-4 shadow-sm mb-6">
                  <h3 className="text-md font-medium mt-4">Balance</h3>
                  <p className="text-lg mt-1">20,000</p>
                  {/* <p className="mt-1 text-green-500">+15.55%</p> */}
                  <p
                    className="mt-1 text-xs text-blue-500 cursor-pointer underline hover:text-blue-700"
                    onClick={handleNavigate}
                  >
                    Top up SMS Units
                  </p>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </MiniDrawer2>
  );
};

export default Admin;