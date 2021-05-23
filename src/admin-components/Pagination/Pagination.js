import React from "react";
import { IconButton } from "@material-ui/core";
import LeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import RightIcon from "@material-ui/icons/KeyboardArrowRight";

function Pagination(props) {
  return (
    <div style={{ display: "flex", margin: "auto", width: "fit-content" }}>
      <IconButton onClick={props.onLeftClick} disabled={props.leftDisabled}>
        <LeftIcon />
      </IconButton>

      <p
        style={{
          backgroundColor: "var(--primary-color)",
          borderRadius: "50%",
          color: "#fff",
          fontWeight: "bold",
          padding: "12px",
          height: "38px",
          width: "38px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {props.pageNo}
      </p>

      <IconButton onClick={props.onRightClick} disabled={props.rightDisabled}>
        <RightIcon />
      </IconButton>
    </div>
  );
}

export default Pagination;
