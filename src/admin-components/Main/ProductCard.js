import React, { useState } from "react";
import { Divider, Grid, Modal } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import notFound from "../../assets/svg/404.svg";

function ProductCard(props) {
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [modalBody, setModalbody] = useState("");

  const updateBody = <h1>Update modal here</h1>;
  const deleteBody = <h1>Delete modal here</h1>;

  return (
    <Grid
      container
      spacing={1}
      style={{
        width: "100%",
        margin: "10px 0",
      }}
      alignItems="center"
    >
      <Modal
        open={updateModalOpen || deleteModalOpen}
        onClose={() => {
          setUpdateModalOpen(false);
          setDeleteModalOpen(false);
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
            minHeight: "300px",
            width: "fit-content",
            height: "fit-content",
            outline: "none",
          }}
        >
          {modalBody}
        </div>
      </Modal>

      <Grid item xs={4} md={2} lg={2} style={{ maxHeight: "90px" }}>
        <img
          style={{
            maxHeight: "85px",
            maxWidth: "80px",
            objectFit: props.image ? "cover" : "contain",
          }}
          src={props.image || notFound}
          alt="Not found"
        />
      </Grid>
      <Grid item xs={8} md={4} lg={4}>
        <h4 style={{ margin: "auto 0" }}>{props.title || "Title"}</h4>
      </Grid>
      <Grid item xs={4} md={2} lg={2}>
        <h4 style={{ margin: "auto 0" }}>
          ₹<span>{props.price || "_"}</span>
        </h4>
      </Grid>

      <Grid item xs={4} md={2} lg={2}>
        <h4 style={{ margin: "auto 0" }}> {props.size || "_"}</h4>
      </Grid>
      <Grid item xs={2} md={1} lg={1}>
        <h4 style={{ margin: "auto 0" }}>
          <EditIcon
            style={{ cursor: "pointer", color: "var(--primary-color)" }}
            onClick={() => {
              setModalbody(updateBody);
              setUpdateModalOpen(true);
            }}
          />
        </h4>
      </Grid>
      <Grid item xs={2} md={1} lg={1}>
        <h4 style={{ margin: "auto 0" }}>
          <DeleteIcon
            onClick={() => {
              setModalbody(deleteBody);
              setDeleteModalOpen(true);
            }}
            style={{ cursor: "pointer", color: "#ff4500" }}
          />
        </h4>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <Divider />
      </Grid>
    </Grid>
  );
}

export default ProductCard;
