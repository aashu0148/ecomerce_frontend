import React, { useState } from "react";
import { connect } from "react-redux";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import { Divider } from "@material-ui/core";

import ListItem from "../../Components/ListItem/ListItem";
import "./Sidebar.css";

function Sidebar(props) {
  const [burgerActive, setBurgerActive] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);

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
        <h1>Dashboard</h1>
        <ul>
          <ListItem
            selected={selectedItem === 0}
            onClick={() => {
              setSelectedItem(0);
              props.changeBox("overview");
            }}
          >
            Overview
          </ListItem>
          <ListItem
            selected={selectedItem === 1}
            onClick={() => {
              setSelectedItem(1);
              props.changeBox("products");
            }}
          >
            Products
          </ListItem>
          <ListItem
            selected={selectedItem === 2}
            onClick={() => {
              setSelectedItem(2);
              props.changeBox("orders");
            }}
            last={!props.mobileView}
          >
            Orders
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
