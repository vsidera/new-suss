import React from "react";
import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { Box, CardContent, InputLabel, Select, Button, MenuItem } from "@mui/material";
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
  contactDetails
}) => {
  const [isSnackBarAlertOpen, setIsSnackBarAlertOpen] = useState(false);
  const [eventType, setEventType] = useState("");
  const [eventMessage, setEventMessage] = useState("");
  const [eventTitle, setEventTitle] = useState("");

  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");

  console.log("CONTACT DETAILS IS!!!!!!!",contactDetails)

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      "group_id": selectedGroup,
      "contact_ids": selectedContactIds
    }

    const res = contactsAttach({ app_id, data}).then((res) => {
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
            <CardContent style={{ width: "60%" }}>
            
            <form className="m-4" onSubmit={handleSubmit}>
            <p className="text-md content-center items center mb-4">
                  Pick a group below to attach the selected contacts to it
                </p>
                <InputLabel htmlFor="select-option">
                  <span style={{ color: "red" }}>*</span>Select Group
                </InputLabel>
                <Select
                  id="select-option"
                  value={selectedGroup}
                  onChange={(event) => setSelectedGroup(event.target.value)}
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  required
                  sx={{ mb: 4 }}
                >
                  {groups.map((group) => (
                    <MenuItem key={group.group_id} value={group.group_id}>
                      {group.name}
                    </MenuItem>
                  ))}
                </Select>

                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#094C95 !important",
                    color: "#FFFFFF !important",
                    "&:hover": { backgroundColor: "#001041 !important" },
                  }}
                  type="submit"
                >
                  Add to Group
                </Button>
              </form>
            </CardContent>
          </Box>
        </div>
      </Modal>
    </>
  );
};

export default MoreModal;
