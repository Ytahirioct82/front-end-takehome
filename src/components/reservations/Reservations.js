import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./reservations.css";
import FormatPhoneNumber from "../../format/formatNumber";
import FormattedNavbar from "../nav/FormattedNav";

const GetRestaurantReservations = () => {
  const { id } = useParams();
  const [reservations, setReservations] = useState([]);
  const [restaurantName, setRestaurantName] = useState("");
  const API = process.env.REACT_APP_API_URL;
  useEffect(() => {
    axios
      .get(`${API}/restaurants/${id}`)
      .then((response) => {
        console.log(response.data);
        setReservations(response.data.reservations);
        setRestaurantName(response.data.name);
      })
      .catch((error) => console.log(error));
  }, []);

  const reservationsInfo = reservations[0] ? (
    reservations.map((res) => {
      return (
        <div key={res.id} className="res">
          <Link style={{ textDecoration: "none" }} to={`/reservation/${id}/${res.id}`}>
            <h3>{`${res.firstName} ${res.lastName}`}</h3>
            <p>{`Contact: ${FormatPhoneNumber(res.phoneNumber)}`}</p>
            <p>{res.email ? `Email: ${res.email}` : `Email: was not provided`}</p>
          </Link>
        </div>
      );
    })
  ) : (
    <div className="no_reservation">
      <h3>NO RESERVATIONS FOUND AT THIS TIME</h3>
    </div>
  );

  return (
    <div>
      <div className="format-nav">
        <FormattedNavbar />
      </div>
      <div className="restaurant-reservations">
        <h3>{`Reservations at ${restaurantName}`}</h3>
      </div>
      <div className="res-container">
        <div className="res-home">{reservationsInfo}</div>
      </div>
    </div>
  );
};

export default GetRestaurantReservations;
