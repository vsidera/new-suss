import React, { useState } from "react";
import Link from "next/link";
import MiniDrawer2 from "../../../../components/adminSidebar2/adminSidebar2";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import SnackbarAlert from "../../../../components/utils/snackbar";

const RegisterForm = () => {
  const [isSnackBarAlertOpen, setIsSnackBarAlertOpen] = useState(false);
  const [eventType, setEventType] = useState("");
  const [eventMessage, setEventMessage] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const [state, setState] = React.useState({
    sender: "",
    provider: "",
    country_code: "",
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
    <MiniDrawer2>
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
          <p className="mb-24">This will create a sender id</p>
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
              >
                <TextField
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="Sender"
                  onChange={handleChange}
                  value={state.sender}
                  fullWidth
                  required
                  sx={{ mb: 4 }}
                />
                <TextField
                  type="email"
                  variant="outlined"
                  color="secondary"
                  label="Provider"
                  onChange={handleChange}
                  value={state.provider}
                  fullWidth
                  required
                  sx={{ mb: 4 }}
                />
                <TextField
                  type="number"
                  variant="outlined"
                  color="secondary"
                  label="Country Code"
                  onChange={handleChange}
                  value={state.country_code}
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
    </MiniDrawer2>
  );
};

export default RegisterForm;
