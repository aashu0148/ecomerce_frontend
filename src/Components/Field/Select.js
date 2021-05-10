import React from "react";

import "./Field.css";

function Select(props) {
  return (
    <div className="field-form-elem">
      <label>{props.label}</label>
      <select onChange={props.onChange}>
        {props.options
          ? props.options.map((item, i) => (
              <option key={item + i}>{item}</option>
            ))
          : ""}
      </select>
    </div>
  );
}

export default Select;
