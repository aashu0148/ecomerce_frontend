import React from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";

import Logo from "../Navbar/Logo/Logo";
import signinSvg from "../../assets/svg/signin.svg";
import SigninForm from "./form/SigninForm";
import "./Auth.css";

function Signin(props) {
  return (
    <Grid
      container
      spacing={3}
      style={{ margin: "0", width: "100%" }}
      className="signin"
      // alignItems="center"
    >
      <Grid item xs={12} md={12} lg={12}>
        <Logo />
      </Grid>
      {!props.mobileView ? (
        <Grid item sm={5} md={6} lg={6} style={{ textAlign: "center" }}>
          <img
            style={{ width: "530px", margin: "auto", maxWidth: "100%" }}
            src={signinSvg}
            alt="Not found"
          />
        </Grid>
      ) : (
        " "
      )}
      <Grid item xs={12} sm={7} md={6} lg={6} style={{ textAlign: "center" }}>
        <SigninForm {...props} />
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    mobileView: state.mobileView,
  };
};

export default connect(mapStateToProps)(Signin);
