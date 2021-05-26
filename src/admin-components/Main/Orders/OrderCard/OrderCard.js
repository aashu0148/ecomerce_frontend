import React, { useState } from "react";
import { Grid, Chip, Modal } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

function OrderCard(props) {
  const date = new Date(props.data.date);
  const [modalBody, setModalBody] = useState("");
  const [modalOpen, setModalOpen] = useState("");

  const infoModal = <h1>Check order details</h1>;
  const updateModal = <h1>Update modal </h1>;

  return (
    <Grid
      className="admin-order-card"
      container
      spacing={1}
      style={{
        width: "100%",
        margin: "10px 0",
      }}
      alignItems="center"
    >
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            padding: "20px",
            background: "#fff",
            minWidth: "300px",
            minHeight: "200px",
            width: "fit-content",
            height: "fit-content",
            outline: "none",
          }}
        >
          {modalBody}
        </div>
      </Modal>
      <Grid
        item
        xs={4}
        sm={4}
        md={4}
        lg={3}
        onClick={() => {
          setModalBody(infoModal);
          setModalOpen(true);
        }}
      >
        <h3>{`${date.getDate()}-${
          date.getMonth() + 1
        }-${date.getFullYear()}`}</h3>
      </Grid>
      <Grid
        item
        xs={3}
        sm={3}
        md={3}
        lg={4}
        onClick={() => {
          setModalBody(infoModal);
          setModalOpen(true);
        }}
      >
        <Chip
          style={{
            backgroundColor: props.data.isCancelled
              ? "coral"
              : props.data.isDelivered
              ? "#7cd629"
              : "#87ceeb",
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
      </Grid>
      <Grid item xs={3} sm={3} md={3} lg={3}>
        <h4 style={{ margin: "auto 0", textAlign: "center" }}>
          ₹{props.data.price}
        </h4>
      </Grid>
      <Grid item xs={2} md={2} lg={2} style={{ textAlign: "center" }}>
        <EditIcon
          style={{ cursor: "pointer", color: "var(--primary-color)" }}
          onClick={() => {
            setModalBody(updateModal);
            setModalOpen(true);
          }}
        />
      </Grid>
    </Grid>
  );
}

export default OrderCard;
