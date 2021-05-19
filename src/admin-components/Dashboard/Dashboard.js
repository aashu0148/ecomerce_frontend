import React, { useState, useEffect } from "react";
// import * as actionTypes from "../../store/action";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Grid } from "@material-ui/core";

import Logo from "../../Components/Navbar/Logo/Logo";
import PreLoader from "../../Components/PreLoader/PreLoader";
import Sidebar from "../Sidebar/Sidebar";
import Products from "../Main/Products";
import Orders from "../Main/Orders";

function Dashboard(props) {
  const [preloading, setPreloading] = useState(true);
  const [mainBox, setMainBox] = useState(<Orders />);

  const changeBox = (box) => {
    switch (box) {
      case "products": {
        setMainBox(<Products />);
        break;
      }
      case "orders": {
        setMainBox(<Orders />);
        break;
      }
      default:
        break;
    }
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER}/user/check-role`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        id: props.id,
        email: props.email,
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!data.status) {
          window.location.href = "/";
          return;
        }
        setPreloading(false);
      })
      .catch(() => {
        window.location.href = "/";
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return props.auth ? (
    preloading ? (
      <PreLoader />
    ) : (
      <div className="admin-dashboard">
        <Grid container spacing={2} style={{ margin: "0", width: "100%" }}>
          <Grid
            item
            xs={5}
            sm={5}
            md={4}
            lg={3}
            style={{ paddingLeft: "15px", paddingRight: "0" }}
          >
            <Logo />
          </Grid>
          <Grid item xs={7} sm={7} md={8} lg={9}></Grid>
          <Grid
            style={{ position: "relative", width: "100%", paddingRight: "0" }}
            container
            spacing={2}
            item
            xs={12}
            md={12}
            lg={12}
          >
            <Grid item xs={12} sm={3} md={3} lg={2}>
              <Sidebar changeBox={changeBox} />
            </Grid>
            <Grid item xs={12} sm={9} md={9} lg={10}>
              {mainBox}
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  ) : (
    <Redirect to="/" />
  );
}

const mapStateToProps = (state) => {
  return {
    id: state.id,
    email: state.email,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
