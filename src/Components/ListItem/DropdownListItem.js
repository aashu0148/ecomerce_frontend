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
      style={{ margin: "0", width: "100%" }}
      className="dropdown-list-item"
      onClick={() => setExpanded(!expanded)}
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
      <Grid item xs={9} md={9} lg={9}>
        {props.title}
      </Grid>
      <Grid item xs={1} md={1} lg={1} style={{ textAlign: "center" }}>
        {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
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
        onClick={(e) => {
          e.stopPropagation();
        }}
        style={{ padding: "0" }}
      >
        {props.children}
      </Grid>
    </Grid>
  );
}

export default DropdownList;
