import React, { useState, useRef, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actionTypes from "../../store/action";
import { Grid } from "@material-ui/core";
import CartIcon from "@material-ui/icons/ShoppingBasketOutlined";
import DownIcon from "@material-ui/icons/ArrowDropDownOutlined";
import SearchIcon from "@material-ui/icons/Search";

import Logo from "./Logo/Logo";
import ListItem from "../ListItem/ListItem";
import "./Navbar.css";

function Navbar(props) {
  const search = useRef();
  const [redirect, setRedirect] = useState(false);
  const [searchInputFocus, setSearchInputFocus] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);

  useEffect(() => {
    if (redirect) {
      setRedirect(false);
    }
  }, [redirect]);

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
            <SearchIcon
              style={{ cursor: "pointer", color: "#afacad" }}
              onClick={() => {
                if (search.current.value) setRedirect(true);
              }}
            />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (search.current.value) setRedirect(true);
              }}
            >
              <input
                ref={search}
                onFocus={() => setSearchInputFocus(true)}
                onBlur={() => setSearchInputFocus(false)}
                type="text"
                placeholder="Search for clothing "
              />
            </form>
            {redirect ? (
              <Redirect to={`/products/${search.current.value}`} />
            ) : (
              ""
            )}
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
                    {props.cart ? props.cart.length : "_"}
                  </p>
                </div>
              </Link>
              <div className="navbar_right_item">
                {/* <Avatar
                  style={{ height: "32px", width: "32px", margin: "0 4px" }}
                  src=""
                /> */}
                {props.auth ? (
                  <p
                    onClick={() => setDropdownActive(!dropdownActive)}
                    style={{ cursor: "pointer" }}
                  >
                    {props.name || "Hello signin"}
                  </p>
                ) : (
                  <Link
                    to="/signin"
                    style={{ textDecoration: "none", color: "#000" }}
                  >
                    <p
                      // onClick={() => setDropdownActive(!dropdownActive)}
                      style={{ cursor: "pointer" }}
                    >
                      {props.name || "Hello signin"}
                    </p>
                  </Link>
                )}
                {props.auth ? (
                  <DownIcon
                    onClick={() => setDropdownActive(!dropdownActive)}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <Link
                    to="/signin"
                    style={{ textDecoration: "none", color: "#000" }}
                  >
                    <DownIcon
                      // onClick={() => setDropdownActive(!dropdownActive)}
                      style={{ cursor: "pointer" }}
                    />
                  </Link>
                )}
              </div>
              <div
                className={`navbar_dropdown ${
                  dropdownActive ? "navbar_dropdown_active" : " "
                }`}
              >
                <Link
                  to={`${props.auth ? "/profile" : "/signin"}`}
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  <ListItem noHover>Profile</ListItem>
                </Link>
                <Link
                  to={`${props.auth ? "/orders" : "/signin"}`}
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  <ListItem noHover>My Orders</ListItem>
                </Link>
                <ListItem noHover>Wishlist</ListItem>
                <ListItem
                  noHover
                  last
                  onClick={() => {
                    props.logoutAction();
                    setDropdownActive(false);
                  }}
                >
                  Logout
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
    auth: state.auth,
    name: state.name,
    email: state.email,
    mobileView: state.mobileView,
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutAction: () => dispatch({ type: actionTypes.LOGOUT }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
