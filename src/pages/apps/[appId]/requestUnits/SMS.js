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
import MiniDrawer from "../../../../components/sidebar2/sidebar2";
import { Avatar } from "@mui/material";
import SnackbarAlert from "../../../../components/utils/snackbar";
import { unitsRequest } from "../../../api/actions/units/unitsAction";
import { useRouter } from "next/router";

const RequestSMS = () => {

  const router = useRouter();
  const app_id = router.query.appId;

  const [isSnackBarAlertOpen, setIsSnackBarAlertOpen] = useState(false);
  const [eventType, setEventType] = useState("");
  const [eventMessage, setEventMessage] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const [amount, setAmount] = useState("");
  const [units, setUnits] = useState(null);
  const [smspackage, setPackage] = useState("")

  const calculateUnits = (inputAmount) => {
    let calculatedUnits = "";

    if (inputAmount >= 1 && inputAmount <= 99999) {
      calculatedUnits = "KES " + (inputAmount * 0.45).toFixed(2);
      setPackage("@0.45 Persms")
    } else if (inputAmount >= 100000 && inputAmount <= 499999) {
      calculatedUnits = "KES " + (inputAmount * 0.4).toFixed(2);
      setPackage("@0.40 Persms")
    } else if (inputAmount >= 500000 && inputAmount <= 999999) {
      calculatedUnits = "KES " + (inputAmount * 0.35).toFixed(2);
      setPackage("@0.35 Persms")
    } else if (inputAmount >= 1000000 && inputAmount <= 2500000) {
      calculatedUnits = "KES " + (inputAmount * 0.25).toFixed(2);
      setPackage("@0.25 Persms")
    } else if (inputAmount >= 2500000) {
      calculatedUnits = "KES " + (inputAmount * 0.25).toFixed(2);
      setPackage("@0.25 Persms")
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const numericPart = units.replace('KES', '').trim();
    
    const unitsPayload = {
      package: smspackage,
      units: parseInt(numericPart, 10),
    };

    const res = unitsRequest({app_id,unitsPayload}).then((res) => {
      if (res.status === 201) {
        setIsButtonClicked(false)
        setEventType("success");
        setEventMessage("Units Successfully Created");
        setEventTitle("UNITS REQUEST");
        setIsSnackBarAlertOpen(true);
      } else {
        setIsButtonClicked(false)
        setEventType("fail");
        setEventMessage("Service NOT Created");
        setEventTitle("UNITS REQUEST");
        setIsSnackBarAlertOpen(true);
      }
    });
    setIsSnackBarAlertOpen(false);
    setUnits(null)
    return res;
    
  };

  return (
    <MiniDrawer>
      <SnackbarAlert
        open={isSnackBarAlertOpen}
        type={eventType}
        message={eventMessage}
        handleClose={() => setIsSnackBarAlertOpen(false)}
        title={eventTitle}
      />
      <div className="m-16">
        <h2 className="mt-4 text-xl font-semibold">Request SMS Units</h2>
        <p className="mb-4 text-gray-700">
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
                  label="Units"
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
                  type="submit"
                  onClick={(e) => {
                    handleSubmit(e);
                    setIsButtonClicked(true);
                  }}
                >
                  <IconButton aria-label="Add to Cart" color="inherit">
                    <ShoppingCart />
                  </IconButton>
                  {isButtonClicked ? 'REQUESTING' : 'REQUEST'}
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
