import React from "react";
import { Divider, Grid } from "@material-ui/core";

import Button from "../../Button/Button";

function OrderCard(props) {
  return (
    <div className="order-card">
      <Grid
        style={{ maxHeight: "300px", overflowY: "scroll" }}
        alignItems="center"
        container
        spacing={2}
      >
        {props.order.map((item, i) => (
          <Grid
            key={i}
            item
            container
            // spacing={2}
            alignItems="center"
            xs={12}
            md={12}
            lg={12}
          >
            <Grid
              key={i}
              style={{ color: "#000", fontWeight: "bold" }}
              item
              xs={9}
              md={9}
              lg={9}
            >
              {item.name}
            </Grid>
            <Grid item xs={3} md={3} lg={3}>
              <small style={{ color: "#000", fontWeight: "bold" }}>
                Qty - <span>{item.qty}</span>
              </small>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Divider style={{ margin: "5px 0" }} />
            </Grid>
          </Grid>
        ))}
      </Grid>
      <div>
        <Button outline style={{ padding: "10px 15px", marginRight: "8px" }}>
          Cancel Order
        </Button>
      </div>
    </div>
  );
}

export default OrderCard;
