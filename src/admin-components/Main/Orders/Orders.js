import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Grid, Divider } from "@material-ui/core";

import Spinner from "../../../Components/Spinner/Spinner";
import OrderDistribution from "./OrderDistribution";
import OrderType from "./OrderType";
import Sales from "./Sales";
import OrdersList from "./OrdersList";
import "./Orders.css";

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
        const orders = [];
        const minYear = new Date().getFullYear() - 3;
        data.data.forEach((item) => {
          if (new Date(item.date).getFullYear() > minYear) orders.push(item);
          else return;
        });

        setOrders(orders);
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
          {orders.length > 0 ? (
            <OrdersList data={orders} />
          ) : (
            <h3>No orders present.</h3>
          )}
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
