import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";

import Navbar from "../Navbar/Navbar";
import DropdownListItem from "../ListItem/DropdownListItem";
import Button from "../Button/Button";
import Input from "../Field/Input";
import Select from "../Field/Select";
import Footer from "../Footer/Footer";
import cities from "../../assets/cities.json";
import "./Checkout.css";

function Checkout(props) {
  const [values, setValues] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    state: "",
    city: "",
  });

  const [total, setTotal] = useState("_");
  const [loginValid, setLoginValid] = useState(props.auth);
  const [deliveryValid, setDeliveryValid] = useState(false);
  const [deliveryDisabled, setDeliveryDisabled] = useState(true);
  const [paymentDisabled, setPaymentDisabled] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [confirmButtonDisabled, setConfirmButtonDisabled] = useState(false);

  const [fieldError, setFieldError] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    state: "",
    city: "",
  });

  const addressConfirmHandler = () => {
    if (
      fieldError.name ||
      fieldError.address ||
      fieldError.email ||
      fieldError.phone ||
      fieldError.state ||
      fieldError.city
    ) {
      setErrorMsg("Invalid Credentials");
      setConfirmButtonDisabled(true);
      setDeliveryValid(false);
      return;
    }
    if (
      values.name === "" ||
      values.address === "" ||
      values.email === "" ||
      values.phone === "" ||
      values.state === "" ||
      values.city === ""
    ) {
      setErrorMsg("Enter Credentials");
      setConfirmButtonDisabled(true);
      setDeliveryValid(false);
      return;
    }

    setDeliveryValid(true);

    setErrorMsg("");
  };

  useEffect(() => {
    if (
      fieldError.name ||
      fieldError.address ||
      fieldError.email ||
      fieldError.phone ||
      fieldError.state ||
      fieldError.city
    ) {
      setConfirmButtonDisabled(true);
    } else {
      setConfirmButtonDisabled(false);
    }
    if (
      values.name === "" ||
      values.address === "" ||
      values.email === "" ||
      values.phone === "" ||
      values.state === "" ||
      values.city === ""
    ) {
      setConfirmButtonDisabled(true);
    } else {
      setConfirmButtonDisabled(false);
    }
  }, [fieldError, values]);

  useEffect(() => {
    let total = 0;
    props.cart.forEach(
      (item) => (total += Number.parseInt(item.price[item.size]) * item.qty)
    );

    setTotal(total + 105);
  }, [props.cart]);

  useEffect(() => {
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
      <div>
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
                      if (err !== fieldError.name) {
                        const myFieldError = { ...fieldError };
                        myFieldError.name = err;
                        setFieldError(myFieldError);
                      }
                    }}
                    onChange={(e) => {
                      const myValues = { ...values };
                      myValues.name = e.target.value;
                      setValues(myValues);
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Input
                    label="Email"
                    type="email"
                    onError={(err) => {
                      if (err !== fieldError.email) {
                        const myFieldError = { ...fieldError };
                        myFieldError.email = err;
                        setFieldError(myFieldError);
                      }
                    }}
                    onChange={(e) => {
                      const myValues = { ...values };
                      myValues.email = e.target.value;
                      setValues(myValues);
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Input
                    label="Phone"
                    type="phone"
                    onError={(err) => {
                      if (err !== fieldError.phone) {
                        const myFieldError = { ...fieldError };
                        myFieldError.phone = err;
                        setFieldError(myFieldError);
                      }
                    }}
                    onChange={(e) => {
                      const val = e.target.value;
                      const char = val.slice(-1);
                      if ((char >= "0" && char <= "9") || val === "") {
                        const myValues = { ...values };
                        myValues.phone = e.target.value;
                        setValues(myValues);
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Select
                    label="State"
                    options={Object.keys(cities)}
                    onChange={(e) => {
                      const myValues = { ...values };
                      myValues.state = e.target.value;
                      setValues(myValues);
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Select
                    label="City"
                    options={cities[values.state || ""]}
                    onChange={(e) => {
                      const myValues = { ...values };
                      myValues.city = e.target.value;
                      setValues(myValues);
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Input
                    type="textarea"
                    max={115}
                    label="Street Address"
                    onError={(err) => {
                      if (err !== fieldError.address) {
                        const myFieldError = { ...fieldError };
                        myFieldError.address = err;
                        setFieldError(myFieldError);
                      }
                    }}
                    onChange={(e) => {
                      const myValues = { ...values };
                      myValues.address = e.target.value;
                      setValues(myValues);
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <Button
                    type="button"
                    style={{ margin: "0 12px 0 auto" }}
                    onClick={addressConfirmHandler}
                    disabled={confirmButtonDisabled}
                  >
                    Confirm
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  lg={12}
                  style={{ textAlign: "center" }}
                >
                  <small
                    style={{ width: "fit-content", margin: "0 auto" }}
                    className="field-error-msg"
                  >
                    {errorMsg}
                  </small>
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
      </div>
      <div>
        <Footer style={{ marginTop: "auto" }} />
      </div>
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
