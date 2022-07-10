import * as React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormattedNavbar from "../nav/FormattedNav";
import axios from "axios";
import TextField from "@mui/material/TextField";
import PhoneInput from "react-phone-number-input";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import "./editRestaurant.css";

function EditRestaurant() {
  const navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${API}/restaurants/${id}`)
      .then((response) => {
        setRestaurant({
          name: response.data.name,
          description: response.data.description,
          phoneNumber: response.data.phoneNumber,
          openingTime: response.data.openingTime,
          closingTime: response.data.closingTime,
          price: response.data.price,
          cuisine: response.data.cuisine,
          location: response.data.location,
          diningRestriction: response.data.diningRestriction,
        });
      })
      .catch((error) => console.log(error));
  }, [id]);

  const handleTextChange = (event) => {
    const { id, value } = event.target;

    setRestaurant({ ...restaurant, [id]: value });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRestaurant({ ...restaurant, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (restaurant.phoneNumber.length > 12) {
      setError("Must be a USA number");
    } else if (restaurant.phoneNumber.length === 12) {
      axios
        .patch(`${API}/restaurants/${id}`, { ...restaurant, phoneNumber: restaurant.phoneNumber.slice(2) })
        .then((response) => {
          navigate(`/restaurants/${id}`);
        })
        .catch((error) => console.warn(error));
    } else if (restaurant.phoneNumber.length === 10) {
      axios
        .patch(`${API}/restaurants/${id}`, restaurant)
        .then((response) => {
          navigate(`/restaurants/${id}`);
        })
        .catch((error) => console.warn(error));
    }
  };

  return (
    <div>
      <div className="format-nav">
        <FormattedNavbar />
      </div>
      <div className="Form-Container">
        <form onSubmit={handleSubmit} method="post" className="Form">
          <div className="Form-Input">
            <TextField
              className="TextField"
              required
              onChange={handleTextChange}
              value={restaurant.name}
              id="name"
              placeholder="Name"
              type="text"
            />
          </div>

          <div className="Form-Input">
            <TextField
              className="TextField"
              required
              onChange={handleTextChange}
              value={restaurant.description}
              id="description"
              placeholder="Description"
              maxRows={2}
              multiline
              type="text-area"
            />
          </div>

          <div className="Form-Input">
            <TextField
              className="TextField"
              required
              onChange={handleTextChange}
              value={restaurant.location}
              id="location"
              placeholder="City"
              type="text"
            />
          </div>

          <div className="Form-Input">
            <PhoneInput
              required
              className="edit-phone"
              placeholder="1 XXX XXXX"
              name="phoneNumber"
              value={restaurant.phoneNumber}
              country="US"
              defaultCountry="US"
              onChange={(value) => setRestaurant({ ...restaurant, phoneNumber: value })}
            />

            <p className="error" style={{ color: "red" }}>
              {error}
            </p>
          </div>

          <div className="Form-Input">
            <Select
              className="Menu"
              required
              name="price"
              value={restaurant.price}
              onChange={handleChange}
              displayEmpty
            >
              <MenuItem value="" disabled>
                <em>Price</em>
              </MenuItem>
              <MenuItem value="$">$</MenuItem>
              <MenuItem value="$$">$$</MenuItem>
              <MenuItem value="$$$">$$$</MenuItem>
              <MenuItem value="$$$$">$$$$</MenuItem>
            </Select>
          </div>

          <div className="Form-Input">
            <Select
              className="Menu"
              required
              name="diningRestriction"
              value={restaurant.diningRestriction}
              onChange={handleChange}
              displayEmpty
            >
              <MenuItem value="" disabled>
                <em>Restrictions</em>
              </MenuItem>
              <MenuItem value="Takeout Only">Takeout Only</MenuItem>
              <MenuItem value="Delivery Only">Delivery Only</MenuItem>
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
              value={restaurant.openingTime}
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
              value={restaurant.closingTime}
              placeholder="Closing Time"
              onChange={handleTextChange}
            />
          </div>

          <div className="Form-Input">
            <TextField
              className="TextField"
              required
              onChange={handleTextChange}
              value={restaurant.cuisine}
              id="cuisine"
              placeholder="Type Of Cuisine"
              type="text"
            />
          </div>
          <div className="Form-Input">
            <></>
          </div>

          <div className="Form-Button">
            <Button className="Button" variant="contained" type="submit">
              Edit Restaurant
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditRestaurant;
