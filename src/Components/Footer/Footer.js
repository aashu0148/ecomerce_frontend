import React from "react";
import { Divider, Grid } from "@material-ui/core";

import Logo from "../Navbar/Logo/Logo";
import Icon from "../Icon";
import instagram from "../../assets/svg/instagram.svg";
import facebook from "../../assets/svg/facebook.svg";
import twitter from "../../assets/svg/twitter.svg";
import linkedin from "../../assets/svg/linkedin.svg";
import "./Footer.css";

function Footer() {
  return (
    <Grid
      className="footer"
      container
      spacing={3}
      style={{ margin: "0", width: "100%" }}
      alignItems="center"
    >
      <Grid item xs={12} md={12} lg={12}>
        <Divider />
      </Grid>
      <Grid item xs={12} md={3} lg={3}>
        <Logo center />
      </Grid>
      <Grid item xs={12} md={5} lg={5}>
        <h2 style={{ textAlign: "center" }}>Social Links</h2>
        <div
          style={{
            maxWidth: "450px",
            margin: "auto",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Icon size="36px" style={{ cursor: "pointer" }} src={instagram} />
          <Icon size="36px" style={{ cursor: "pointer" }} src={facebook} />
          <Icon size="36px" style={{ cursor: "pointer" }} src={linkedin} />
          <Icon size="36px" style={{ cursor: "pointer" }} src={twitter} />
        </div>
      </Grid>
      <Grid item xs={12} md={4} lg={4} style={{ textAlign: "center" }}>
        <h2 style={{ textAlign: "center" }}>Contact Us</h2>
        <p>Business address lies here</p>
        <p>Phone : 465789413</p>
      </Grid>
    </Grid>
  );
}

export default Footer;
