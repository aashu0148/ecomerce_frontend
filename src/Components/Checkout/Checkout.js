import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";

import Navbar from "../Navbar/Navbar";
import DropdownListItem from "../ListItem/DropdownListItem";
import Input from "../Field/Input";
import Select from "../Field/Select";
import Footer from "../Footer/Footer";
import cities from "../../assets/cities.json";
import "./Checkout.css";

function Checkout(props) {
  const [stateValue, setStateValue] = useState("");
  const [cityValue, setCityValue] = useState("");

  const [total, setTotal] = useState("_");
  const [loginValid, setLoginValid] = useState(props.auth);
  const [deliveryValid, setDeliveryValid] = useState(false);
  const [deliveryDisabled, setDeliveryDisabled] = useState(true);
  const [paymentDisabled, setPaymentDisabled] = useState(true);

  useEffect(() => {
    let total = 0;
    props.cart.forEach(
      (item) => (total += Number.parseInt(item.price[item.size]) * item.qty)
    );

    setTotal(total + 105);
  }, [props.cart]);

  useEffect(() => {
    if (false) {
      console.log(cityValue);
      setDeliveryValid(false);
    }

    setLoginValid(props.auth);

    if (loginValid) {
      setDeliveryDisabled(false);
    } else {
      setDeliveryDisabled(true);
    }
    if (deliveryValid) {
      setPaymentDisabled(false);
    } else {
      setPaymentDisabled(true);
    }
  }, [loginValid, deliveryValid, props.auth]); // eslint-disable-line react-hooks/exhaustive-deps

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
            valid={loginValid}
            disabled={loginValid}
            subTitle={loginValid ? `Logged in as ${props.name}` : ""}
          >
            {props.auth ? (
              <p>You are Logged in.</p>
            ) : (
              <p>
                Please Login to continue. <Link to="/signin">Click here</Link>
              </p>
            )}
            <br />
          </DropdownListItem>
          <DropdownListItem
            title="Delivery address"
            valid={deliveryValid}
            disabled={deliveryDisabled}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={6}>
                <Input
                  label="Full Name"
                  onError={(err) => {
                    console.log("text err:", err);
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <Input
                  label="Email"
                  type="email"
                  onError={(err) => {
                    console.log("Email err:", err);
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <Input
                  label="Phone"
                  type="phone"
                  onError={(err) => {
                    console.log("Phone err:", err);
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <Select
                  label="State"
                  options={Object.keys(cities)}
                  value={(val) => setStateValue(val)}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <Select
                  label="City"
                  options={cities[stateValue || ""]}
                  value={(val) => setCityValue(val)}
                />
              </Grid>
            </Grid>
            <br />
          </DropdownListItem>
          <DropdownListItem
            title="Payment"
            noIcon
            // valid={props.auth}
            disabled={paymentDisabled}
          >
            Pay here
          </DropdownListItem>
        </Grid>
      </Grid>
      <Footer style={{ marginTop: "auto" }} />
    </div>
  ) : (
    <Redirect to="/" />
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    name: state.name,
    cart: state.cart,
  };
};

export default connect(mapStateToProps)(Checkout);
