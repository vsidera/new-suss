import React from "react";
import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import {
  Box,
  CardContent,
  InputLabel,
  Select,
  Button,
  MenuItem,
} from "@mui/material";
import AsyncSelect from "react-select/async";
import { groupsAction } from "../../pages/api/actions/groups/groupsActions";
import { contactsAttach } from "../../pages/api/actions/contacts/contactsAction";
import {
  serviceAttach,
  serviceSearch,
} from "../../pages/api/actions/services/servicesAction";
import SnackbarAlert from "../utils/snackbar";

const MoreModal = ({
  selectedContactIds,
  moreModal,
  closeMoreModal,
  contactDetails,
}) => {
  const [isSnackBarAlertOpen, setIsSnackBarAlertOpen] = useState(false);
  const [eventType, setEventType] = useState("");
  const [eventMessage, setEventMessage] = useState("");
  const [eventTitle, setEventTitle] = useState("");

  console.log("CONTACT DETAILS IS!!!!!!!", contactDetails);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      group_id: selectedGroup,
      contact_ids: selectedContactIds,
    };

    const res = contactsAttach({ app_id, data }).then((res) => {
      if (res.status === 200) {
        setEventType("success");
        setEventMessage("Contacts Successfully Attached");
        setEventTitle("CONTACTS ATTACH");
        setIsSnackBarAlertOpen(true);
      } else {
        setEventType("fail");
        setEventMessage("Contacts Already Attached");
        setEventTitle("CONTACTS ATTACH");
        setIsSnackBarAlertOpen(true);
      }
    });

    return res;
  };

  const greenButton = {
    backgroundColor: "green",
    color: "white",
  };

  const tableStyle = {
    fontFamily: "arial, sans-serif",
    borderCollapse: "collapse",
    width: "100%",
  };

  const cellStyle = {
    border: "1px solid #dddddd",
    textAlign: "left",
    padding: "8px",
  };

  const evenRowStyle = {
    backgroundColor: "#dddddd",
  };

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

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: "100%",
    }),
  };

  if (!contactDetails || typeof contactDetails !== "object") {
    return <div>No valid data to display</div>;
  }

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
        open={moreModal}
        sx={{ border: "none", boxShadow: "none" }}
        onClose={closeMoreModal}
      >
       <div>
      <Box sx={style}>
        <CardContent style={{ width: "80%" }}>
          <table style={tableStyle}>
            <tr>
              <th style={cellStyle}>Attribute</th>
              <th style={cellStyle}>Value</th>
            </tr>
            {Object.entries(contactDetails).map(([key, value], index) => (
              <tr key={key} style={index % 2 === 0 ? evenRowStyle : {}}>
                <td style={cellStyle}>{key}</td>
                <td style={cellStyle}>{value}</td>
              </tr>
            ))}
          </table>
        </CardContent>
      </Box>
    </div>
      </Modal>
    </>
  );
};

export default MoreModal;
