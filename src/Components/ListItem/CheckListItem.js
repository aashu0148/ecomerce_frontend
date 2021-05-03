import { Checkbox, Divider } from "@material-ui/core";
import React from "react";

import "./ListItem.css";
function CheckListItem(props) {
  return (
    <>
      <div style={{ display: "flex" }}>
        <Checkbox
          onChange={(e) => {
            if (props.changed)
              props.changed({ [props.children]: e.target.checked });
          }}
          style={{ color: "var(--primary-color)" }}
        />
        <li onClick={props.onClick} className={`check-list-item `}>
          {props.children}
        </li>
      </div>
      {!props.last ? <Divider /> : ""}
    </>
  );
}

export default CheckListItem;
