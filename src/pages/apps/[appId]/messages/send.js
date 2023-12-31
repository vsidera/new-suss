import React, { useState, useEffect } from "react";
import Link from "next/link";
import MiniDrawer from "../../../../components/sidebar2/sidebar2";
import {
  Card,
  CardContent,
  Select,
  Button,
  Input,
  MenuItem,
  InputLabel,
  Typography,
  TextField,
  TextareaAutosize,
  Stack,
} from "@mui/material";
import { appservicesAction } from "../../../api/actions/appservices/appservicesAction";
import { useRouter } from "next/router";
import { sendSms } from "../../../api/actions/messages/messagesAction";
import { v4 as uuidv4 } from "uuid";
import SnackbarAlert from "../../../../components/utils/snackbar";
import MaterialUIPickers from "../../../../components/utils/timePicker";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import dayjs from "dayjs";
import styled from "styled-components";

const SendForm = () => {
  const router = useRouter();
  const app_id = router.query.appId;

  const randomUuid = uuidv4();

  const [appservices, setAppservices] = useState([]);
  const [selectedSenderId, setSelectedSenderId] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("");

  const [isSnackBarAlertOpen, setIsSnackBarAlertOpen] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [eventType, setEventType] = useState("");
  const [eventMessage, setEventMessage] = useState("");
  const [eventTitle, setEventTitle] = useState("");

  const [schedule, setSchedule] = useState(false);

  const currentDateTime = dayjs();

  const ImportantText = styled.span`
    font-weight: semibold;
    font-size: 0.8em; /* Adjust the font size as needed */
    // background-color: yellow; /* You can change the background color to highlight the text */
    // padding: 1px 2px; /* Add padding for better visual appearance */
    // border: 1px solid #000; /* Add a border for better visibility */
    em {
      font-style: italic;
    }
    /* Additional styles can be added as needed */
  `;

  const [value, setValue] = useState(currentDateTime);
  // console.log("NEW VALUE!!!!!!!!", value);
  const handleDateTimeChange = (newValue) => {
    setValue(newValue);
  };

  const handleSwitchChange = (event) => {
    setSchedule(event.target.checked);
  };

  const initialState = {
    destination: "",
    content: "",
    scheduled: value,
  };

  const [state, setState] = React.useState(initialState);

  const channels = ["WHATSAPP", "SHORTCODE", "SENDERNAME"];

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const originalContent = state.content;
    const formattedContent = originalContent.replace(/\n/g, "\\n");

    const newSms = {
      destination: state.destination,
      content: formattedContent,
      requestid: randomUuid,
      scheduled: value,
      channel: selectedChannel,
      organization_id: app_id
    };

    const res = sendSms({ selectedSenderId, newSms }).then((res) => {
      if (res.status === 202) {
        setEventType("success");
        setEventMessage("Message Sent Successfully");
        setEventTitle("MESSAGE SEND");
        setIsSnackBarAlertOpen(true);
      } else {
        setEventType("fail");
        setEventMessage("FAILED to send message!");
        setEventTitle("MESSAGE SEND");
        setIsSnackBarAlertOpen(true);
      }
      setIsButtonClicked(false);
    });
    setState(initialState);
    return res;
  };

  const getAppServices = () => {
    appservicesAction({selectedChannel,app_id})
      .then((res) => {
        if (res.errors) {
          console.log("AN ERROR HAS OCCURED");
        } else {
          setAppservices(res.data);
          setSelectedSenderId(res.data[0]?.service_id || "");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAppServices();
  }, [app_id, selectedChannel]);

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
          <h2 className="mt-4 text-xl font-semibold">Send Message</h2>
          <p className="mb-16 text-gray-700">
            Send message to a single contact
          </p>
          <Card>
            <CardContent>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Fields marked with <span style={{ color: "red" }}>*</span> are
                required.
              </Typography>
              <form className="m-4" onSubmit={handleSubmit}>
                <Stack spacing={2} direction="column" sx={{ marginBottom: 4 }}>
                  <div>
                    <InputLabel htmlFor="select-channel">
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
                    >
                      {channels.map((channel) => (
                        <MenuItem key={channel} value={channel}>
                          {channel}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>

                  <div>
                    <InputLabel htmlFor="select-sender">
                      <span style={{ color: "red" }}>*</span>Select Sender Id
                    </InputLabel>
                    <Select
                      id="select-sender"
                      value={selectedSenderId}
                      onChange={(event) =>
                        setSelectedSenderId(event.target.value)
                      }
                      variant="outlined"
                      color="secondary"
                      fullWidth
                      required
                    >
                      {appservices.map((appservice) => (
                        <MenuItem
                          key={appservice.service_id}
                          value={appservice.service_id}
                        >
                          {appservice.sendername}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                </Stack>
                <InputLabel htmlFor="file-upload">
                  <span style={{ color: "red" }}>*</span>Enter Mobile Number
                </InputLabel>
                <TextField
                  id="destination"
                  name="destination"
                  type="number"
                  variant="outlined"
                  color="secondary"
                  label="Mobile"
                  placeholder="254711438911"
                  onChange={handleChange}
                  value={state.destination}
                  required
                  fullWidth
                  sx={{ mb: 4 }}
                />
                <InputLabel htmlFor="file-upload">
                  <span style={{ color: "red" }}>*</span>Type your message
                  here(max 140 characters)
                </InputLabel>
                <TextareaAutosize
                  id="content"
                  name="content"
                  aria-label="empty textarea"
                  placeholder="Hello ^FIRSTNAME^ ^LASTNAME^ from the county of ^COUNTY^. Receieve this sms to your mobile number - ^PHONENUMBER^."
                  value={state.content}
                  onChange={handleChange}
                  minRows={3}
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
                

                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={schedule}
                        onChange={handleSwitchChange}
                      />
                    }
                    label="*Turn on to send scheduled Message*"
                  />
                </FormGroup>
                {schedule ? (
                  <div className="my-4">
                    <MaterialUIPickers
                      value={value}
                      onChange={handleDateTimeChange}
                    />
                  </div>
                ) : (
                  <></>
                )}
                <div>
                <button
                  className="bg-blue-900 text-white font-normal my-4 py-1.5 px-5 rounded text-[14px]"
                  onClick={(e) => {
                    handleSubmit(e);
                    setIsButtonClicked(true);
                  }}
                >
                  {isButtonClicked ? "SENDING..." : "SEND"}
                </button>
                </div>

                <ImportantText>
                  To send an sms with dynamic attributes, first identify the
                  attributes the contacts have available(You can find them on
                  the contact list under 'More').<br/> These will be the column names
                  in the csv that was used to upload contacts.
                  <br />
                  Paste your message in the message field. Each dynamic
                  attribute in the message should be CAPITALISED and enclosed by
                  the Caret/Hat symbol(^).<br/> For example , if my contacts have a
                  firstname attribute, this will be put in the message as-
                  ^FIRSTNAME^. 
                </ImportantText>
                
              </form>
            </CardContent>
          </Card>
        </div>
      </React.Fragment>
    </MiniDrawer>
  );
};

export default SendForm;
