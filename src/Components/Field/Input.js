import React, { useState } from "react";

import "./Field.css";

function Input(props) {
  const [error, setError] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  if (props.onError) props.onError(error);

  return (
    <div className="field-form-elem">
      <label>{props.label}</label>
      {props.type === "email" ? (
        <input
          type="text"
          disabled={props.disabled}
          className={`${props.disabled ? "field-form-elem_disabled" : ""}`}
          onChange={(e) => {
            if (props.onChange) props.onChange(e);
            const value = e.target.value.trim();
            const regex =
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (e.target.value.trim() === "") {
              setError("Enter Email");
            } else if (regex.test(String(value).toLowerCase())) {
              setError("");
            } else {
              setError("Invalid Email");
            }
          }}
          placeholder="abc@xyz.com"
        />
      ) : props.type === "phone" ? (
        <input
          type="tel"
          disabled={props.disabled}
          className={`${props.disabled ? "field-form-elem_disabled" : ""}`}
          maxLength="10"
          pattern="[0-9]{10}"
          placeholder="1234567899"
          value={phoneValue}
          onChange={(e) => {
            if (props.onChange) props.onChange(e);
            const value = e.target.value;
            const char = value.slice(-1);
            if ((char >= "0" && char <= "9") || value === "")
              setPhoneValue(value);
            if (e.target.value === "") {
              setError("Enter Phone Number");
            } else if (e.target.value.length < 10) {
              setError("Invalid Phone Number");
            } else if (
              char >= "0" &&
              char <= "9" &&
              e.target.value.length === 10
            ) {
              setError("");
            }
          }}
        />
      ) : props.type === "textarea" ? (
        <textarea
          maxLength={props.max}
          disabled={props.disabled}
          className={`${props.disabled ? "field-form-elem_disabled" : ""}`}
          onChange={(e) => {
            if (props.onChange) props.onChange(e);
            if (e.target.value) {
              setError("");
            } else {
              setError(`Enter value`);
            }
          }}
          placeholder="Address"
        />
      ) : (
        <input
          type="text"
          disabled={props.disabled}
          className={`${props.disabled ? "field-form-elem_disabled" : ""}`}
          placeholder={`Enter ${props.label || "value"}`}
          onChange={(e) => {
            if (props.onChange) props.onChange(e);
            if (e.target.value) {
              setError("");
            } else {
              setError(`Enter value`);
            }
          }}
          value={props.value ? props.value : undefined}
        />
      )}
      <small className="field-error-msg">{error}</small>
    </div>
  );
}

export default Input;
