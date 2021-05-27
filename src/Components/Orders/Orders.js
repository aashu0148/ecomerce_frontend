import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";

import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import Spinner from "../Spinner/Spinner";
import Footer from "../Footer/Footer";
import OrderCard from "./OrderCard/OrderCard";
import "./Orders.css";

function Orders(props) {
  const [showSpinner, setShowSpinner] = useState(true);
  const [orders, setOrders] = useState([]);
  const [processingOrders, setProcessingOrders] = useState([]);
  const [cancelledOrders, setCancelledOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);

  const refreshOrders = () => {
    setShowSpinner(true);
    fetch(`${process.env.REACT_APP_SERVER}/user/get-orders`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id: props.id,
      }),
    })
      .then(async (res) => {
        setShowSpinner(false);
        const data = await res.json();
        const cancelled = [],
          processing = [],
          delivered = [];
        data.data.forEach((item) => {
          if (item.isCancelled) {
            cancelled.push(item);
          } else if (item.isDelivered) {
            delivered.push(item);
          } else {
            processing.push(item);
          }
        });
        setOrders(data.data);
        setProcessingOrders(processing);
        setDeliveredOrders(delivered);
        setCancelledOrders(cancelled);
      })
      .catch(() => {
        setShowSpinner(false);
      });
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER}/user/get-orders`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id: props.id,
      }),
    })
      .then(async (res) => {
        setShowSpinner(false);
        const data = await res.json();
        const cancelled = [],
          processing = [],
          delivered = [];

        data.data.forEach((item) => {
          if (item.isCancelled) {
            cancelled.push(item);
          } else if (item.isDelivered) {
            delivered.push(item);
          } else {
            processing.push(item);
          }
        });
        setOrders(data.data);
        setProcessingOrders(processing);
        setDeliveredOrders(delivered);
        setCancelledOrders(cancelled);
      })
      .catch(() => {
        setShowSpinner(false);
      });
  }, [props.id]);

  return (
    <div className="orders">
      <Navbar />
      <Grid
        container
        spacing={2}
        style={{
          margin: 0,
          width: "100%",
        }}
      >
        <Grid item xs={12} sm={3} lg={3} md={3}>
          <Sidebar />
        </Grid>
        <Grid item xs={12} sm={9} lg={9} md={9}>
          <Grid
            container
            spacing={1}
            style={{ margin: "0", width: "100%" }}
            justify="space-around"
          >
            <Grid item xs={12} md={12} lg={12}>
              <h1>Orders</h1>
            </Grid>
            {showSpinner ? (
              <Spinner />
            ) : orders.length === 0 ? (
              <h2>No orders found.</h2>
            ) : (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-evenly",
                }}
              >
                {processingOrders.length > 0
                  ? processingOrders.map((item, i) => (
                      <OrderCard key={i} data={item} refresh={refreshOrders} />
                    ))
                  : ""}

                {deliveredOrders.length > 0
                  ? deliveredOrders.map((item, i) => (
                      <OrderCard key={i} data={item} refresh={refreshOrders} />
                    ))
                  : ""}
                {cancelledOrders.length > 0
                  ? cancelledOrders.map((item, i) => (
                      <OrderCard key={i} data={item} refresh={refreshOrders} />
                    ))
                  : ""}
              </div>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Footer />
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    id: state.id,
  };
};

export default connect(mapStateToProps)(Orders);
