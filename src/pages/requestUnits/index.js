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

const Support = () => {
  const [email, setEmail] = useState("");

  return (
    <MiniDrawer>
      <div className="m-16">
        <h2 className="mt-4 text-xl font-semibold">Request Units</h2>
        <p className="mb-24 text-[#094C95]">
          Here you can request units or a sender Id
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Card className="w-full">
            <CardContent>
              <div className="flex items-center mb-2">
                <Avatar
                  src="/images/saf.png"
                  alt="Profile Picture"
                  sx={{ marginRight: "8px" }}
                />
                <Typography variant="h5" component="div">
                  Safaricom Sender ID
                </Typography>
              </div>
              <hr className="mb-2" /> {/* Divider below the header */}
              <Typography
                variant="body1"
                color="text.secondary"
                className="mb-4"
              >
                This product registers a Sender ID with the Safaricom network.
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                className="mb-4"
              >
                Ksh. 5,800.00
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#094C95 !important",
                  color: "#FFFFFF !important",
                  "&:hover": { backgroundColor: "#001041 !important" },
                  fontSize: "10px",
                  padding: "4px 12px",
                  minWidth: "auto",
                }}
              >
                <IconButton aria-label="Add to Cart" color="inherit">
                  <ShoppingCart />
                </IconButton>
                Order
              </Button>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardContent>
            <div className="flex items-center mb-2">
                <Avatar
                  src="/images/airtel.png"
                  alt="Profile Picture"
                  sx={{ marginRight: "8px" }}
                />
                <Typography variant="h5" component="div">
                  Aitel Sender ID
                </Typography>
              </div>
              <hr className="mb-2" /> {/* Divider below the header */}
              <Typography
                variant="body1"
                color="text.secondary"
                className="mb-4"
              >
                This product registers a Sender ID with the Airtel network.
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                className="mb-4"
              >
                Ksh. 5,800.00
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#094C95 !important",
                  color: "#FFFFFF !important",
                  "&:hover": { backgroundColor: "#001041 !important" },
                  fontSize: "10px", // Adjust the font size to reduce the button size
                  padding: "4px 12px", // Adjust the padding to control the overall button size
                  minWidth: "auto",
                }}
              >
                <IconButton aria-label="Add to Cart" color="inherit">
                  <ShoppingCart />
                </IconButton>
                Order
              </Button>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardContent>
            <div className="flex items-center mb-2">
                <Avatar
                  src="/images/telkom.png"
                  alt="Profile Picture"
                  sx={{ marginRight: "8px" }}
                />
                <Typography variant="h5" component="div">
                  Telkom Sender ID
                </Typography>
              </div>
              <hr className="mb-2" /> {/* Divider below the header */}
              <Typography
                variant="body1"
                color="text.secondary"
                className="mb-4"
              >
                This product registers a Sender ID with the Telkom network.
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                className="mb-4"
              >
                Ksh. 5,800.00
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#094C95 !important",
                  color: "#FFFFFF !important",
                  "&:hover": { backgroundColor: "#001041 !important" },
                  fontSize: "10px", // Adjust the font size to reduce the button size
                  padding: "4px 12px", // Adjust the padding to control the overall button size
                  minWidth: "auto",
                }}
              >
                <IconButton aria-label="Add to Cart" color="inherit">
                  <ShoppingCart />
                </IconButton>
                Order
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MiniDrawer>
  );
};

export default Support;
