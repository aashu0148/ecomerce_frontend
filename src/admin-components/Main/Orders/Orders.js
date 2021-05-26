import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Grid, Divider } from "@material-ui/core";

import Spinner from "../../../Components/Spinner/Spinner";
import OrderDistribution from "./OrderDistribution";
import OrderType from "./OrderType";
import Sales from "./Sales";
import "./Orders.css";
import OrderCard from "./OrderCard/OrderCard";

function Orders(props) {
  const [errorMsg, setErrorMsg] = useState("");
  const [orders, setOrders] = useState([]);
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER}/admin/orders/${props.id}`)
      .then(async (res) => {
        setShowSpinner(false);
        const data = await res.json();
        if (!data.status) {
          setErrorMsg(data.message);
          return;
        }
        setOrders(data.data);
      })
      .catch((err) => {
        setShowSpinner(false);
        setErrorMsg("Enable to connect to server. Please refresh");
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="admin-orders">
      {showSpinner ? (
        <Spinner />
      ) : errorMsg ? (
        <small
          className="field-error-msg"
          style={{ fontSize: "24px", fontWeight: "bold" }}
        >
          {errorMsg}
        </small>
      ) : (
        <Grid
          container
          spacing={2}
          style={{ width: "100%", margin: "auto" }}
          alignItems="center"
          justify="center"
        >
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={6}
            style={{ textAlign: "center" }}
          >
            <OrderDistribution data={orders} />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={6}
            style={{ textAlign: "center" }}
          >
            <OrderType data={orders} />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            style={{ overflowX: "scroll", textAlign: "center" }}
          >
            <br />
            <Sales data={orders} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <br />
            <h1>Orders</h1>
            <Divider />
          </Grid>
          {orders.length > 0
            ? orders.map((item, i) => <OrderCard key={i} data={item} />)
            : ""}
        </Grid>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    id: state.id,
  };
};

export default connect(mapStateToProps)(Orders);
