import React from "react";
import { Grid } from "@material-ui/core";

import OrderDistribution from "./OrderDistribution";
import OrderType from "./OrderType";
import Sales from "./Sales";
import "./Orders.css";

function Orders() {
  return (
    <div>
      <Grid
        container
        spacing={2}
        style={{ width: "100%", margin: "auto" }}
        alignItems="center"
        justify="center"
      >
        <Grid item xs={12} sm={6} md={6} lg={6} style={{ textAlign: "center" }}>
          <OrderDistribution />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} style={{ textAlign: "center" }}>
          <OrderType />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          style={{ overflowX: "scroll" }}
        >
          <Sales />
        </Grid>
      </Grid>
    </div>
  );
}

export default Orders;
