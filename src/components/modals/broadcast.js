import React from "react";
import { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import { Box, CardContent, FormControl, InputLabel, MenuItem, Select, TextField, TextareaAutosize } from "@mui/material";
import SnackbarAlert from "../utils/snackbar";
import { broadcastMessages } from "../../pages/api/actions/messages/messagesAction";
// import {useParams} from 'react-router-dom';
import { appservicesAction } from "../../pages/api/actions/appservices/appservicesAction";
import { v4 as uuidv4 } from "uuid";

const BroadcastModal = ({ broadcastModal, closeBroadcastModal, selectedPhoneNumbers }) => {
  const randomUuid = uuidv4();

  const [isSnackBarAlertOpen, setIsSnackBarAlertOpen] = useState(false);
  const [eventType, setEventType] = useState("");
  const [eventMessage, setEventMessage] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [selectedId, setSelectedId] = useState("");

  // const params = useParams();

  const app_id = 1

  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const [appservices, setAppservices] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [state, setState] = React.useState({
    content: "",
  });

  const greenButton = {
    backgroundColor: "green",
    color: "white",
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newSms = {
      requestid: randomUuid,
      content: state.content,
      scheduled: "2023-03-22T06:31:05",
      destinations: selectedPhoneNumbers

    };

    const res = broadcastMessages({selectedId,newSms}).then((res) => {
      if (res.status === 404) {
        setEventType("success");
        setEventMessage("Bulk SMS Sent");
        setEventTitle("BROADCAST");
        setIsSnackBarAlertOpen(true);
      } else {
        setEventType("success");
        setEventMessage("Bulk SMS Sent");
        setEventTitle("BROADCAST");
        setIsSnackBarAlertOpen(true);
      }
    });

    return res;
  };

  const getAppServices = () => {

    appservicesAction(app_id)
      .then((res) => {
        if (res.errors) {
          console.log("AN ERROR HAS OCCURED");
        } else {
          setAppservices(res.data);
          setIsLoaded(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAppServices();
  }, []);

  console.log("APP SERVICE ARES!!!!!!", appservices)

  const style = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-40%, -20%)",
    width: 600,
    height: 450,
    bgcolor: "#ffff",
    outline: "none",
    border: "none",
    // boxShadow: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
  };

  return (
    <>
      <SnackbarAlert
        open={isSnackBarAlertOpen}
        type={eventType}
        message={eventMessage}
        handleClose={() => setIsSnackBarAlertOpen(false)}
        title={eventTitle}
      />
      <Modal
        open={broadcastModal}
        sx={{ border: "none", boxShadow: "none" }}
        onClose={closeBroadcastModal}
      >
        <div>
          <Box sx={style}>
            <CardContent style={{ width: "60%" }}>
              <div className="text-center content-center">
                <p className="text-xl">SEND BULK SMS</p>

                <br />

                <div style={{ display: "flex", flexDirection: "column" }}>
                <div className="my-2">
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel id="name-label">Sender Id</InputLabel>
                    <Select
                      labelId="name-label"
                      id="name"
                      value={selectedId}
                      label="Name"
                      onChange={(e) => setSelectedId(e.target.value)}
                    >
                      {appservices.map((obj) => (
                        <MenuItem key={obj.id} value={obj.sendername}>{obj.sendername}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                    </div>
                  <div className="my-2">
                    <TextareaAutosize
                      name="content"
                      id="content"
                      aria-label="empty textarea"
                      placeholder="This allows a maximum of 140 characters"
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
                  </div>
                  <button
                    className="bg-blue-900 text-white font-normal py-1.5 px-5 rounded text-[14px] w-full"
                    style={{
                      marginTop: "2rem",
                      alignSelf: "center",
                      ...(isButtonClicked ? greenButton : {}),
                    }}
                    onClick={(e) => {
                      handleSubmit(e);
                      setIsButtonClicked(true);
                    }}
                  >
                    {isButtonClicked ? "SUBMITTED" : "SUBMIT"}
                  </button>
                </div>
              </div>
            </CardContent>
          </Box>
        </div>
      </Modal>
    </>
  );
};

export default BroadcastModal;
