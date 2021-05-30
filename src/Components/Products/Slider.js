import React, { useState } from "react";
import { Slider } from "@material-ui/core";

let timer;
function Slide(props) {
  const [value, setValue] = useState(props.value);
  return (
    <div>
      <Slider
        style={{ color: "var(--primary-color)" }}
        value={value}
        min={0}
        max={20000}
        step={100}
        onChange={(event, newValue) => {
          setValue(newValue);
          clearTimeout(timer);
          timer = setTimeout(() => {
            props.onChanged(value);
          }, 300);
        }}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
      />
    </div>
  );
}

export default Slide;
