import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import "./newRestaurant.css";
import { Button } from "@mui/material";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddNewRestaurant() {
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addRestaurant, setAddRestaurant] = useState({
    name: "",
    description: "",
    phoneNumber: "",
    openingTime: "",
    closingTime: "",
    price: "",
    cuisine: "",
    location: "",
    diningRestriction: "",
  });

  useEffect(() => {
    if (phoneNumber.length === 12) {
      setAddRestaurant({ ...addRestaurant, phoneNumber: phoneNumber.slice(2) });
    }
  }, [phoneNumber]);

  const handleTextChange = (event) => {
    const { id, value } = event.target;

    setAddRestaurant({ ...addRestaurant, [id]: value });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAddRestaurant({ ...addRestaurant, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`${API}/restaurants`, addRestaurant)
      .then((response) => {
        console.log(response.data);
        navigate(`/restaurants/${response.data.id}`);
      })
      .catch((error) => console.warn(error));
    // setAddRestaurant({
    //   name: "",
    //   description: "",
    //   phoneNumber: phoneNumber,
    //   openingTime: "",
    //   closingTime: "",
    //   price: "",
    //   cuisine: "",
    //   location: "",
    //   diningRestriction: "",
    // });
  };
  console.log(addRestaurant);
  console.log(phoneNumber.length);
  return (
    <div className="Form-Container">
      <form onSubmit={handleSubmit} method="post" className="Form">
        <div className="Form-Input">
          <TextField
            className="TextField"
            required
            onChange={handleTextChange}
            value={addRestaurant.name}
            id="name"
            label="Name"
            placeholder="Name"
            type="text"
          />
        </div>

        <div class="Form-Input">
          <TextField
            className="TextField"
            required
            onChange={handleTextChange}
            value={addRestaurant.description}
            id="description"
            label="Description"
            placeholder="Description"
            multiline
            type="text-area"
          />
        </div>

        <div className="Form-Input">
          <TextField
            className="TextField"
            required
            onChange={handleTextChange}
            value={addRestaurant.location}
            id="location"
            label="City"
            placeholder="City"
            type="text"
          />
        </div>

        <div className="Form-Input">
          <PhoneInput
            required
            className="Phone"
            placeholder="1 XXX XXXX"
            id="phoneNumber"
            value={phoneNumber}
            onChange={setPhoneNumber}
          />
        </div>

        <div className="Form-Input">
          <Select
            className="Menu"
            required
            name="price"
            value={addRestaurant.price}
            onChange={handleChange}
            displayEmpty
          >
            <MenuItem value="">
              <em>Price</em>
            </MenuItem>
            <MenuItem value="$">"$"</MenuItem>
            <MenuItem value="$$">"$$"</MenuItem>
            <MenuItem value="$$$">"$$$"</MenuItem>
          </Select>
        </div>

        <div className="Form-Input">
          <Select
            className="Menu"
            required
            name="diningRestriction"
            value={addRestaurant.diningRestriction}
            onChange={handleChange}
            displayEmpty
          >
            <MenuItem value="">
              <em>Restrictions</em>
            </MenuItem>
            <MenuItem value="Takeout Only">"Takeout Only"</MenuItem>
            <MenuItem value="Delivery Only">"Delivery Only"</MenuItem>
          </Select>
        </div>

        <div className="Form-Time">
          <label>Opening Time</label>
          <input
            required
            className="Time"
            id="openingTime"
            type="time"
            step="1"
            value={addRestaurant.openingTime}
            placeholder="Opening Time"
            onChange={handleTextChange}
          />
        </div>

        <div className="Form-Time">
          <label>Closing Time</label>
          <input
            required
            className="Time"
            id="closingTime"
            type="time"
            step="1"
            value={addRestaurant.closingTime}
            placeholder="Closing Time"
            onChange={handleTextChange}
          />
        </div>

        <div className="Form-Input">
          <TextField
            className="TextField"
            required
            onChange={handleTextChange}
            value={addRestaurant.cuisine}
            id="cuisine"
            label="cuisine"
            placeholder="Type Of Cuisine"
            type="text"
          />
        </div>
        <div className="Form-Input">
          <></>
        </div>

        <div className="Form-Button">
          <Button className="Button" variant="contained" type="submit">
            Add Restaurant
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddNewRestaurant;
