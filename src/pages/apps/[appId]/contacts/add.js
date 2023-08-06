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
import { contactCreate } from "../../../api/actions/contacts/contactsAction";
import { useRouter } from "next/router";

const RegisterForm = () => {
  const router = useRouter();
  const app_id = router.query.appId;

  const [isSnackBarAlertOpen, setIsSnackBarAlertOpen] = useState(false);
  const [eventType, setEventType] = useState("");
  const [eventMessage, setEventMessage] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const [state, setState] = React.useState({
    mobile_no: "",
    firstname: "",
    lastname: "",
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

    const newContact = {
      mobile_no: state.mobile_no,
      attributes: {
        firstname: state.firstname,
        lastname: state.lastname,
      },
    };

    const res = contactCreate({ app_id, newContact }).then((res) => {
      if (res.status === 201) {
        setEventType("success");
        setEventMessage("Contact Successfully Created");
        setEventTitle("CONTACT CREATE");
        setIsSnackBarAlertOpen(true);
      } else {
        setEventType("fail");
        setEventMessage("Contact NOT Created");
        setEventTitle("CONTACT CREATE");
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
          <h2 className="mt-4 text-xl font-semibold">Add Single Contact</h2>
          <p className="mb-24 text-gray-700">
            Add a contact to a group
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
                <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                  <TextField
                    type="text"
                    name="firstname"
                    variant="outlined"
                    color="secondary"
                    label="First Name"
                    placeholder="John"
                    value={state.firstname}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                  <TextField
                    type="text"
                    name="lastname"
                    variant="outlined"
                    color="secondary"
                    label="Last Name"
                    placeholder="Doe"
                    value={state.lastname}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Stack>
                <TextField
                  type="email"
                  variant="outlined"
                  color="secondary"
                  label="Email"
                  placeholder="john.doe@gmail.com"
                  //   onChange={(e) => setEmail(e.target.value)}
                  //   value={email}
                  fullWidth
                  required
                  sx={{ mb: 4 }}
                />
                <TextField
                  type="number"
                  name="mobile_no"
                  variant="outlined"
                  color="secondary"
                  label="Mobile"
                  placeholder="254711223344"
                  value={state.mobile_no}
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
                  Add
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </React.Fragment>
    </MiniDrawer>
  );
};

export default RegisterForm;
