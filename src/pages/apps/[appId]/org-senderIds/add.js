import React, { useState } from "react";
import Link from "next/link";
import MiniDrawer from "../../../../components/sidebar2/sidebar2";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Stack,
  Typography,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import SnackbarAlert from "../../../../components/utils/snackbar";
import { serviceCreate } from "../../../api/actions/services/servicesAction";

const AddSenderId = () => {
  const [isSnackBarAlertOpen, setIsSnackBarAlertOpen] = useState(false);
  const [eventType, setEventType] = useState("");
  const [eventMessage, setEventMessage] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState("");

  const channels = ["WHATSAPP", "SHORTCODE", "SENDERNAME"];

  const [state, setState] = React.useState({
    sender: "",
    provider: "",
    country_code: "",
    channel: ""
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newService = {
      sender: state.sender,
      provider: state.provider,
      country_code: state.country_code,
      channel: selectedChannel
    };

    const res = serviceCreate(newService).then((res) => {
      if (res.status === 201) {
        setEventType("success");
        setEventMessage("Service Successfully Created");
        setEventTitle("SERVICE CREATE");
        setIsSnackBarAlertOpen(true);
      } else {
        setEventType("fail");
        setEventMessage("Service NOT Created");
        setEventTitle("SERVICE CREATE");
        setIsSnackBarAlertOpen(true);
      }
    });

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
      <React.Fragment>
        <div className="m-16">
          <h2 className="mt-4 text-xl font-semibold">Add Sender Id</h2>
          <p className="mb-24 text-gray-700">Create a Sender Id</p>
          <Card>
            <CardContent>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Fields marked with <span style={{ color: "red" }}>*</span> are
                required.
              </Typography>
              <form
                className="m-4"
                onSubmit={handleSubmit}
                action={<Link to="/login" />}
              ><InputLabel htmlFor="select-channel">
              <span style={{ color: "red" }}>*</span>Select Channel
            </InputLabel>
            <Select
              id="select-channel"
              value={selectedChannel}
              onChange={(event) =>
                setSelectedChannel(event.target.value)
              }
              variant="outlined"
              color="secondary"
              fullWidth
              required
              sx={{ mb: 4 }}
            >
              {channels.map((channel) => (
                <MenuItem key={channel} value={channel}>
                  {channel}
                </MenuItem>
              ))}
            </Select>
                <TextField
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="Sender"
                  onChange={handleChange}
                  value={state.sender}
                  name="sender"
                  fullWidth
                  required
                  sx={{ mb: 4 }}
                />
                <TextField
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="Provider"
                  onChange={handleChange}
                  value={state.provider}
                  name="provider"
                  fullWidth
                  required
                  sx={{ mb: 4 }}
                />
                <TextField
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="Country Code"
                  onChange={handleChange}
                  value={state.country_code}
                  name="country_code"
                  required
                  fullWidth
                  sx={{ mb: 4 }}
                />

                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#094C95 !important",
                    color: "#FFFFFF !important",
                    "&:hover": { backgroundColor: "#001041 !important" },
                  }}
                  type="submit"
                >
                  Create
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </React.Fragment>
    </MiniDrawer>
  );
};

export default AddSenderId;
