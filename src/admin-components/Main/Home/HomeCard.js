import React, { useState } from "react";
import { Grid, Modal } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import DeleteIcon from "@material-ui/icons/Delete";

import InfoModal from "./InfoModal";
import DeleteModal from "./DeleteModal";

function HomeCard(props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalBody, setModalBody] = useState("");

  const infoModal = (
    <InfoModal data={props.data} close={() => setModalOpen(false)} />
  );
  const deleteModal = (
    <DeleteModal
      data={props.data}
      close={() => setModalOpen(false)}
      refresh={props.refresh}
    />
  );
  return (
    <Grid container spacing={2} style={{ margin: "0", width: "100%" }}>
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
            minWidth: "350px",
            width: "fit-content",
            height: "fit-content",
            outline: "none",
            margin: "5px",
          }}
        >
          <div style={{ textAlign: "end" }}>
            <CancelIcon
              onClick={() => setModalOpen(false)}
              style={{
                color: "darkgray",
                cursor: "pointer",
              }}
            />
          </div>
          {modalBody}
        </div>
      </Modal>
      <Grid
        item
        xs={2}
        sm={2}
        md={2}
        lg={2}
        style={{ cursor: "pointer" }}
        onClick={() => {
          setModalBody(infoModal);
          setModalOpen(true);
        }}
      >
        <h3>Card {props.number}</h3>
      </Grid>
      <Grid
        item
        xs={6}
        sm={6}
        md={6}
        lg={6}
        style={{ cursor: "pointer" }}
        onClick={() => {
          setModalBody(infoModal);
          setModalOpen(true);
        }}
      >
        <p>{props.data.text}</p>
      </Grid>
      <Grid item xs={3} sm={3} md={3} lg={3} style={{ textAlign: "center" }}>
        <DeleteIcon
          onClick={() => {
            setModalBody(deleteModal);
            setModalOpen(true);
          }}
          style={{ cursor: "pointer", color: "#ff4500" }}
        />
      </Grid>
    </Grid>
  );
}

export default HomeCard;
