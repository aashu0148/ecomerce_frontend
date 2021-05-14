import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../../store/action";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import jwt from "jsonwebtoken";
import secretKey from "../../../secret";

import Button from "../../Button/Button";

function SignupForm(props) {
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const phone = useRef();

  const [errorMessage, setErrorMessage] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [fieldError, setFieldError] = useState({
    email: "",
    phone: "",
    password: "",
  });
  const [signupButtonDisabled, setSignupButtonDisabled] = useState(false);

  const [passwordFieldClicked, setPasswordFieldClicked] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passError, setPassError] = useState({
    length: false,
    special: false,
    small: false,
    number: false,
  });

  const submission = (e) => {
    e.preventDefault();
    const nameValue = name.current.value;
    const emailValue = email.current.value;
    const phoneValue = phone.current.value;
    const passwordValue = password.current.value;

    if (!emailValue || !passwordValue || !phoneValue || !nameValue) {
      setErrorMessage("Enter Credentials");
      setSignupButtonDisabled(true);
      return;
    }

    setSignupButtonDisabled(true);
    fetch(`${process.env.REACT_APP_SERVER}/user/signup`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: nameValue,
        email: emailValue,
        mobile: phoneValue,
        password: passwordValue,
      }),
    })
      .then(async (res) => {
        setSignupButtonDisabled(false);
        const data = await res.json();
        if (!data.status) {
          setErrorMessage(data.message);
          return;
        }

        const token = jwt.sign(
          {
            email: emailValue,
            password: passwordValue,
          },
          secretKey,
          {
            expiresIn: "6d",
          }
        );

        localStorage.setItem("vastr-token", JSON.stringify(token));

        props.loginAction({
          name: nameValue,
          email: emailValue,
          mobile: phoneValue,
          cart: [],
        });
        props.history.push("/");
      })
      .catch(() => {
        setSignupButtonDisabled(false);
        setErrorMessage("Enable to connect to server.");
      });
  };

  useEffect(() => {
    if (
      fieldError.name ||
      fieldError.email ||
      fieldError.phone ||
      fieldError.password
    ) {
      setSignupButtonDisabled(true);
      return;
    }
    setErrorMessage("");
    setSignupButtonDisabled(false);
  }, [fieldError]);

  // useEffect(() => {
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="signup-form">
      <h1 className="signup-form_head">Sign up</h1>
      <h3 className="signup-form_sub-head">Vastत्र</h3>
      <form onSubmit={(e) => submission(e)}>
        <div className="form-elem">
          <label>Name</label>
          <input
            ref={name}
            type="text"
            placeholder="Enter your Name"
            onChange={(e) => {
              if (e.target.value) {
                const myError = { ...fieldError };
                myError.name = "";
                setFieldError(myError);
              } else {
                const myError = { ...fieldError };
                myError.name = "Enter Name";
                setFieldError(myError);
              }
            }}
          />
          <small className="field-error-msg">{fieldError.name}</small>
        </div>

        <div className="form-elem">
          <label>Email</label>
          <input
            ref={email}
            type="text"
            onChange={(e) => {
              const value = e.target.value.trim();
              const regex =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

              if (e.target.value.trim() === "") {
                const myFieldError = { ...fieldError };
                myFieldError.email = "Enter Email";
                setFieldError(myFieldError);
              } else if (regex.test(String(value).toLowerCase())) {
                const myFieldError = { ...fieldError };
                myFieldError.email = "";
                setFieldError(myFieldError);
              } else {
                const myFieldError = { ...fieldError };
                myFieldError.email = "Invalid Email";
                setFieldError(myFieldError);
              }
            }}
            placeholder="abc@xyz.com"
          />
          <small className="field-error-msg">{fieldError.email}</small>
        </div>
        <div className="form-elem">
          <label>Phone</label>
          <input
            ref={phone}
            type="tel"
            maxLength="10"
            pattern="[0-9]{10}"
            placeholder="1234567899"
            value={phoneValue}
            onChange={(e) => {
              const value = e.target.value;
              const char = value.slice(-1);
              if ((char >= "0" && char <= "9") || value === "")
                setPhoneValue(value);
              const myFieldError = { ...fieldError };
              if (e.target.value === "") {
                const myFieldError = { ...fieldError };
                myFieldError.phone = "Enter Phone Number";
                setFieldError(myFieldError);
              } else if (e.target.value.length < 10) {
                myFieldError.phone = "Invalid Phone Number";
                setFieldError(myFieldError);
              } else {
                myFieldError.phone = "";
                setFieldError(myFieldError);
              }
            }}
          />
          <small className="field-error-msg">{fieldError.phone}</small>
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
              ref={password}
              onFocus={() => setPasswordFieldClicked(true)}
              className="password-input"
              style={{ flex: "10" }}
              type={passwordVisible ? "text" : "password"}
              required
              placeholder="Enter your Password"
              onChange={(e) => {
                const value = e.target.value.trim();
                const numberRegex = /^(?=.*\d)/;
                const lengthRegex = /^.{6,15}$/;
                const specialRegex = /^(?=.*[!@#$%^&*])/;
                const smallRegex = /^(?=.*[a-z])/;

                const myErr = { ...passError };
                myErr.number = numberRegex.test(value);
                myErr.special = specialRegex.test(value);
                myErr.length = lengthRegex.test(value);
                myErr.small = smallRegex.test(value);
                setPassError(myErr);
              }}
              onBlur={(e) => {
                setPasswordFieldClicked(false);
                const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z]).{6,15}$/;
                if (e.target.value.trim() === "") {
                  const myFieldError = { ...fieldError };
                  myFieldError.password = "Enter Password";
                  setFieldError(myFieldError);
                } else if (regex.test(e.target.value)) {
                  const myFieldError = { ...fieldError };
                  myFieldError.password = "";
                  setFieldError(myFieldError);
                } else {
                  const myFieldError = { ...fieldError };
                  myFieldError.password = "Invalid Password";
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
            <div
              className={`signup-form_pass-box ${
                passwordFieldClicked ? "signup-form_pass-box_active" : " "
              }`}
            >
              <li>
                <CheckBoxIcon
                  style={{ color: `${passError.small ? "green" : "gray"}` }}
                />
                <p>Small letter [a-z]</p>
              </li>
              <li>
                <CheckBoxIcon
                  style={{ color: `${passError.number ? "green" : "gray"}` }}
                />
                <p>Number [0-9]</p>
              </li>
              <li>
                <CheckBoxIcon
                  style={{ color: `${passError.special ? "green" : "gray"}` }}
                />
                <p style={{ textAlign: "start" }}>
                  Special Character [!@#$%^&*]
                </p>
              </li>
              <li>
                <CheckBoxIcon
                  style={{ color: `${passError.length ? "green" : "gray"}` }}
                />
                <p>Length [6-15]</p>
              </li>
            </div>
          </div>

          <small className="field-error-msg">{fieldError.password}</small>
        </div>

        <Button
          raised={!signupButtonDisabled}
          disabled={signupButtonDisabled}
          type="submit"
        >
          Sign up
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
      <p className="signup_footer-text">
        Already a member? &nbsp;
        <span
          onClick={() => {
            props.history.push("/signin");
          }}
          className="signup_special-text"
        >
          Sign in
        </span>
      </p>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginAction: (data) =>
      dispatch({
        type: actionTypes.LOGIN,
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        cart: data.cart,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
