import MiniDrawer from "../../../../components/sidebar2/sidebar2";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Image from "next/image";
import axios from "axios";
import { FormatQuote } from "@mui/icons-material";
import { useRouter } from "next/router";

const Home = () => {
  const [quote, setQuote] = useState("");

  const router = useRouter();

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      const response = await axios.get(
        "https://uselessfacts.jsph.pl/api/v2/facts/random"
      );
      const data = response.data;
      setQuote(data.text);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavigate = () => {
    router.push("/requestUnits/SMS");
  };

  return (
    <MiniDrawer>
      <div className="m-16">
        <h2 className="mt-4 text-xl font-semibold">Dashboard</h2>

        <Grid container spacing={4} className="mt-8">
          <Grid item xs={12} md={4} lg={4}>
            {/* Left card */}
            <div className="bg-blue-100 h-full p-4">
              <div className="flex items-center mb-4">
                <FormatQuote className="text-[#094C95] mr-2" />
                <p className="m-16 text-2xl font-bold text-[#094C95]">
                  {quote}
                </p>
              </div>
              <p className="text-xs mt-1 text-gray-500">some useless facts... to make your day</p>
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
    </MiniDrawer>
  );
};

export default Home;
