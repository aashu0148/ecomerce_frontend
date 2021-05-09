import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";

import Navbar from "../Navbar/Navbar";
import DropdownListItem from "../ListItem/DropdownListItem";
import "./Checkout.css";

function Checkout(props) {
  return props.auth && props.cart.length > 0 ? (
    <div className="checkout">
      <Navbar />
      <Grid item xs={12} md={12} lg={12}>
        <h1>Checkout</h1>
      </Grid>
      <DropdownListItem title="Login / Signup">
        Some text as child here. Rest is dummy text: o quis impe praesent semper
        feugiat nibh sed pulvinar proin. Nec sagittis aliquam malesuada bibendum
        arcu vitae elementum curabitur. Ornare arcu dui vivamus arcu felis.
        Maecenas volutpat blandit aliquam etiam erat velit. Neque convallis a
        cras semper auctor neque. Volutpat odio facilisis mauris sit amet massa
        vitae. Senectus et netus et malesuada fames ac. Nisl tincidunt eget
        nullam non nisi est sit amet facilisis. Gravida cum sociis natoque
        penatibus et magnis dis. Tristique senectus et netus{" "}
      </DropdownListItem>
      <DropdownListItem title="Login / Signup" valid>
        Some text as child here. Rest is dummy text: o quis impe praesent semper
        feugiat nibh sed pulvinar proin. Nec sagittis aliquam malesuada bibendum
        arcu vitae elementum curabitur. Ornare arcu dui vivamus arcu felis.
        Maecenas volutpat blandit aliquam etiam erat velit. Neque convallis a
        cras semper auctor neque. Volutpat odio facilisis mauris sit amet massa
        vitae. Senectus et netus et malesuada fames ac. Nisl tincidunt eget
        nullam non nisi est sit amet facilisis. Gravida cum sociis natoque
        penatibus et magnis dis. Tristique senectus et netus{" "}
      </DropdownListItem>
    </div>
  ) : (
    <Redirect to="/" />
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    cart: state.cart,
  };
};

export default connect(mapStateToProps)(Checkout);
