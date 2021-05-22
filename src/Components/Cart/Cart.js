import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Grid, Divider } from "@material-ui/core";

import Spinner from "../Spinner/Spinner";
import Card from "./Card/CartCard";
import Button from "../Button/Button";
import Footer from "../Footer/Footer";
import emptyCart from "../../assets/svg/empty-cart.svg";
import "./Cart.css";

function Cart(props) {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [cartEmpty, setCartEmpty] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setPageLoaded(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (props.cart.length === 0) setCartEmpty(true);
    else setCartEmpty(false);

    let total = 0;
    props.cart.forEach(
      (item) => (total += Number.parseInt(item.price) * item.qty)
    );

    setSubTotal(total);
    setTotalPrice(total + 105);
  }, [props.cart]);

  return pageLoaded ? (
    <div className="cart">
      {cartEmpty ? (
        <Grid container spacing={3} style={{ margin: "0", width: "100%" }}>
          <Grid item xs={10} lg={12}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <div className="navbar_logo cart_navbar_logo">
                <h1>
                  Vas<span>त्र</span>
                  <div />
                </h1>
              </div>
            </Link>
          </Grid>
          <Grid item xs={12} md={12} lg={12} style={{ textAlign: "center" }}>
            <img
              style={{ maxWidth: "360px" }}
              src={emptyCart}
              alt="svg not found"
            />
            <h1 style={{ textAlign: "center" }}>Shopping Cart is Empty.</h1>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={3} style={{ margin: "0", width: "100%" }}>
          <Grid item xs={10} lg={12}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <div className="navbar_logo cart_navbar_logo">
                <h1>
                  Vas<span>त्र</span>
                  <div />
                </h1>
              </div>
            </Link>
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <h1>Shopping Cart</h1>
          </Grid>
          <Grid item xs={12} sm={5} md={5} lg={5} className="cart_left">
            <div className="cart_order-box">
              <h2>Order Summary</h2>
              <Grid
                container
                spacing={1}
                style={{ width: "100%", margin: "0 0 25px 0" }}
                alignItems="baseline"
              >
                <Grid item xs={8} lg={8}>
                  <h5>Sub Total</h5>
                </Grid>
                <Grid item xs={4} lg={4}>
                  <h4>₹ {subTotal}</h4>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <Divider />
                </Grid>
                <Grid item xs={8} lg={8}>
                  <h5>Extimated Shipping & Handeling</h5>
                </Grid>
                <Grid item xs={4} lg={4}>
                  <h4>₹ 100</h4>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <Divider />
                </Grid>
                <Grid item xs={8} lg={8}>
                  <h5>Estimated Tax</h5>
                </Grid>
                <Grid item xs={4} lg={4}>
                  <h4>₹ 5</h4>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  lg={12}
                  style={{ marginBottom: "10px" }}
                >
                  <Divider />
                </Grid>
                <Grid item xs={8} lg={8}>
                  <h1>Total</h1>
                </Grid>
                <Grid item xs={4} lg={4}>
                  <h3>₹ {totalPrice}</h3>
                </Grid>
              </Grid>

              <Link to="/checkout" style={{ textDecoration: "none" }}>
                <Button type="button" raised>
                  Checkout
                </Button>
              </Link>
            </div>
          </Grid>
          <Grid item xs={12} sm={7} md={7} lg={7} className="cart_right">
            {props.cart.map((item, i) => (
              <Card
                key={item.id + new Date().getTime() / i}
                id={item.id}
                image={`${process.env.REACT_APP_SERVER}/${item.image}`}
                title={item.title}
                qty={item.qty}
                price={item.price}
                size={item.size}
              />
            ))}
          </Grid>
          <Footer />
        </Grid>
      )}
    </div>
  ) : (
    <Spinner />
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

export default connect(mapStateToProps)(Cart);
