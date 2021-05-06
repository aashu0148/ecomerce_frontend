import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Avatar, Grid } from "@material-ui/core";
import CartIcon from "@material-ui/icons/ShoppingBasketOutlined";
import DownIcon from "@material-ui/icons/ArrowDropDownOutlined";
import SearchIcon from "@material-ui/icons/Search";

import Logo from "./Logo/Logo";
import ListItem from "../ListItem/ListItem";
import "./Navbar.css";

function Navbar(props) {
  const [searchInputFocus, setSearchInputFocus] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);

  return (
    <div className="navbar">
      <div
        className={`navbar_backdrop ${
          dropdownActive ? "navbar_backdrop_active" : " "
        }`}
        onClick={() => setDropdownActive(false)}
      />
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={10} sm={3} md={3} lg={3}>
          <Logo />
        </Grid>
        {props.mobileView ? (
          <Link to="/cart" style={{ textDecoration: "none", color: "#000" }}>
            <Grid
              item
              xs={2}
              style={{ margin: "auto", textAlign: "center", display: "flex" }}
            >
              <CartIcon />
              <p
                style={{
                  marginTop: "auto",
                  marginBottom: "0",
                  fontWeight: "bolder",
                }}
              >
                {props.cart.length}
              </p>
            </Grid>
          </Link>
        ) : (
          ""
        )}
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <div
            className="navbar_search"
            style={{
              boxShadow: searchInputFocus
                ? "-1px 2px 5px rgb(0 0 0 / 12%)"
                : "-1px 2px 5px rgb(0 0 0 / 5%)",
            }}
          >
            <SearchIcon style={{ cursor: "pointer", color: "#afacad" }} />
            <input
              onFocus={() => setSearchInputFocus(true)}
              onBlur={() => setSearchInputFocus(false)}
              type="text"
              placeholder="Search for clothing "
            />
          </div>
        </Grid>
        {!props.mobileView ? (
          <Grid item xs={12} sm={3} md={3} lg={3}>
            <div className="navbar_right">
              <Link
                to="/cart"
                style={{ textDecoration: "none", color: "#000" }}
              >
                <div className="navbar_right_item">
                  <CartIcon />
                  <p
                    style={{
                      marginTop: "auto",
                      marginBottom: "0",
                      fontWeight: "bolder",
                    }}
                  >
                    {props.cart.length}
                  </p>
                </div>
              </Link>
              <div className="navbar_right_item">
                <Avatar
                  style={{ height: "32px", width: "32px", margin: "0 4px" }}
                  src=""
                />
                <p
                  onClick={() => setDropdownActive(!dropdownActive)}
                  style={{ cursor: "pointer" }}
                >
                  User
                </p>
                <DownIcon
                  onClick={() => setDropdownActive(!dropdownActive)}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <div
                className={`navbar_dropdown ${
                  dropdownActive ? "navbar_dropdown_active" : " "
                }`}
              >
                <ListItem noHover>Item</ListItem>
                <ListItem noHover>Item 2</ListItem>
                <ListItem noHover last>
                  Item 3
                </ListItem>
              </div>
            </div>
          </Grid>
        ) : (
          ""
        )}
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    mobileView: state.mobileView,
    cart: state.cart,
  };
};

export default connect(mapStateToProps)(Navbar);
