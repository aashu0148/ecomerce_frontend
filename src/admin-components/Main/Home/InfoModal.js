import React from "react";

function InfoModal(props) {
  return (
    <div>
      <h2>Card details </h2>
      {props.data.text ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <h3>Text : </h3>
          <p>{props.data.text}</p>
        </div>
      ) : (
        ""
      )}
      {props.data.color ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <h3>Color : </h3>
          <p>{props.data.color}</p>
        </div>
      ) : (
        ""
      )}
      {props.data.background ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <h3>Background : </h3>
          <p>{props.data.background}</p>
        </div>
      ) : (
        ""
      )}
      <div style={{ display: "flex", alignItems: "start" }}>
        <h3>Filters : </h3>
        <p>
          {Object.keys(props.data.filters).map((key, i) => (
            <div
              key={i + key}
              style={{ display: "flex", alignItems: "center" }}
            >
              <h3>{key.toUpperCase()} - </h3>
              <p>{JSON.stringify(props.data.filters[key])}</p>
            </div>
          ))}
        </p>
      </div>
    </div>
  );
}

export default InfoModal;
