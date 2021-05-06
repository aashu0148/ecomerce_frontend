import React from "react";
import { Link } from "react-router-dom";

function Logo(props) {
  return (
    <Link to="/" style={{ textDecoration: "none" }}>
      <div className="navbar_logo">
        <h1 style={{ margin: props.center ? "auto" : "" }}>
          {/* Vast<span>र</span> */}
          Vas<span>त्र</span>
          <div />
        </h1>
      </div>
    </Link>
  );
}

export default Logo;
