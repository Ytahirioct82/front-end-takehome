import * as React from "react";
import Link from "@mui/material/Link";
import "./nav.css";
import Button from "@mui/material/Button";

const FormattedNavbar = () => {
  return (
    <div className="Formatted">
      <Link href="/" underline="none">
        <h3>RESY</h3>
      </Link>

      <Link href="/newRestaurant" underline="none">
        <Button>ADD RESTAURANT</Button>
      </Link>
    </div>
  );
};

export default FormattedNavbar;
