import React, { Component } from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./restaurant.css";
import { Link } from "react-router-dom";
import FormatPhoneNumber from "../../format/formatNumber";
import FormattedNavbar from "../nav/FormattedNav";
import MakeReservation from "../newReservation/NewReservation";

function GetRestaurant() {
  const [restaurant, setRestaurant] = useState({});
  const { id } = useParams();
  const API = process.env.REACT_APP_API_URL;
  useEffect(() => {
    axios
      .get(`${API}/restaurants/${id}`)
      .then((response) => {
        console.log(response.data);
        setRestaurant(response.data);
      })
      .catch((error) => console.warn("catch", error));
  }, [id]);

  console.log(restaurant.tables);

  return (
    <div>
      <div className="format-nav">
        <FormattedNavbar />
      </div>

      <div className="restaurant">
        <div className="Venue">
          <h1 className="Venue-Title">{restaurant.name}</h1>
          <div className="Container-Cuisine-Price">
            <div className="separator"></div>
            <span className="Cuisine">{restaurant.cuisine}</span>
            <div className="separator"></div>
            <span className="Price">{restaurant.price}</span>
          </div>
          <div className=".Content-Title">
            <h3>{`About ${restaurant.name}`}</h3>
          </div>
          <div className="Description">
            <p>{restaurant.description}</p>
          </div>
        </div>
        <div className="Info">
          <h1 className="Info-Title">Restaurant Info</h1>
          <div className="Location">
            <h4>Location</h4>
            <div>:</div>
            <p>{restaurant.location}</p>
          </div>
          <div className="Contact">
            <h4>Contact</h4>
            <div>:</div>
            <p>{FormatPhoneNumber(restaurant.phoneNumber)}</p>
          </div>
          <div className="Hours">
            <h4>Business Hours</h4>
            <div>:</div>
            <p className="Open">{restaurant.openingTime}</p>
            <div>-</div>
            <p>{restaurant.closingTime}</p>
          </div>
          <div className="Info-Cuisine">
            <h4>Cuisine</h4>
            <div>:</div>
            <p>{restaurant.cuisine}</p>
          </div>
          <div className="Info-Price">
            <h4>Price</h4>
            <div>:</div>
            <p>{restaurant.price}</p>
          </div>
          <div className="Info-Link">
            <Link to={`/reservations/${id}`}>Check Reservations</Link>
          </div>
        </div>
      </div>
      <div>
        <MakeReservation
          id={id}
          restaurantCapacity={{
            ...restaurant.tables,
            opening: restaurant.openingTime,
            closing: restaurant.closingTime,
          }}
        />
      </div>
    </div>
  );
}

export default GetRestaurant;
