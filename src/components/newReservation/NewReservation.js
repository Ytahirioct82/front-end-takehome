import { useState, useEffect } from "react";
import * as React from "react";
import axios from "axios";
import FormatDate from "../../format/formatDate";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import PhoneInput from "react-phone-number-input";
import "./newReservation.css";
import { useNavigate } from "react-router-dom";

function MakeReservation(props) {
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [date, setDate] = useState("");
  const [capacity, setCapacity] = useState({});
  const [existingReservations, setExistingReservations] = useState([]);
  const [newReservation, setNewReservation] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    time: "",
    numGuests: "",
    restaurantId: props.id,
  });

  useEffect(() => {
    if (!date) {
      getDate();
    }
    if (phoneNumber) {
      if (phoneNumber.length === 12) {
        setNewReservation({ ...newReservation, phoneNumber: phoneNumber.slice(2) });
        setError("");
      } else if (phoneNumber.length > 12) {
        setError("Must be a USA number");
      }
    }
    setCapacity(props.restaurantCapacity);
    axios.get(`${API}/restaurants/${props.id}/reservations`).then((response) => {
      const reserve = [];
      response.data.forEach((res) => {
        if (FormatDate(res.time, "date") === date) {
          reserve.push({
            numGuests: res.numGuests,
            time: Number(res.time.slice(11, 13)),
            date: FormatDate(res.time, "date"),
          });
        }
      });
      setExistingReservations(reserve);
    });
  }, [props.id, props.restaurantCapacity, date, phoneNumber]);

  const getDate = () => {
    let date = new Date().toDateString();
    setDate(FormatDate(date, "date"));
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
  existingReservations.length &&
    existingReservations.forEach((res, i) => {
      timeSlots[res.time - start][guestsToTable[res.numGuests]] -= 1;
    });

  const months = {
    January: "01",
    February: "02",
    March: "03",
    April: "04",
    May: "05",
    June: "06",
    July: "07",
    August: "08",
    September: "09",
    October: "10",
    November: "11",
    December: "12",
  };

  const available = timeSlots.map((element) => {
    const key = guestsToTable[newReservation.numGuests];
    const availability = element[key];
    let time = "";
    if (element.label > 12) {
      time = element.label - 12 + ":00PM";
    } else if (element.label === 12) {
      time = element.label + ":00PM";
    } else if (element.label < 12) {
      time = element.label + ":00AM";
    }
    return (
      <Button
        name="time"
        value={element.label}
        key={element.label}
        className="Button"
        variant="contained"
        disabled={availability === 0}
        onClick={() => {
          const newDate = date.split(" ")[2] + "-" + months[date.split(" ")[0]] + "-" + date.split(" ")[1];

          setNewReservation({
            ...newReservation,
            time: `${newDate}T${element.label}:00:00.000Z`,
          });
        }}
      >
        {time}
      </Button>
    );
  });

  const handleDate = (newValue) => {
    setDate(FormatDate(newValue, "date"));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setNewReservation({ ...newReservation, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`${API}/reservations`, newReservation)
      .then((response) => {
        navigate(`/reservation/${response.data.id}`);
      })
      .catch((error) => console.warn(error));
  };

  const style = Object.values(newReservation).filter((entry) => entry !== "").length === 7 ? "button-color" : "button";

  return (
    <div className="new-reservation-container">
      <form onSubmit={handleSubmit} method="post" className="Form">
        <div className="new-reservation">
          <div className="reservation">
            <TextField
              className="TextField"
              required
              onChange={handleChange}
              value={newReservation.firstName}
              name="firstName"
              label="First Name"
              placeholder="First Name"
              type="text"
            />
          </div>

          <div className="reservation">
            <TextField
              className="TextField"
              required
              onChange={handleChange}
              value={newReservation.lastName}
              name="lastName"
              label="Last Name"
              placeholder="Last Name"
              type="text"
            />
          </div>

          <div className="reservation">
            <PhoneInput
              required
              className="phone"
              placeholder="1 XXX XXXX"
              id="phoneNumber"
              value={phoneNumber}
              country="US"
              defaultCountry="US"
              onChange={setPhoneNumber}
            />
            <p className="error" style={{ color: "red" }}>
              {error}
            </p>
          </div>

          <div>
            <TextField
              className="TextField"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleChange}
              value={newReservation.email}
            />
          </div>

          <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Date Of Reservation"
                inputFormat="MM/dd/yyyy"
                value={date}
                onChange={handleDate}
                renderInput={(params) => <TextField className="date" {...params} />}
              />
            </LocalizationProvider>
          </div>

          <div className="reservation">
            <Select
              className="guests"
              required
              name="numGuests"
              value={newReservation.numGuests}
              onChange={handleChange}
              displayEmpty
            >
              <MenuItem value="" disabled>
                <em>Number OF Guests</em>
              </MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
            </Select>
          </div>
        </div>
        <div className="time">{available}</div>
        <div className="form-button">
          <Button className={style} variant="contained" type="submit">
            SUBMIT RESERVATION
          </Button>
        </div>
      </form>
    </div>
  );
}

export default MakeReservation;
