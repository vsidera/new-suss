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

    if (inputAmount >= 1 && inputAmount <= 99000) {
      calculatedUnits = (inputAmount * 0.45).toFixed(2) + " KES";
    } else if (inputAmount >= 100000 && inputAmount <= 499999) {
      calculatedUnits = (inputAmount * 0.4).toFixed(2) + " KES";
    } else if (inputAmount >= 500000 && inputAmount <= 999999) {
      calculatedUnits = (inputAmount * 0.35).toFixed(2) + " KES";
    } else if (inputAmount >= 1000000 && inputAmount <= 2500000) {
      calculatedUnits = (inputAmount * 0.25).toFixed(2) + " KES";
    } else if (inputAmount >= 2500000) {
      calculatedUnits = (inputAmount * 0.25).toFixed(2) + " KES";
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
        <p className="mb-4 text-[#094C95]">
          View the Rate Card and Request Units
        </p>

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
                  // color="text.secondary"
                  className="mb-8 mt-16"
                >
                  Key in the amount of units you would like to purchase:
                </Typography>
                <TextField
                  label="Units in KES"
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
                    // color="text.secondary"
                    className="mt-8"
                  >
                    Corresponding Amount:{" "}
                    <span className="text-lg text-blue-800">{units}</span>
                  </Typography>
                )}
              </CardContent>
            </Card>

            <Card className="w-full">
              <CardContent className="text-center">
                <Typography variant="h5" component="div" className="mb-2">
                  Payment Details
                </Typography>
                <Typography
                  variant="body1"
                  className="mb-4"
                >
                  <strong>Account Name</strong>
                  <br />
                  <span className="text-blue-900">
                    Suss Digital Africa Ltd USD
                  </span>
                  <br />
                  <strong>Account Number</strong>
                  <br />
                  <span className="text-blue-900">1294531123 KES</span>
                  <br />
                  <strong>Account Number</strong>
                  <br />
                  <span className="text-blue-900">1287299288 KCB</span>
                  <br />
                  <strong>Paybill:</strong>
                  <br />
                  <span className="text-blue-900">
                    7131671 Bank: KCB Bank Kenya
                  </span>
                  <br />
                  <strong>Branch:</strong>
                  <br />
                  <span className="text-blue-900">
                    Milimani Bank Code: 01 Branch Code: 175 Swift Code: KCBLKENX
                  </span>
                  <br />
                  <strong>Mpesa Paybill:</strong>
                  <br />
                  <span className="text-blue-900">4096067</span>
                  <br />
                  <strong>Paypal:</strong>
                  <br />
                  <span className="text-blue-900">paypal@suss.co.ke</span>
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
