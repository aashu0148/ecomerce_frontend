import React from "react";

import "./Popup.css";

function Popup(props) {
  return (
    <div
      className={`sweet-popup ${
        props.error ? "sweet-popup-red" : "sweet-popup-green"
      } ${props.active ? "sweet-popup_active" : ""}
      `}
    >
      <div className="sweet-popup_child">{props.text}</div>
    </div>
  );
}

export default Popup;
