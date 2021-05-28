import React, { useState } from "react";
import { Divider, Grid, Chip } from "@material-ui/core";

import Button from "../../Button/Button";

function OrderCard(props) {
  const [errorMsg, setErrorMsg] = useState("");
  const date = new Date(props.data.date);
  const deleteOrderHandler = () => {
    fetch(`${process.env.REACT_APP_SERVER}/user/cancel-order`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        uid: props.data.user,
        oid: props.data._id,
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!data.status) {
          setErrorMsg(data.message);
          return;
        }
        props.refresh();
      })
      .catch(() => {
        setErrorMsg("Enable to conect to server. Please retry");
      });
  };

  return (
    <div className="order-card" style={{ width: "360px" }}>
      <Grid
        style={{ maxHeight: "300px", overflowY: "scroll" }}
        alignItems="center"
        container
        spacing={1}
      >
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <h3>{`${date.getDate()}-${
            date.getMonth() + 1
          }-${date.getFullYear()}`}</h3>
        </Grid>
        {props.data.items.map((item, i) => (
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
            <Grid item xs={1} md={1} lg={1}>
              <small style={{ color: "#000", fontWeight: "bold" }}>
                <span>{item.size.toUpperCase()}</span>
              </small>
            </Grid>
            <Grid item xs={2} md={2} lg={2}>
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
      <small className="field-error-msg" style={{ textAlign: "center" }}>
        {errorMsg}
      </small>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Chip
          style={{
            backgroundColor: props.data.isCancelled
              ? "coral"
              : props.data.isDelivered
              ? "#7cd629"
              : "#6cc4e8",
            color: "#fff",
          }}
          label={`${
            props.data.isCancelled
              ? "Cancelled"
              : props.data.isDelivered
              ? "Completed"
              : "Processing"
          }`}
        />
        {!props.data.isCancelled && !props.data.isDelivered ? (
          <Button
            outline
            style={{ padding: "5px 7px", margin: "0 8px 0 0" }}
            onClick={deleteOrderHandler}
          >
            Cancel Order
          </Button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default OrderCard;
