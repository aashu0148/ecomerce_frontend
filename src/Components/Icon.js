import React from "react";

function Icon(props) {
  return (
    <div
      style={{
        height: props.size || 24,
        width: props.size || 24,
        borderRadius: "50%",
      }}
    >
      <img
        style={{
          height: "100%",
          width: "100%",
          objectFit: "cover",
        }}
        src={props.src}
        alt="Not found"
      />
    </div>
  );
}

export default Icon;
