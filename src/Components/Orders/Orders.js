import { Grid } from "@material-ui/core";
import React from "react";

import Navbar from "../Navbar/Navbar";

function Orders() {
  return (
    <div className="orders">
      <Navbar />
      <Grid container spacing={2} style={{ margin: "0", width: "100%" }}>
        <Grid item xs={12} md={12} lg={12}>
          <h1>Orders</h1>
        </Grid>
      </Grid>
    </div>
  );
}

export default Orders;
