import React from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";

import SignupForm from "./form/SignupForm";
import signupSvg from "../../assets/svg/signup.svg";
import "./form/form.css";

function Signup(props) {
  return (
    <Grid
      container
      spacing={3}
      style={{ margin: "0", width: "100%" }}
      className="signin"
      alignItems="center"
    >
      {!props.mobileView ? (
        <Grid item sm={5} md={6} lg={6} style={{ textAlign: "center" }}>
          <img
            style={{ width: "400px", margin: "auto", maxWidth: "100%" }}
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
  );
}

const mapStateToProps = (state) => {
  return {
    mobileView: state.mobileView,
  };
};

export default connect(mapStateToProps)(Signup);
