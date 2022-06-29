import { useState, useEffect } from "react";
import * as React from "react";
import axios from "axios";
import FormatDate from "../format/formatDate";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

function MakeReservation(props) {
  const [value, setValue] = useState("");
  const API = process.env.REACT_APP_API_URL;
  const [date, setDate] = useState("");
  const [capacity, setCapacity] = useState({});
  const [currentReservations, setCurrentReservations] = useState([]);

  useEffect(() => {
    if (!date) {
      getDate();
    }
    setCapacity(props.restaurantCapacity);
    axios.get(`${API}/restaurants/${props.id}/reservations`).then((response) => {
      response.data.forEach((res) => {
        console.log(res.time);
        if (FormatDate(res.time, "date") === date) {
          setCurrentReservations([
            ...currentReservations,
            {
              numGuests: res.numGuests,
              time: Number(res.time.slice(11, 13)),
              date: FormatDate(res.time, "date"),
            },
          ]);
        }
      });
    });
  }, [props.id, props.restaurantCapacity]);

  const getDate = () => {
    let date = new Date().toDateString();
    setDate(date.slice(4));
    // setDate(FormatDate("2022-05-11T18:00:00.000Z", "date"));
  };

  const guestsToTable = {
    1: "twoPersonTables",
    2: "twoPersonTables",
    3: "fourPersonTables",
    4: "fourPersonTables",
    5: "eightPersonTables",
    6: "eightPersonTables",
    7: "eightPersonTables",
    8: "eightPersonTables",
  };

  const start = capacity.opening && Number(capacity.opening.slice(0, 2));
  const end = capacity.closing && Number(capacity.closing.slice(0, 2));
  const timeSlots = [];

  for (let i = start; i < end; i++) {
    if (start) {
      timeSlots.push({
        label: i,
        twoPersonTables: capacity.twoPersonTables,
        fourPersonTables: capacity.fourPersonTables,
        eightPersonTables: capacity.eightPersonTables,
      });
    }
  }
  //   currentReservations.length &&
  //     currentReservations.forEach((res, i) => {
  //       timeSlots[res.time - start][guestsToTable[res.numGuests]] -= 1;
  //     });

  console.log(timeSlots);

  console.log(date);
  console.log(start, end);
  console.log(currentReservations);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  console.log(value);

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label="Date desktop"
          inputFormat="MM/dd/yyyy"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </div>
  );
}

export default MakeReservation;
