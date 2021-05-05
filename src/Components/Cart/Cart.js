import React from "react";
import { Link } from "react-router-dom";
import { Grid, Divider } from "@material-ui/core";

import Card from "./Card/CartCard";
import Button from "../Button/Button";
import "./Cart.css";

function Cart() {
  return (
    <div className="cart">
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
                <h4>₹ 1400</h4>
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
                <h3>₹ 1505</h3>
              </Grid>
            </Grid>

            <Button type="button" raised>
              Checkout
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} sm={7} md={7} lg={7} className="cart_right">
          <Card image="" title="Title 1" qty="2" price="100" size="L" />
        </Grid>
      </Grid>
    </div>
  );
}

export default Cart;
