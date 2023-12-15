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

const Support = () => {
  const [email, setEmail] = useState("");

  return (
    <MiniDrawer>
      <div className="m-16">
        <h2 className="mt-4 text-xl font-semibold">Request Sender Ids</h2>
        <p className="mb-24 text-gray-700">
          Here you can request a sender id
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
                className="mb-8"
              >
                This product registers a Sender ID with the Safaricom Ltd network.
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                className="mb-4 font-semibold"
              >
                Ksh. 6,000.00
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
                  Airtel Sender ID(Coming Soon)
                </Typography>
              </div>
              <hr className="mb-2" /> {/* Divider below the header */}
              <Typography
                variant="body1"
                color="text.secondary"
                className="mb-8"
              >
                This product registers a Sender ID with the Airtel Ltd network.
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                className="mb-4 font-semibold"
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
                  src="/images/telkom.png"
                  alt="Profile Picture"
                  sx={{ marginRight: "8px" }}
                />
                <Typography variant="h5" component="div">
                  Telkom Sender ID(Coming Soon)
                </Typography>
              </div>
              <hr className="mb-2" /> {/* Divider below the header */}
              <Typography
                variant="body1"
                color="text.secondary"
                className="mb-8"
              >
                This product registers a Sender ID with the Telkom Ltd network.
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                className="mb-4 font-semibold"
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
        </div>
      </div>
    </MiniDrawer>
  );
};

export default Support;
