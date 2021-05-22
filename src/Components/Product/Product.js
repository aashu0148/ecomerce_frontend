import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import { Grid } from "@material-ui/core";
import BackIcon from "@material-ui/icons/KeyboardBackspace";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import * as actionTypes from "../../store/action";
import Spinner from "../Spinner/Spinner";
import Navbar from "../Navbar/Navbar";
import Button from "../Button/Button";
import Popup from "../SweetPopup/Popup";
import "./Product.css";

function Product(props) {
  const id = props.match.params.id;

  const [product, setProduct] = useState();
  const [carouselInner, setCarouselInner] = useState();
  const [pageLoaded, setPageLoaded] = useState(false);
  const [popupText, setPopupText] = useState("");
  const [popupActive, setPopupActive] = useState("");
  const [size, setSize] = useState("");

  const popup = (text) => {
    setPopupText(text);
    setPopupActive(true);
    setTimeout(() => {
      setPopupActive(false);
    }, 2000);
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER}/product/${id}`)
      .then(async (res) => {
        setTimeout(() => {
          setPageLoaded(true);
        }, 300);
        const response = await res.json();
        const data = response.data;
        setSize(Object.keys(data.price)[0]);
        setProduct(data);

        const inner = data.images.map((item, i) => (
          <div key={i}>
            <img
              className="product_carousel_img"
              style={{ height: "460px" }}
              src={`${process.env.REACT_APP_SERVER}/${item}`}
              alt="not found"
            />
          </div>
        ));

        setCarouselInner(inner);
      })
      .catch(() => {
        setPageLoaded(true);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return pageLoaded ? (
    <div>
      <Navbar />
      <Popup text={popupText} active={popupActive} />
      <div className="product">
        <Link to="/products" style={{ textDecoration: "none" }}>
          <div className="product_back-button">
            <BackIcon />
            Back
          </div>
        </Link>
        <Grid container spacing={3} style={{ margin: "0", width: "100%" }}>
          <Grid item xs={12} sm={5} lg={5}>
            <Carousel
              autoPlay
              interval={2000}
              infiniteLoop
              showStatus={false}
              useKeyboardArrows
              showThumbs={false}
              showArrows={false}
              emulateTouch
              width={props.mobileView ? "100%" : "340px"}
              stopOnHover={true}
              className="product_carousel"
            >
              {carouselInner}
            </Carousel>
          </Grid>

          <Grid item xs={12} sm={7} lg={7} className="product_content">
            <div>
              <h1>{product.title || "_"}</h1>
              <p className="product_price">
                Price - ₹<span>{product.price[size] || "_"}</span>
              </p>

              <p className="product_size">
                Size -
                {Object.keys(product.price).map((item, i) => (
                  <span
                    onClick={() => {
                      setSize(item);
                    }}
                    key={i}
                    className={`${item === size ? "product_size_active" : ""}`}
                  >
                    {item.toUpperCase()}
                  </span>
                ))}
              </p>
              <p className="product_desc">{product.desc || "_"}</p>
            </div>
            <Button
              onClick={() => {
                props.addProductAction(product);
                popup("Added to Cart");
              }}
              type="button"
              raised
              style={{ marginRight: "10px" }}
            >
              Add to Cart
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  ) : (
    <Spinner />
  );
}

const mapStateToProps = (state) => {
  return {
    mobileView: state.mobileView,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addProductAction: (product) =>
      dispatch({ type: actionTypes.ADD_PRODUCT, product }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
