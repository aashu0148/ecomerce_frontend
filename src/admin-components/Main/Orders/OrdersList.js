import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import OrderCard from "./OrderCard/OrderCard";
import Spinner from "../../../Components/Spinner/Spinner";

function OrdersList(props) {
  const [allOrders, setAllOrders] = useState(props.data);
  const [orders, setOrders] = useState(allOrders);
  const [showValue, setShowValue] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);

  const refreshOrders = () => {
    setShowSpinner(true);
    fetch(`${process.env.REACT_APP_SERVER}/admin/orders/${props.id}`)
      .then(async (res) => {
        setShowSpinner(false);
        const data = await res.json();
        if (!data.status) {
          return;
        }
        const orders = [];
        const minYear = new Date().getFullYear() - 3;
        data.data.forEach((item) => {
          if (new Date(item.date).getFullYear() > minYear) orders.push(item);
          else return;
        });

        setAllOrders(orders);
      })
      .catch(() => {
        setShowSpinner(false);
      });
  };

  useEffect(() => {
    if (showValue === "") {
      setOrders(allOrders);
    }
    if (showValue === "delivered") {
      const temp = allOrders.filter((item) => item.isDelivered);
      setOrders(temp);
    }
    if (showValue === "cancelled") {
      const temp = allOrders.filter((item) => item.isCancelled);
      setOrders(temp);
    }
    if (showValue === "processing") {
      const temp = allOrders.filter(
        (item) => !item.isCancelled && !item.isDelivered
      );
      setOrders(temp);
    }
  }, [showValue, allOrders, props.data]);

  return showSpinner ? (
    <Spinner />
  ) : (
    <div style={{ width: "100%" }}>
      <div style={{ textAlign: "end" }}>
        <FormControl>
          <InputLabel htmlFor="show-only">Show only</InputLabel>
          <Select
            native
            value={showValue}
            onChange={(e) => setShowValue(e.target.value)}
            inputProps={{
              name: "Select",
            }}
            style={{ minWidth: "100px" }}
          >
            <option aria-label="None" value="" />
            <option value={"delivered"}>Delivered</option>
            <option value={"processing"}>Precessing</option>
            <option value={"cancelled"}>Cancelled</option>
          </Select>
        </FormControl>
      </div>
      {orders.map((item, i) => (
        <OrderCard key={i} data={item} refresh={refreshOrders} />
      ))}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    id: state.id,
  };
};

export default connect(mapStateToProps)(OrdersList);
