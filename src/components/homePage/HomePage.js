import React, { Component } from "react";
import { useState, useEffect } from "react";
import Link from "@mui/material/Link";
import "./home.css";
import Navbar from "../nav/Nav";
import { Button } from "@mui/material";
import axios from "axios";

function Home(props) {
  const API = process.env.REACT_APP_API_URL;
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [load, setLoad] = useState("");
  useEffect(() => {
    setAllRestaurants(props.allRestaurants);
  }, [props.allRestaurants]);

  const handleLoad = (id) => {
    setLoad(id);
  };

  const handleDelete = (id) => {
    axios
      .delete(`${API}/restaurants/${id}`)
      .then((response) => {
        handleLoad(response.id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const listOfRestaurants = allRestaurants.map((rest) => {
    return (
      <div className="restaurants" key={rest.id}>
        <Link href={`/restaurants/${rest.id}`} underline="none">
          <h3>{rest.name}</h3>
          <p>{rest.cuisine}</p>
          <p>{rest.location}</p>
          <p className="price">{rest.price}</p>
        </Link>
        <div className="delete">
          <Button className="button" onClick={() => handleDelete(rest.id)}>
            Delete Restaurant
          </Button>
        </div>
      </div>
    );
  });
  return (
    <>
      <Navbar getAllRestaurants={props.getAllRestaurants} load={load} />
      <div className="container">
        <div className="home">{listOfRestaurants}</div>
      </div>
    </>
  );
}

export default Home;
