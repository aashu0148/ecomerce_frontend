import React, { useState } from "react";
import { connect } from "react-redux";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import { Divider } from "@material-ui/core";

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
          <li>
            <Icon src={newIn} /> <p>New in</p>
          </li>

          <li>
            <Icon src={cloth} /> <p>Clothing</p>
          </li>
          <li>
            <Icon src={shoes} /> <p>Footware</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    mobileView: state.mobileView,
  };
};

export default connect(mapStateToProps)(Sidebar);
