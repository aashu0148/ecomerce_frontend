import React, { useState } from "react";
import { Grid, Divider } from "@material-ui/core";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ReportIcon from "@material-ui/icons/Report";
import CheckIcon from "@material-ui/icons/CheckCircle";

import "./ListItem.css";

function DropdownList(props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Grid
      container
      spacing={1}
      style={{
        margin: "0",
        width: "100%",
        cursor: props.disabled ? "default" : "pointer",
      }}
      className="dropdown-list-item"
      onClick={() => {
        if (!props.disabled) setExpanded(!expanded);
      }}
      alignItems="center"
    >
      <Grid item xs={2} md={2} lg={2} style={{ textAlign: "center" }}>
        {props.valid ? (
          <CheckIcon
            fontSize="large"
            style={{ color: "var(--primary-color)" }}
          />
        ) : (
          <ReportIcon fontSize="large" style={{ color: "gray" }} />
        )}
      </Grid>
      <Grid
        item
        xs={9}
        md={9}
        lg={9}
        style={{ opacity: props.disabled ? "0.5" : "1" }}
      >
        <h4>{props.title}</h4>
      </Grid>
      <Grid
        item
        xs={1}
        md={1}
        lg={1}
        style={{ textAlign: "center", opacity: props.disabled ? "0.4" : "1" }}
      >
        {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </Grid>
      <Grid
        style={{
          marginLeft: "auto",
          padding: "0 4px",
          opacity: props.disabled ? "0.5" : "1",
        }}
        item
        xs={10}
        md={10}
        lg={10}
      >
        <small
          style={{
            fontSize: "0.9rem",
            color: "#000",
            fontWeight: "900",
            display: "block",
          }}
        >
          {props.subTitle}
        </small>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <Divider />
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        lg={12}
        className={`dropdown-list-item_box ${
          expanded ? "dropdown-list-item_box_active" : ""
        }`}
        style={{ padding: "0" }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {props.children}
      </Grid>
    </Grid>
  );
}

export default DropdownList;
