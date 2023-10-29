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
} from "@mui/material";
import { saveAs } from "file-saver";
import { groupsAction } from "../../../api/actions/groups/groupsActions";
import { contactsUpload } from "../../../api/actions/contacts/contactsAction";
import SnackbarAlert from "../../../../components/utils/snackbar";
import { useRouter } from "next/router";
import styled from 'styled-components';

const UploadForm = () => {

  const router = useRouter();
  const app_id = router.query.appId;

  
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSnackBarAlertOpen, setIsSnackBarAlertOpen] = useState(false);
  const [eventType, setEventType] = useState("");
  const [eventMessage, setEventMessage] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  
  const ImportantText = styled.span`
  font-size: 0.8em; /* Adjust the font size as needed */
  background-color: yellow; /* You can change the background color to highlight the text */
  padding: 2px 4px; /* Add padding for better visual appearance */
  border: 1px solid #000; /* Add a border for better visibility */

  /* Additional styles can be added as needed */
`;

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const getGroups = () => {
    groupsAction({ app_id, limit, page })
      .then((res) => {
        if (res.errors) {
          console.log("AN ERROR HAS OCCURED");
        } else {
          setGroups(res.data);
          setSelectedGroup(res.data[0]?.group_id || "");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getGroups();
    setIsLoaded(true);
  }, [page, limit]);

  console.log("THE SELECTED GROUP IS!!!!!!!", selectedGroup)


  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!selectedFile || !selectedGroup) {
      console.log('Please select a file and a group');
      return;
    }

    console.log("SELECTED FILE IS!!!!!!", selectedFile)
  
    const formValues = {
      app_id: app_id,
      selectedGroup: selectedGroup,
      contacts: selectedFile,
    };
  
    const res = contactsUpload(formValues)
      .then((res) => {
        if (res.status === 200) {
          setEventType("success");
          setEventMessage("Bulk Contacts Successfully Created");
          setEventTitle("Bulk Contacts CREATE");
          setIsSnackBarAlertOpen(true);
        } else {
          setEventType("fail");
          setEventMessage("Failed. Check for Duplicates");
          setEventTitle("Bulk Contacts CREATE");
          setIsSnackBarAlertOpen(true);
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  
    return res;
  };
  
  

  function handleDownloadTemplate() {
    // Create the template data in the desired format (e.g., JSON)
    const templateData = [
      {
        mobile: "254711223344",
        firstName: "John",
        lastName: "Doe"
       
      },
      {
        mobile: "254722334455",
        firstName: "Jane",
        lastName: "Smith"
      },
      // Add more sample data as needed
    ];

    // Convert the template data to an Excel-compatible format (e.g., CSV)
    const csvData = convertToCsv(templateData);

    // Create a Blob from the CSV data
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });

    // Save the Blob as a file with the desired filename
    saveAs(blob, "contact_template.csv");
  }

  function convertToCsv(data) {
    // Convert the data to CSV format (you can use a library like `papaparse` for more complex formatting)
    const csvRows = [];
    const headers = Object.keys(data[0]);

    csvRows.push(headers.join(","));

    for (const row of data) {
      const values = headers.map((header) => row[header]);
      csvRows.push(values.join(","));
    }

    return csvRows.join("\n");
  }

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
          <h2 className="mt-4 text-xl font-semibold">Add Bulk Contacts</h2>
          <p className="mb-24 text-gray-700">
            Bulk upload contacts from a csv file
          </p>
          <div className="mb-4">
            <div style={{ display: "flex", alignItems: "center" }}>
              <p className="mr-4">Use this as a template:</p>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#094C95 !important",
                  color: "#FFFFFF !important",
                  "&:hover": { backgroundColor: "#001041 !important" },
                  padding: "8px 16px", // Adjust the padding to reduce button size
                  fontSize: "14px", // Adjust the font size to reduce button size
                  height: "32px", // Adjust the height to reduce button size
                }}
                onClick={handleDownloadTemplate}
              >
                Download Template
              </Button>
            </div>
          </div>

          <Card>
            <CardContent>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Fields marked with <span style={{ color: "red" }}>*</span> are
                required.
              </Typography>
              <form className="m-4" onSubmit={handleSubmit}>
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
                <InputLabel htmlFor="file-upload">
                  Click on 'Choose file' below to select a csv file.<br/>

                </InputLabel>

                
                <Input
                  id="file-upload"
                  type="file"
                  variant="outlined"
                  color="secondary"
                  onChange={handleFileSelect} 
                  fullWidth
                  required
                  sx={{ mb: 1 }}
                />
                <ImportantText>
                The first column in the csv should be the phone number.The phone numbers should all start with 254. You can add any other columns after.<br/>
                </ImportantText>
                <ImportantText>
                The column names will be the ATTRIBUTES that you can later use to send dynamic messages to the contacts.Any attribute that you will later need when sending SMSs should be a column in this csv.<br/>
                </ImportantText>
                <ImportantText>
        There should not be NO DUPLICATE phone numbers within the CSV file. To check for duplicates, you can{" "}
        <a
          href="https://www.anyjson.in/csv-remove-duplicates"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
        >
          Upload your file to this online formatter
        </a>
        , click on 'Remove Duplicates', & download the resulting file.
        <br />
      </ImportantText>

                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    backgroundColor: "#094C95 !important",
                    color: "#FFFFFF !important",
                    "&:hover": { backgroundColor: "#001041 !important" },
                  }}
                  type="submit"
                >
                  Upload
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </React.Fragment>
    </MiniDrawer>
  );
};

export default UploadForm;
