import React, { useState, useEffect } from "react";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";

import Button from "../../Button/Button";
import "./form.css";

function SigninForm(props) {
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldError, setFieldError] = useState({
    email: "",
    password: "",
  });
  const [signinButtonDisabled, setSigninButtonDisabled] = useState(false);

  const [passwordFieldClicked, setPasswordFieldClicked] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const validateEmail = (email) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.trim() === "") {
      const myFieldError = { ...fieldError };
      myFieldError.email = "Enter Email";
      setFieldError(myFieldError);
    } else if (regex.test(String(email).toLowerCase())) {
      const myFieldError = { ...fieldError };
      myFieldError.email = "";
      setFieldError(myFieldError);
    } else {
      const myFieldError = { ...fieldError };
      myFieldError.email = "Invalid Email";
      setFieldError(myFieldError);
    }
  };

  const submission = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (false) {
      setErrorMessage("Error");
      setSigninButtonDisabled(false);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="signin-form">
      <h1 className="signin-form_head">Sign in</h1>
      <h3 className="signin-form_sub-head">Vastत्र</h3>
      <form onSubmit={(e) => submission(e)}>
        <div className="form-elem">
          <label>Email</label>
          <input
            type="email"
            onBlur={(e) => {
              const value = e.target.value;
              validateEmail(value);
            }}
            placeholder="abc@xyz.com"
          />
          <small className="field-error-msg">{fieldError.email}</small>
        </div>
        <div className="form-elem">
          <label>Password</label>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              background: "#fff",
              boxShadow: `${
                passwordFieldClicked
                  ? "-2px 7px 12px rgb(0 0 0 / 25%)"
                  : "-1px 2px 5px rgb(0 0 0 / 10%)"
              }`,
              position: "relative",
            }}
          >
            <input
              onFocus={() => setPasswordFieldClicked(true)}
              className="password-input"
              style={{ flex: "10" }}
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your Password"
              onBlur={(e) => {
                setPasswordFieldClicked(false);
                if (e.target.value.trim()) {
                  const myFieldError = { ...fieldError };
                  myFieldError.password = "";
                  setFieldError(myFieldError);
                } else {
                  const myFieldError = { ...fieldError };
                  myFieldError.password = "Enter Password";
                  setFieldError(myFieldError);
                }
              }}
            />
            {passwordVisible ? (
              <VisibilityIcon
                style={{ cursor: "pointer", marginRight: "10px" }}
                onClick={(e) => {
                  e.stopPropagation();
                  setPasswordVisible(!passwordVisible);
                }}
              />
            ) : (
              <VisibilityOffIcon
                style={{ cursor: "pointer", marginRight: "10px" }}
                onClick={(e) => {
                  e.stopPropagation();
                  setPasswordVisible(!passwordVisible);
                }}
              />
            )}
          </div>
          <small className="field-error-msg">{fieldError.password}</small>
        </div>

        <Button
          raised={!signinButtonDisabled}
          disabled={signinButtonDisabled}
          type="submit"
        >
          Sign in
        </Button>
        <small
          style={{
            fontSize: "0.9rem",
            color: "#ff4500",
            fontWeight: "bolder",
            display: "block",
            transform: "translateY(-10px)",
            maxWidth: "290px",
            textAlign: "center",
            margin: "auto",
          }}
        >
          {errorMessage}
        </small>
      </form>
      <br />
      <p className="signin_footer-text">
        New here? &nbsp;
        <span
          onClick={() => {
            props.history.push("/signup");
          }}
          className="signin_special-text"
        >
          Sign up
        </span>
      </p>
    </div>
  );
}

export default SigninForm;
