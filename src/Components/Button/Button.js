import React from "react";

import "./Button.css";

function Button(props) {
  return (
    <button
      type={props.type}
      className={`buttonComp ${props.outline ? "buttonComp-outline" : ""} ${
        props.raised ? "buttonComp-raised" : " "
      } ${props.disabled ? "buttonComp-disabled" : " "}`}
      disabled={props.disabled}
      style={props.style}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export default Button;
