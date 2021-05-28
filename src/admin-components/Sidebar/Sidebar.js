import React, { useState } from "react";
import { connect } from "react-redux";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import { Divider } from "@material-ui/core";

import ListItem from "../../Components/ListItem/ListItem";
import "./Sidebar.css";

function Sidebar(props) {
  const [burgerActive, setBurgerActive] = useState(false);
  const [selectedItem, setSelectedItem] = useState(1);

  return (
    <div
      style={{
        borderRight: props.mobileView ? "" : "6px solid var(--primary-color)",
      }}
      className="admin-sidebar"
    >
      <div
        className={`admin-sidebar_backdrop ${
          burgerActive ? "admin-sidebar_backdrop_active" : ""
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
        className={`admin-sidebar_inner ${
          props.mobileView ? "admin-sidebar_inner_mobile" : ""
        } ${burgerActive ? "admin-sidebar_inner_mobile_active" : ""}`}
      >
        <h2>Dashboard</h2>
        <ul>
          <ListItem
            selected={selectedItem === 1}
            onClick={() => {
              setSelectedItem(1);
              props.changeBox("orders");
              setBurgerActive(false);
            }}
          >
            Orders
          </ListItem>
          <ListItem
            selected={selectedItem === 2}
            onClick={() => {
              setSelectedItem(2);
              props.changeBox("products");
              setBurgerActive(false);
            }}
          >
            Products
          </ListItem>
          <ListItem
            selected={selectedItem === 3}
            onClick={() => {
              setSelectedItem(3);
              props.changeBox("home");
              setBurgerActive(false);
            }}
            last={!props.mobileView}
          >
            Home
          </ListItem>
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
