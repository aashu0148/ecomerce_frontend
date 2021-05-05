import React from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";

import "./CartCard.css";

function CartCard(props) {
  return (
    <Grid
      container
      spacing={1}
      style={{
        width: "100%",
        margin: "0",
        maxHeight: "200px",
      }}
      className="cart-card"
    >
      <Grid
        item
        xs={4}
        lg={4}
        className="cart-card_left"
        style={{ maxHeight: "200px" }}
      >
        <img
          style={{ maxHeight: "200px" }}
          src="https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/11207372/2020/2/5/43210b97-11e6-43f3-b011-357a8bdacf8b1580902145818-Jack--Jones-Men-Shirts-5381580902144477-1.jpg"
          alt="Not found"
        />
      </Grid>
      <Grid item xs={8} lg={8} className="cart-card_right">
        <h2>{props.title || "Title"}</h2>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    mobileView: state.mobileView,
  };
};

export default connect(mapStateToProps)(CartCard);
