import React, { useState } from "react";
import { Checkbox, Divider } from "@material-ui/core";

import "./ListItem.css";
function CheckListItem(props) {
  const [checked, setChecked] = useState(props.checked);
  return (
    <>
      <div onClick={props.onClick} style={{ display: "flex" }}>
        <Checkbox
          checked={checked}
          id={props.id}
          onChange={(e) => {
            if (props.changed) props.changed(e.target.checked);
          }}
          style={{ color: "var(--primary-color)" }}
          onClick={(e) => {
            const check = e.target.checked;
            setChecked(check);
          }}
        />
        <li className={`check-list-item `}>{props.children}</li>
      </div>
      {!props.last ? <Divider /> : ""}
    </>
  );
}

export default CheckListItem;
