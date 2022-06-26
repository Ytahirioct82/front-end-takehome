import { useState, useEffect } from "react";

import Link from "@mui/material/Link";
import "./home.css";
import Navbar from "../nav/Nav";

function Home(props) {
  const [allRestaurants, setAllRestaurants] = useState([]);
  useEffect(() => {
    setAllRestaurants(props.allRestaurants);
  }, [props.allRestaurants]);

  const listOfRestaurants = allRestaurants.map((rest) => {
    return (
      <div className="restaurants" key={rest.id}>
        <Link href={`/restaurants/${rest.id}`} underline="none">
          <h3>{rest.name}</h3>
          <p>{rest.cuisine}</p>
          <p>{rest.location}</p>
          <p className="price">{rest.price}</p>
        </Link>
      </div>
    );
  });
  return (
    <>
      <Navbar getAllRestaurants={props.getAllRestaurants} />
      <div className="container">
        <div className="home">{listOfRestaurants}</div>
      </div>
    </>
  );
}

export default Home;
