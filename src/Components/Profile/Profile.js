import React from "react";
import { connect } from "react-redux";
import { Grid, Divider } from "@material-ui/core";

import Navbar from "../Navbar/Navbar";
import Input from "../Field/Input";
import Button from "../Button/Button";

function Profile(props) {
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
            <Input disabled value={props.email} />
          </Grid>
          <Grid item xs={12} md={12} lg={12} style={{ margin: "4px 0" }}>
            <Divider />
          </Grid>
          <Grid item xs={4} lg={4}>
            <h3 style={{ margin: "10px 0" }}>Mobile</h3>
          </Grid>
          <Grid item xs={8} lg={8}>
            <Input disabled value={props.mobile} />
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
