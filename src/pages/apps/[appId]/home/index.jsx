import MiniDrawer from "../../../../components/sidebar2/sidebar2";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Image from "next/image";
import axios from "axios";
import { FormatQuote } from "@mui/icons-material";
import { useRouter } from "next/router";
import DatePickerValue from "../../../../components/utils/datePicker";
import { authHeaders } from "../../../api/utils/headers/headers";

const Home = () => {

  const router = useRouter();
  const app_id = router.query.appId;

  const config = authHeaders();

  const [sent, setSent] = useState(0);
  const [failed, setFailed] = useState(0);
  const [delivered, setDelivered] = useState(0);
  const [sentLastWeek, setSentLastWeek] = useState(0);
  const [failedLastWeek, setFailedLastWeek] = useState(0);
  const [deliveredLastWeek, setDeliveredLastWeek] = useState(0);
  const [sentPercentageChange, setSentPercentageChange] = useState(0);
  const [failedPercentageChange, setFailedPercentageChange] = useState(0);
  const [deliveredPercentageChange, setDeliveredPercentageChange] = useState(0);

  const [unitsBalance, setUnitsBalance] = useState(0)

  console.log("APP ID!!!!!!!!!!", unitsBalance)


  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get(
          `https://suss-ads.zohari.tech/api/v1/application/${app_id}/balance`,
          config
        );

        
        setUnitsBalance(response.data.balance)
       
       
      } catch (error) {
        console.error(error);
      }
    };

    fetchBalance();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://suss-ads.zohari.tech/api/v1/analytics/weekcompare/${app_id}`,
          config
        );
        const analyticsData = response.data;

        // Calculate the total counts for 'sent' and 'failed' for this week and last week
        let sentCount = 0;
        let failedCount = 0;
        let deliveredCount = 0;
        let sentCountLastWeek = 0;
        let failedCountLastWeek = 0;
        let deliveredCountLastWeek = 0;

        analyticsData.forEach((item) => {
          if (item.Description === "Message accepted successfully") {
            sentCount += item.ThisWeekCount;
            sentCountLastWeek += item.LastWeekCount;
          } else if (item.Description === "Message failed") {
            failedCount += item.ThisWeekCount;
            failedCountLastWeek += item.LastWeekCount;
          } else if (item.Description === "Message delivered successfully"){
            deliveredCount += item.ThisWeekCount;
            deliveredCountLastWeek += item.LastWeekCount
          }
        });

        setSent(sentCount);
        setFailed(failedCount);
        setSentLastWeek(sentCountLastWeek);
        setFailedLastWeek(failedCountLastWeek);
        setDelivered(deliveredCount);
        setDeliveredLastWeek(deliveredCountLastWeek);

        // Calculate the percentage change for 'sent' and 'failed'
        const sentChange = sentCount - sentCountLastWeek;
        const failedChange = failedCount - failedCountLastWeek;
        const deliveredChange = deliveredCount - deliveredCountLastWeek

        const sentPercentageChange = (sentChange / sentCountLastWeek) * 100;
        const failedPercentageChange = (failedChange / failedCountLastWeek) * 100;
        const deliveredPercentageChange = (deliveredChange / deliveredCountLastWeek) * 100;


        setSentPercentageChange(sentPercentageChange);
        setFailedPercentageChange(failedPercentageChange);
        setDeliveredPercentageChange(deliveredPercentageChange)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const quotes = [
    "Create personalized two-way messaging campaigns which bring out experiences that drive conversions.",
    "Target different customer groups and send them SMSs on the latest and offerings not be missed.",
    "Send important notifications and triggers through SMS.",
    "Automate reminders on renewals, payments, next appointments, and other repetitive future events.",
    "Generate leads, upsell, and cross-sell with a low running cost and higher ROI platform as compared to other traditional forms of advertisement.",
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
    <MiniDrawer>
      <div className="m-16">
        <h2 className="mt-4 text-xl font-semibold">Dashboard</h2>
        <div className="flex justify-end">
          {/* <div>
    <DatePickerValue />
  </div> */}
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
              <p className="text-xs mt-1 text-gray-500">
                Boost Your Business With An Easy-To-Use SMS Service.
              </p>
            </div>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                {/* Middle card 1 */}
                <div className="bg-[#F7F7F7] h-full p-4 flex shadow-sm">
                  <div className="w-1/3">
                    {/* Add your image */}
                    <Image
                      src="/images/image2.avif"
                      alt="Image"
                      width={500}
                      height={300}
                    />
                  </div>
                  <div className="w-2/3 pl-4">
                    {/* Add your text content */}
                    <h3 className="text-md font-medium mt-4">Messages sent</h3>
                    <p className="text-lg mt-1">{sent}</p>
                    <p className={sentPercentageChange >= 0 ? "mt-1 text-green-500" : "mt-1 text-red-500"}>
                      {sentPercentageChange.toFixed(1)}%
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Since last week
                    </p>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12}>
                {/* Middle card 2 */}
                <div className="bg-[#F7F7F7] h-full p-4 flex shadow-sm">
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
                      Messages Failed
                    </h3>
                    <p className="text-lg mt-1">{failed}</p>
                    <p className={failedPercentageChange >= 0 ? "mt-1 text-red-500" : "mt-1 text-green-500"}>
                      {failedPercentageChange.toFixed(1)}%
                    </p>
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
                <div className="bg-[#F7F7F7] h-full p-4 shadow-sm mb-6">
                  <h3 className="text-md font-medium mt-4">Messages Delivered</h3>
                  <p className="text-lg mt-1">{delivered}</p>
                  <p className={deliveredPercentageChange >= 0 ? "mt-1 text-green-500" : "mt-1 text-red-500"}>
                      {deliveredPercentageChange.toFixed(1)}%
                    </p>
                  <p className="mt-1 text-xs text-gray-500">Since last week</p>
                </div>
              </Grid>
              <Grid item xs={12}>
                {/* Right card 2 */}
                <div className="bg-[#F7F7F7] h-full p-4 shadow-sm mb-6">
                  <h3 className="text-md font-medium mt-4">Balance</h3>
                  <p className="text-lg mt-1">{unitsBalance}</p>
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
    </MiniDrawer>
  );
};

export default Home;
