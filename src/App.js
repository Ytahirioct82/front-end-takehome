import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import * as React from "react";
import Home from "./components/homePage/HomePage";
import AddNewRestaurant from "./components/newRestaurant/NewRestaurant";
import GetRestaurant from "./components/restaurant/Restaurant";
import GetRestaurantReservations from "./components/reservations/Reservations";
import GetReservationDetail from "./components/reservation/Reservation";
import EditReservation from "./components/editReservation/EditReservation";
import EditRestaurant from "./components/editRestaurant/EditRestaurant";

function App() {
  const [allRestaurants, setAllRestaurants] = useState([]);

  //gets all restaurants from Navbar via props then passes the state to Home component
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
        <Route path="/restaurants/edit/:id" element={<EditRestaurant />} />
        <Route path="/reservations/:id" element={<GetRestaurantReservations />} />
        <Route path="/reservation/:restaurantId/:id" element={<GetReservationDetail />} />
        <Route path="/reservation/edit/:restaurantId/:id" element={<EditReservation />} />
      </Routes>
    </div>
  );
}

export default App;
