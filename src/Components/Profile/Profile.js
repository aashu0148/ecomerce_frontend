import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Grid, Divider } from "@material-ui/core";

import Navbar from "../Navbar/Navbar";
import Input from "../Field/Input";
import Button from "../Button/Button";

function Profile(props) {
  const [emailValue, setEmailvalue] = useState(props.email || "");
  const [mobileValue, setMobilevalue] = useState(props.mobile || "");

  useEffect(() => {
    setEmailvalue(props.email);
    setMobilevalue(props.mobile);
  }, [props.email, props.mobile]);

  return (
    <div className="profile">
      <Navbar />
      <Grid
        container
        spacing={2}
        style={{ margin: "0", width: "100%" }}
        justify="center"
      >
        <Grid item xs={12} md={12} lg={12}>
          <h1>Profile</h1>
        </Grid>
        <Grid
          item
          container
          xs={12}
          md={10}
          lg={9}
          style={{ background: "#fff", padding: "15px" }}
          alignItems="flex-end"
        >
          <Grid item xs={4} lg={4}>
            <h3 style={{ margin: "10px 0" }}>Name</h3>
          </Grid>
          <Grid item xs={8} lg={8}>
            <Input disabled value={props.name} />
          </Grid>
          <Grid item xs={12} md={12} lg={12} style={{ margin: "4px 0" }}>
            <Divider />
          </Grid>
          <Grid item xs={4} lg={4}>
            <h3 style={{ margin: "10px 0" }}>Email</h3>
          </Grid>
          <Grid item xs={8} lg={8}>
            <Input
              value={emailValue}
              // value={props.email}
              onChange={(e) => {
                setEmailvalue(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12} style={{ margin: "4px 0" }}>
            <Divider />
          </Grid>
          <Grid item xs={4} lg={4}>
            <h3 style={{ margin: "10px 0" }}>Mobile</h3>
          </Grid>
          <Grid item xs={8} lg={8}>
            <Input
              value={mobileValue}
              onChange={(e) => {
                setMobilevalue(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12} style={{ margin: "4px 0" }}>
            <Divider />
          </Grid>

          <Button>Update</Button>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    name: state.name,
    mobile: state.mobile,
    email: state.email,
  };
};

export default connect(mapStateToProps)(Profile);
