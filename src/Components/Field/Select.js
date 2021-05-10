import React from "react";
import { useState } from "react";

import "./Field.css";

function Select(props) {
  const [value, setValue] = useState("");

  if (props.value) props.value(value);

  return (
    <div className="field-form-elem">
      <label>{props.label}</label>
      <select onChange={(e) => setValue(e.target.value)}>
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
