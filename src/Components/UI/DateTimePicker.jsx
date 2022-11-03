import * as React from "react";
// import date-fns from "date-fns";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";

export default function MaterialUIPickers({ setDateAndTime }) {
  const [dateWithInitialValue, setDateWithInitialValue] = React.useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MobileDateTimePicker
        value={dateWithInitialValue}
        onChange={(newValue) => {
          setDateWithInitialValue(() => newValue);
          setDateAndTime(newValue)
        }}
        label="Pick Date and Time"
        onError={console.log}
        required
        disablePast
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
