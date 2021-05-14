import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import { Divider } from "@material-ui/core";

import ListItem from "../ListItem/ListItem";
import newIn from "../../assets/svg/flash.svg";
import cloth from "../../assets/svg/cloth.svg";
import shoes from "../../assets/svg/shoes.svg";
import Icon from "../Icon";
import "./Sidebar.css";

function Sidebar(props) {
  const [burgerActive, setBurgerActive] = useState(false);

  return (
    <div className="sidebar">
      <div
        className={`sidebar_backdrop ${
          burgerActive ? "sidebar_backdrop_active" : ""
        }`}
        onClick={() => setBurgerActive(false)}
      />
      {props.mobileView ? (
        <div
          className="sidebar_burger"
          onClick={() => setBurgerActive(!burgerActive)}
        >
          {burgerActive ? <CloseIcon /> : <MenuIcon />}
          <Divider />
        </div>
      ) : (
        ""
      )}
      <div
        className={`sidebar_inner ${
          props.mobileView ? "sidebar_inner_mobile" : ""
        } ${burgerActive ? "sidebar_inner_mobile_active" : ""}`}
      >
        <h1>Explore</h1>
        <ul>
          {/* <Link to="/products"> */}
          <ListItem>
            <Icon src={newIn} /> <p>New in</p>
          </ListItem>
          {/* </Link> */}

          <ListItem>
            <Icon src={cloth} /> <p>Clothing</p>
          </ListItem>
          <ListItem>
            <Icon src={shoes} /> <p>Footware</p>
          </ListItem>
          <Link
            to="/products"
            style={{ textDecoration: "none", color: "#000" }}
          >
            <ListItem last={!props.mobileView}>Products</ListItem>
          </Link>
          {props.mobileView ? (
            props.auth ? (
              <>
                <Link
                  to="/signin"
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  <ListItem>Profile</ListItem>
                </Link>
                <Link
                  to="/products"
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  <ListItem>Products</ListItem>
                </Link>
                <ListItem>My Orders</ListItem>
                <ListItem last>Wishlist</ListItem>
              </>
            ) : (
              <Link
                to="/signin"
                style={{ textDecoration: "none", color: "#000" }}
              >
                <ListItem last>Hello Signin</ListItem>
              </Link>
            )
          ) : (
            " "
          )}
        </ul>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    mobileView: state.mobileView,
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Sidebar);
