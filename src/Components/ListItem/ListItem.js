import { Divider } from "@material-ui/core";
import React from "react";

import "./ListItem.css";

function ListItem(props) {
  return (
    <>
      <li
        onClick={props.onClick}
        className={`list-item ${props.selected ? "list-item_active" : ""}`}
      >
        {props.children}
      </li>
      {!props.last ? <Divider /> : ""}
    </>
  );
}

export default ListItem;
