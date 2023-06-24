import React, { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Stack,
  Typography,
  TextareaAutosize,
  IconButton,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import Faq from "../../components/faqs/faq";
import MiniDrawer from "../../components/sidebar2/sidebar2";
import { Avatar } from "@mui/material";

const RequestSMS = () => {
  const [amount, setAmount] = useState("");
  const [units, setUnits] = useState("");

  const calculateUnits = (inputAmount) => {
    let calculatedUnits = "";

    if (inputAmount <= 0) {
      calculatedUnits = "";
    } else if (inputAmount <= 1000) {
      calculatedUnits = "200 each";
    } else if (inputAmount <= 2500) {
      calculatedUnits = "150 each";
    } else if (inputAmount <= 10000) {
      calculatedUnits = "100 each";
    } else {
      calculatedUnits = "";
    }

    setUnits(calculatedUnits);
  };

  const handleAmountChange = (event) => {
    const inputAmount = parseFloat(event.target.value);
    setAmount(event.target.value);
    calculateUnits(inputAmount);
  };
  
  return (
    <MiniDrawer>
      <div className="m-16">
        <h2 className="mt-4 text-xl font-semibold">Request SMS Units</h2>
        <p className="mb-4 text-[#094C95]">Here you can request SMS units</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="w-full">
            <CardContent>
              <div
                className="aspect-w-4 aspect-h-5 flex items-center justify-center"
                style={{ height: "100vh" }} // Set the height to 100vh to cover the screen height
              >
                <img
                  src="/images/rates.jpeg"
                  alt="Image"
                  className="object-cover"
                  style={{ height: "100%" }} // Set the image height to 100% to cover the container
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-rows-2 gap-4">
            <Card className="w-full">
              <CardContent>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  className="mb-8 mt-16"
                >
                  Key in the amount of units you would like to purchase:
                </Typography>
                <TextField
                  label="Units in USD"
                  variant="outlined"
                  fullWidth
                  className="mb-8 mt-16"
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    backgroundColor: "#094C95 !important",
                    color: "#FFFFFF !important",
                    "&:hover": { backgroundColor: "#001041 !important" },
                  }}
                  onClick={calculateUnits}
                >
                  <IconButton aria-label="Add to Cart" color="inherit">
                    <ShoppingCart />
                  </IconButton>
                  Purchase
                </Button>
                {units && (
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    className="mt-8"
                  >
                    Corresponding units: {units}
                  </Typography>
                )}
              </CardContent>
            </Card>

            <Card className="w-full">
              <CardContent>
                <Typography variant="h5" component="div" className="mb-2">
                  Payment Details
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  className="mb-4"
                >
                  <strong>Account Name:</strong> Suss Digital Africa Ltd USD{" "}
                  <br />
                  <strong>Account Number:</strong> 1294531123 KES <br />
                  <strong>Account Number:</strong> 1287299288 KCB <br />
                  <strong>Paybill:</strong> 7131671 Bank: KCB Bank Kenya <br />
                  <strong>Branch:</strong> Milimani Bank Code: 01 Branch Code:
                  175 Swift Code: KCBLKENX <br />
                  <strong>Mpesa Paybill:</strong> 4096067 <br />
                  <strong>Paypal:</strong> paypal@suss.co.ke
                </Typography>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MiniDrawer>
  );
};

export default RequestSMS;
