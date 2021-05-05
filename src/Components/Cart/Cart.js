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
          <Card
            image="https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/11207672/2020/3/17/d7a23f89-f0df-43b4-a00d-1a3742e8cafe1584442789288-Jack--Jones-Men-White--Black-Slim-Fit-Checked-Casual-Shirt-5-4.jpg"
            title="Shirt 1"
            qty="1"
            price="1000"
            size="L"
          />
          <Card
            image="https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/11207378/2020/2/5/3196a313-3b5e-454c-93e5-839252227e7e1580902163843-Jack--Jones-Men-Shirts-1071580902162156-1.jpg"
            title="Shirt 2"
            qty="2"
            price="500"
            size="S"
          />
          <Card
            image="https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/11207372/2020/2/5/43210b97-11e6-43f3-b011-357a8bdacf8b1580902145818-Jack--Jones-Men-Shirts-5381580902144477-1.jpg"
            title="Shirt 3"
            qty={3}
            price="700"
            size="XL"
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default Cart;
