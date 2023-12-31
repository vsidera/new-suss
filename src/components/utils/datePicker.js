import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function DatePickerValue({
  fromDate,
  setFromDate,
  toDate,
  setToDate,
}) {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={{ display: "flex", gap: "16px" }}>
        <div className="mx-2">
          <DatePicker
            label="From Date"
            value={fromDate}
            onChange={(newValue) => setFromDate(newValue)}
            renderInput={(params) => (
              <TextField {...params} style={{ width: "100px" }} />
            )}
            inputProps={{ style: { fontSize: "8px", padding: "8px" } }}
          />
        </div>
        <div className="mx-2">
          <DatePicker
            label="To Date"
            value={toDate}
            onChange={(newValue) => setToDate(newValue)}
            renderInput={(params) => (
              <TextField {...params} style={{ width: "100px" }} />
            )}
            inputProps={{ style: { fontSize: "2px", padding: "2px" } }}
          />
        </div>
      </div>
    </LocalizationProvider>
  );
}
