import { Divider } from "@material-ui/core";
import React from "react";

import "./ListItem.css";

function ListItem(props) {
  return (
    <>
      <li
        onClick={props.onClick}
        className={`list-item ${props.selected ? "list-item_active" : ""}${
          props.noHover ? "list-item_no-hover" : ""
        }`}
      >
        {props.children}
      </li>
      {!props.last ? <Divider /> : ""}
    </>
  );
}

export default ListItem;
