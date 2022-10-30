import * as React from "react";
// import date-fns from "date-fns";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";

export default function MaterialUIPickers({ getDateTime }) {
  const [dateWithInitialValue, setDateWithInitialValue] = React.useState(null);

  console.log(dateWithInitialValue);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MobileDateTimePicker
        value={dateWithInitialValue}
        onChange={(newValue) => {
          setDateWithInitialValue(() => newValue);
          getDateTime(dateWithInitialValue);
        }}
        label="Pick Date and Time"
        onError={console.log}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
