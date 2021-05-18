import { Grid } from "@material-ui/core";
import React from "react";

import Navbar from "../Navbar/Navbar";
import OrderCard from "./OrderCard/OrderCard";
import "./Orders.css";

function Orders() {
  return (
    <div className="orders">
      <Navbar />
      <Grid container spacing={2} style={{ margin: "0", width: "100%" }}>
        <Grid item xs={12} md={12} lg={12}>
          <h1>Orders</h1>
        </Grid>
        <OrderCard
          order={[
            {
              name: "order name 1 and some random text to fill the rest of the space of order card",
              qty: "3",
            },
            {
              name: "order name 55 and some ",
              qty: "3",
            },
            { name: "order name 2 and some ", qty: "4" },
            { name: "order of order card", qty: "12" },
          ]}
        />
        <OrderCard
          order={[
            { name: "order name 2 and some ", qty: "4" },
            { name: "order of order card", qty: "12" },
          ]}
        />
      </Grid>
    </div>
  );
}

export default Orders;
