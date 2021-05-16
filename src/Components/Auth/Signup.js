import React from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";

import Logo from "../Navbar/Logo/Logo";
import SignupForm from "./form/SignupForm";
import signupSvg from "../../assets/svg/signup.svg";
import "./form/form.css";

function Signup(props) {
  return !props.auth ? (
    <Grid
      container
      spacing={3}
      style={{ margin: "0", width: "100%" }}
      className="signup"
      // alignItems="center"
    >
      <Grid item xs={12} md={12} lg={12}>
        <Logo />
      </Grid>
      {!props.mobileView ? (
        <Grid item sm={5} md={6} lg={6} style={{ textAlign: "center" }}>
          <img
            style={{ width: "500px", margin: "auto", maxWidth: "100%" }}
            src={signupSvg}
            alt="Not found"
          />
        </Grid>
      ) : (
        " "
      )}
      <Grid item xs={12} sm={7} md={6} lg={6} style={{ textAlign: "center" }}>
        <SignupForm {...props} />
      </Grid>
    </Grid>
  ) : (
    <Redirect to="/" />
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    mobileView: state.mobileView,
  };
};

export default connect(mapStateToProps)(Signup);
