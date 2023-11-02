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

const MoreModal = ({
  moreModal,
  closeMoreModal,
  contactDetails,
}) => {

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

  if (!contactDetails || typeof contactDetails !== "object") {
    return <div>


    </div>;
  }

  return (
    <>
  
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
