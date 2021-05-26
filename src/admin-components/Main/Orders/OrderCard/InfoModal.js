import React from "react";
import { connect } from "react-redux";
import { Divider } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";

function InfoModal(props) {
  return (
    <div
      className={`${props.mobileView ? "" : "styled-scrollbar"}`}
      style={{
        minWidth: "350px",
        maxWidth: "500px",
        maxHeight: "80vh",
        overflowY: "scroll",
      }}
    >
      <div style={{ textAlign: "end" }}>
        <CancelIcon
          onClick={props.close}
          style={{
            color: "darkgray",
            cursor: "pointer",
          }}
        />
      </div>
      <h2>Delivery Address </h2>

      <div style={{ display: "flex" }}>
        <h3>Name : </h3>
        <p>{props.data.deliveryAddress.name}</p>
      </div>

      <div style={{ display: "flex" }}>
        <h3>Address : </h3>
        <p>{props.data.deliveryAddress.address}</p>
      </div>

      <div style={{ display: "flex" }}>
        <h3>Email : </h3>
        <p>{props.data.deliveryAddress.email}</p>
      </div>

      <div style={{ display: "flex" }}>
        <h3>Phone : </h3>
        <p>{props.data.deliveryAddress.mobile}</p>
      </div>
      <br />
      <h2>Order details </h2>
      {props.data.items.map((item, i) => (
        <div key={i}>
          <div style={{ display: "flex" }}>
            <h3>Name : </h3>
            <p>{item.name}</p>
          </div>
          <div style={{ display: "flex" }}>
            <h3>Price : </h3>
            <p>{item.price}</p>
          </div>
          <div style={{ display: "flex" }}>
            <h3>Qty : </h3>
            <p>{item.qty}</p>
          </div>

          <div style={{ display: "flex" }}>
            <h3>Size : </h3>
            <p>{item.size}</p>
          </div>

          <Divider style={{ width: "100%", margin: "8px 0" }} />
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    mobileView: state.mobileView,
  };
};

export default connect(mapStateToProps)(InfoModal);