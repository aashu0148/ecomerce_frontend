import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";

import Navbar from "../Navbar/Navbar";
import DropdownListItem from "../ListItem/DropdownListItem";
import "./Checkout.css";

function Checkout(props) {
  const [total, setTotal] = useState("_");

  useEffect(() => {
    let total = 0;
    props.cart.forEach(
      (item) => (total += Number.parseInt(item.price[item.size]) * item.qty)
    );

    setTotal(total + 105);
  }, [props.cart]);

  return props.cart.length > 0 ? (
    <div className="checkout">
      <Navbar />
      <Grid
        container
        style={{ margin: "0", width: "100%" }}
        spacing={2}
        justify="center"
      >
        <Grid item xs={12} md={12} lg={12}>
          <h1>Checkout</h1>
        </Grid>

        <Grid
          item
          xs={12}
          md={8}
          lg={7}
          style={{ boxShadow: "1px 0 12px rgba(238, 201, 214, 0.4)" }}
        >
          <h3 style={{ padding: "5px 15px" }}>
            Total - ₹{" "}
            <span style={{ color: "var(--primary-color" }}>{total}</span>
          </h3>
          <DropdownListItem
            title="Login / Signup"
            valid={props.auth}
            disabled={props.auth}
            // subTitle="as Aashu"
          >
            {props.auth ? (
              <p>You are Logged in.</p>
            ) : (
              <p>
                Please Login to continue. <Link to="/signin">Click here</Link>
              </p>
            )}
          </DropdownListItem>
        </Grid>
      </Grid>
    </div>
  ) : (
    <Redirect to="/" />
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    cart: state.cart,
  };
};

export default connect(mapStateToProps)(Checkout);
