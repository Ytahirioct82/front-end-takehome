import React, { Component } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./reservation.css";
import FormattedNavbar from "../nav/FormattedNav";
import FormatPhoneNumber from "../../format/formatNumber";
import FormatDate from "../../format/formatDate";
import FormatTime from "../../format/formatTime";

const GetReservationDetail = () => {
  const { id } = useParams();
  const [reservation, setReservation] = useState({});
  const API = process.env.REACT_APP_API_URL;
  useEffect(() => {
    axios
      .get(`${API}/reservations/${id}`)
      .then((response) => {
        console.log(response.data);
        setReservation(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  console.log(id);
  console.log(reservation);
  return (
    <div className="reservation-container">
      <FormattedNavbar />

      <div className="content">
        <h2>Reservation Details</h2>

        <div className="name">
          <h3>Name: </h3>
          <p>{reservation.firstName}</p>
          <p>{reservation.lastName}</p>
        </div>

        <div className="contact">
          <h3>Contact: </h3>
          <p>{FormatPhoneNumber(reservation.phoneNumber)}</p>
        </div>

        <div className="email">
          <h3>Email: </h3>
          <p>{reservation.email ? ` ${reservation.email}` : `was not provided`}</p>
        </div>

        <div className="guests">
          <h3>Guests: </h3>
          <p>{reservation.numGuests}</p>
        </div>

        <div className="date">
          <h3>Date: </h3>
          <p>{FormatDate(reservation.time)}</p>
        </div>

        <div className="time">
          <h3>Time: </h3>
          <p>{FormatTime(reservation.time)}</p>
        </div>
      </div>
    </div>
  );
};

export default GetReservationDetail;
