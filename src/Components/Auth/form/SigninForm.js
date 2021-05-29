import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../../store/action";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import jwt from "jsonwebtoken";
import GoogleLogin from "react-google-login";
import googleLogo from "../../../assets/svg/google.svg";

import secretKey from "../../../secret";
import Button from "../../Button/Button";
import Spinner from "../../Spinner/Spinner";
import "./form.css";

function SigninForm(props) {
  const email = useRef();
  const password = useRef();

  const [errorMessage, setErrorMessage] = useState("");
  const [fieldError, setFieldError] = useState({
    email: "",
    password: "",
  });
  const [signinButtonDisabled, setSigninButtonDisabled] = useState(false);

  const [passwordFieldClicked, setPasswordFieldClicked] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const validateEmail = (email) => {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
    const emailValue = email.current.value;
    const passwordValue = password.current.value;

    if (!emailValue || !passwordValue) {
      setErrorMessage("Enter Credentials");
      setSigninButtonDisabled(true);
      return;
    }

    setSigninButtonDisabled(true);
    fetch(`${process.env.REACT_APP_SERVER}/user/signin`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue,
      }),
    })
      .then(async (res) => {
        setSigninButtonDisabled(false);
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
          id: data.data._id,
          name: data.data.name,
          email: data.data.email,
          mobile: data.data.mobile,
          cart: props.cart.concat(data.data.cart || []),
        });
        props.history.push("/");
      })
      .catch(() => {
        setSigninButtonDisabled(false);
        setErrorMessage("Enable to connect to server.");
      });
  };

  const onGoogleSignin = (res) => {
    const name = res.profileObj.name;
    const email = res.profileObj.email;
    const password = res.profileObj.googleId;

    setErrorMessage(<Spinner />);

    fetch(`${process.env.REACT_APP_SERVER}/user/google-signin`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!data.status) {
          setErrorMessage(data.message);
          return;
        }
        setErrorMessage("");

        const token = jwt.sign(
          {
            email: email,
            password: password,
          },
          secretKey,
          {
            expiresIn: "6d",
          }
        );

        localStorage.setItem("vastr-token", JSON.stringify(token));
        props.loginAction({
          id: data.data._id,
          name: data.data.name,
          email: data.data.email,
          mobile: data.data.mobile,
          cart: props.cart.concat(data.data.cart || []),
        });
        props.history.push("/");
      })
      .catch(() => {
        setErrorMessage("Enable to connect to server.");
      });
  };

  useEffect(() => {
    if (fieldError.email || fieldError.password) {
      setSigninButtonDisabled(true);
      return;
    }
    setErrorMessage("");
    setSigninButtonDisabled(false);
  }, [fieldError]);

  // useEffect(() => {

  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="signin-form">
      <h1 className="signin-form_head">Sign in</h1>
      <h3 className="signin-form_sub-head">Vastत्र</h3>
      <form onSubmit={(e) => submission(e)}>
        <div className="form-elem">
          <label>Email</label>
          <input
            ref={email}
            type="email"
            onChange={(e) => {
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
              ref={password}
              onFocus={() => setPasswordFieldClicked(true)}
              className="password-input"
              style={{ flex: "10" }}
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your Password"
              onChange={(e) => {
                if (!e.target.value.trim()) {
                  const myFieldError = { ...fieldError };
                  myFieldError.password = "Enter Password";
                  setFieldError(myFieldError);
                } else if (e.target.value.trim().length < 4) {
                  const myFieldError = { ...fieldError };
                  myFieldError.password = "Invalid Password";
                  setFieldError(myFieldError);
                } else {
                  const myFieldError = { ...fieldError };
                  myFieldError.password = "";
                  setFieldError(myFieldError);
                }
              }}
              onBlur={() => {
                setPasswordFieldClicked(false);
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
        <small
          style={{
            fontSize: "0.9rem",
            color: "#ff4500",
            fontWeight: "bolder",
            display: "block",
            maxWidth: "290px",
            textAlign: "center",
            margin: "auto",
          }}
        >
          {errorMessage}
        </small>

        <div style={{ display: "flex" }}>
          <GoogleLogin
            clientId="380286908369-0vpu801bt869hkr36jqhpbq7tkk1m26o.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                outline
                onClick={renderProps.onClick}
                style={{
                  color: "#000",
                  display: "flex",
                  alignItems: "center",
                  padding: "5px 10px",
                }}
              >
                <img
                  src={googleLogo}
                  style={{ height: "24px", width: "24px", margin: "0 4px 0 0" }}
                  alt="Google signin"
                />
                Google Signin
              </Button>
            )}
            onSuccess={(res) => onGoogleSignin(res)}
            onFailure={(res) => {
              setErrorMessage(res.error);
            }}
            cookiePolicy="single_host_origin"
          />

          <Button
            raised={!signinButtonDisabled}
            disabled={signinButtonDisabled}
            type="submit"
          >
            Sign in
          </Button>
        </div>
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

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
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
        id: data.id,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SigninForm);
