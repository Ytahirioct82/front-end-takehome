import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import React, { Component } from "react";
import Home from "./components/homePage/HomePage";
import AddNewRestaurant from "./components/newRestaurant/NewRestaurant";
import GetRestaurant from "./components/restaurant/Restaurant";
import GetRestaurantReservations from "./components/reservations/Reservations";
import GetReservationDetail from "./components/reservation/Reservation";

function App() {
  const [allRestaurants, setAllRestaurants] = useState([]);

  const getAllRestaurants = (restaurants) => {
    setAllRestaurants(restaurants);
  };

  return (
    <div>
      <Routes>
        <Route
          exact
          path="/"
          element={<Home allRestaurants={allRestaurants} getAllRestaurants={getAllRestaurants} />}
        />
        <Route path="/newRestaurant" element={<AddNewRestaurant />} />
        <Route path="/restaurants/:id" element={<GetRestaurant />} />
        <Route path="/reservations/:id" element={<GetRestaurantReservations />} />
        <Route path="/reservation/:id" element={<GetReservationDetail />} />
      </Routes>
    </div>
  );
}

export default App;
