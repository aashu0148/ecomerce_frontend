import React, { useEffect, useState } from "react";
import * as actionTypes from "./store/action";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PreLoader from "./Components/PreLoader/PreLoader";
import Navbar from "./Components/Navbar/Navbar";
import Body from "./Components/Body/Body";
import "./App.css";
import Products from "./Components/Products/Products";

let viewTimer;
function App(props) {
  const [mobileView, setMobileView] = useState(window.innerWidth < 600);

  const changeView = () => {
    clearTimeout(viewTimer);

    viewTimer = setTimeout(() => {
      setMobileView(window.innerWidth < 600);
    }, 400);
  };

  useEffect(() => {
    props.mobileViewAction(mobileView);
  }, [mobileView]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    window.addEventListener("resize", changeView);
    setTimeout(() => {
      props.loadedAction();
    }, 1000);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return props.preloading ? (
    <PreLoader />
  ) : (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/products">
            <Navbar />
            <Products />
          </Route>

          <Route path="/" exact>
            <Navbar />
            <Body />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    preloading: state.preloading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    mobileViewAction: (view) =>
      dispatch({ type: actionTypes.MOBILE_VIEW, mobileView: view }),
    loadedAction: () => dispatch({ type: actionTypes.LOADED }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
