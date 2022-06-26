import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/nav/Nav";
import Home from "./components/homePage/HomePage";
import AddNewRestaurant from "./components/newRestaurant/NewRestaurant";
import GetRestaurant from "./components/restaurant/Restaurant";

function App() {
  const [allRestaurants, setAllRestaurants] = useState([]);

  const getAllRestaurants = (restaurants) => {
    setAllRestaurants(restaurants);
  };
  console.log(allRestaurants);
  return (
    <div>
      <Routes>
        {/* <Route path="/" element={<Navbar getAllRestaurants={getAllRestaurants} />} /> */}
        <Route
          exact
          path="/"
          element={<Home allRestaurants={allRestaurants} getAllRestaurants={getAllRestaurants} />}
        />
        <Route path="/newRestaurant" element={<AddNewRestaurant />} />
        <Route path="/restaurants/:id" element={<GetRestaurant />} />
        {/* <Route exact path="/" element={<AllActivities />} /> */}
        {/* <Route path="/activity/login" element={<UserLogin isLogged={toggleLog} />} />
        <Route path="/activity/registration" element={<UserRegistration />} />
        <Route path="/activity/listings" element={<MyListings />} />
        <Route path="/activity/favorites" element={<Favorites />} />
        <Route path="/activity/:id" element={<Activity />} />
        <Route path="/activity/new" element={<NewPost />} />
        <Route path="/activity/:id/edit" element={<EditPost />} /> */}
      </Routes>
    </div>
  );
}

export default App;
