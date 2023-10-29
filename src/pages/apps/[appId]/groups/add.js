
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
} from "@mui/material";
import SnackbarAlert from "../../../../components/utils/snackbar";
import { groupCreate } from "../../../api/actions/groups/groupsActions";
import { useRouter } from "next/router";

const CreateGroup = () => {
  const router = useRouter();
  const app_id = router.query.appId;

  const [isSnackBarAlertOpen, setIsSnackBarAlertOpen] = useState(false);
  const [eventType, setEventType] = useState("");
  const [eventMessage, setEventMessage] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const [state, setState] = React.useState({
    name: "",
    description: ""
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

    const newGroup = {
      name: state.name,
      description: state.description,
    };

    const res = groupCreate({ app_id, newGroup }).then((res) => {
      if (res.status === 201) {
        setEventType("success");
        setEventMessage("Group Successfully Created");
        setEventTitle("Group CREATE");
        setIsSnackBarAlertOpen(true);
      } else {
        setEventType("fail");
        setEventMessage("Group NOT Created");
        setEventTitle("Group CREATE");
        setIsSnackBarAlertOpen(true);
      }
    });

    return res;
  };
  return (
    <MiniDrawer>
      <React.Fragment>
        <SnackbarAlert
          open={isSnackBarAlertOpen}
          type={eventType}
          message={eventMessage}
          handleClose={() => setIsSnackBarAlertOpen(false)}
          title={eventTitle}
        />
        <div className="m-16">
          <h2 className="mt-4 text-xl font-semibold">Create Group</h2>
          <p className="mb-24 text-gray-700">
            This will create a group.
          </p>
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
                  name="name"
                  variant="outlined"
                  color="secondary"
                  label="Group Name"
                  placeholder="Length should be less than 32 characters"
                  value={state.name}
                  onChange={handleChange}
                  fullWidth
                  required
                  sx={{ mb: 4 }}
                  inputProps={{ maxLength: 32 }}
                />
                <TextField
                  type="text"
                  name="description"
                  variant="outlined"
                  color="secondary"
                  label="Description"
                  placeholder="Describes the group"
                  value={state.description}
                  onChange={handleChange}
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

export default CreateGroup;
