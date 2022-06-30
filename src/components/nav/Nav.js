import React, { Component } from "react";
import Link from "@mui/material/Link";
import "./nav.css";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const API = process.env.REACT_APP_API_URL;

const Navbar = (props) => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [category, setCategory] = useState({
    cuisine: "",
  });
  const [getRestaurant, setGetRestaurant] = useState({
    name: "",
  });

  useEffect(() => {
    axios
      .get(`${API}/restaurants`)
      .then((response) => {
        setAllRestaurants(response.data.restaurants);
        props.getAllRestaurants(response.data.restaurants);
      })
      .catch((error) => console.warn("catch", error));
  }, [props.load]);

  const handleChange = (event) => {
    const { value } = event.target;
    setCategory({ cuisine: value });

    value &&
      axios
        .get(`${API}/restaurants?filters={"cuisine":"${value}"}`)
        .then((response) => {
          props.getAllRestaurants(response.data.restaurants);
        })
        .catch((error) => console.warn("catch", error));
  };

  const handleTextChange = (event) => {
    const { value } = event.target;
    setGetRestaurant({ ...getRestaurant, name: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .get(`${API}/restaurants?&searchTerm=${getRestaurant.name}`)
      .then((response) => {
        props.getAllRestaurants(response.data.restaurants);
      })
      .catch((error) => console.warn("catch", error));
    setGetRestaurant({ name: "" });
    setCategory({ cuisine: "" });
  };

  const cuisine = {};
  allRestaurants.forEach((rest) => {
    if (!cuisine[rest.cuisine]) {
      cuisine[rest.cuisine] = rest.cuisine;
    }
  });

  const selection = Object.keys(cuisine).map((rest, i) => {
    return (
      <MenuItem key={i} value={rest}>
        {rest}
      </MenuItem>
    );
  });
  return (
    <div className="Nav">
      <Box
        className="search"
        component="form"
        sx={{ flexGrow: 3 }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Grid container spacing={0}>
          <Grid item xs={3}>
            <Link href="/" underline="none">
              <h3>RESY</h3>
            </Link>
          </Grid>

          <Grid item xs={4}>
            <TextField
              value={getRestaurant.name}
              onChange={handleTextChange}
              label="search by restaurant"
              type="search"
              autoComplete="current-restaurant"
            />
            <Button type="submit" variant="outlined">
              search
            </Button>
          </Grid>

          <Grid item xs={2}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                value={category.cuisine}
                onChange={handleChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="">
                  <em>Cuisine</em>
                </MenuItem>
                {selection}
              </Select>
            </FormControl>
          </Grid>

          <Link href="/newRestaurant" underline="none">
            <Button>Add Restaurant</Button>
          </Link>
        </Grid>
      </Box>
    </div>
  );
};

export default Navbar;
