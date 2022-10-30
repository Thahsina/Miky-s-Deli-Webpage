import * as React from "react";
// import date-fns from "date-fns";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';

export default function MaterialUIPickers() {
  
    const [dateWithInitialValue, setDateWithInitialValue] = React.useState(
     
      );
    
  console.log(dateWithInitialValue)
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {/* <DateTimePicker
        label="Date&Time picker"
        value={value}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} />}
      /> */}

      <MobileDateTimePicker
        value={dateWithInitialValue}
        onChange={(newValue) => {
          setDateWithInitialValue(newValue);
        }}
        label="Pick Date and Time"
        onError={console.log}
        
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
