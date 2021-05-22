import React, { useEffect, useState } from "react";
import * as actionTypes from "./store/action";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import jwt from "jsonwebtoken";
import secretKey from "./secret";

import PreLoader from "./Components/PreLoader/PreLoader";
import pageNotFound from "./assets/svg/page-not-found.svg";
import Navbar from "./Components/Navbar/Navbar";
import Body from "./Components/Body/Body";
import Products from "./Components/Products/Products";
import ProductsSearch from "./Components/Products/ProductsSearch";
import Product from "./Components/Product/Product";
import Cart from "./Components/Cart/Cart";
import Signin from "./Components/Auth/Signin";
import Signup from "./Components/Auth/Signup";
import Checkout from "./Components/Checkout/Checkout";
import Profile from "./Components/Profile/Profile";
import Orders from "./Components/Orders/Orders";
import Dashboard from "./admin-components/Dashboard/Dashboard";
import "./App.css";

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
    const jwtToken = JSON.parse(localStorage.getItem("vastr-token")) || "";

    jwt.verify(jwtToken, secretKey, (err, data) => {
      if (err) {
        props.loadedAction();
        return;
      }
      fetch(`${process.env.REACT_APP_SERVER}/user/token-signin`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          token: jwtToken,
        }),
      })
        .then(async (res) => {
          const data = await res.json();
          setTimeout(() => {
            props.loadedAction();
          }, 300);
          if (!data.status) {
            return;
          }
          props.loginAction({
            name: data.data.name,
            email: data.data.email,
            mobile: data.data.mobile,
            cart: data.data.cart,
            id: data.data._id,
          });
        })
        .catch(() => {
          props.loadedAction();
        });
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return props.preloading ? (
    <PreLoader />
  ) : (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/admin" exact>
            <Dashboard />
          </Route>
          <Route path="/signin" exact component={Signin} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/products" exact>
            <Navbar />
            <Products />
          </Route>
          <Route
            path="/products/:search"
            render={(props) => {
              return (
                <>
                  <Navbar />
                  <ProductsSearch {...props} />
                </>
              );
            }}
          ></Route>
          <Route path="/product/:id" exact component={Product} />
          <Route path="/cart" exact>
            <Cart />
          </Route>
          <Route path="/profile" exact>
            <Profile />
          </Route>
          <Route path="/orders" exact>
            <Orders />
          </Route>
          <Route path="/checkout" exact>
            <Checkout />
          </Route>
          <Route path="/" exact>
            <Navbar />
            <Body />
          </Route>
          <Route path="/">
            <div style={{ textAlign: "center" }}>
              <img
                style={{ maxWidth: "360px" }}
                src={pageNotFound}
                alt="svg not found"
              />
              <h1
                style={{
                  textAlign: "center",
                  margin: "30px 0",
                  fontSize: "var(--font-gaint)",
                }}
              >
                Page not Found
              </h1>
            </div>
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
    loginAction: (data) =>
      dispatch({
        type: actionTypes.LOGIN,
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        cart: data.cart,
        id: data.id,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
