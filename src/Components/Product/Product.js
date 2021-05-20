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

  const popup = (text) => {
    setPopupText(text);
    setPopupActive(true);
    setTimeout(() => {
      setPopupActive(false);
    }, 2000);
  };

  useEffect(() => {
    const product = {
      id: id,
      title: "Title goes here",
      price: {
        S: "1500",
        M: "1500",
        L: "1600",
        XL: "1650",
      },
      sizes: ["S", "M", "L", "XL"],
      size: "L",
      desc: `This is Dummy text instead of it here goes the DESCRIPTION of the
      product. Etiam et dapibus urna. Nam dapibus, sem vitae rhoncus
      porta, lorem nisl tincidunt metus, sed vehicula velit odio ac
      odio. Aliquam malesuada cursus leo a dapibus. Vestibulum vel
      euismod velit. Nulla ac dui sodales, fermentum tortor a, consequat
      nulla. Ut non mauris nulla. Phasellus luctus auctor odio,
      facilisis dignissim erat commodo in. Nullam nulla quam, mattis ut
      est nec, laoreet viverra lacus.`,
      image:
        "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/11207672/2020/3/17/d7a23f89-f0df-43b4-a00d-1a3742e8cafe1584442789288-Jack--Jones-Men-White--Black-Slim-Fit-Checked-Casual-Shirt-5-4.jpg",
      images: [
        "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/11207672/2020/3/17/d7a23f89-f0df-43b4-a00d-1a3742e8cafe1584442789288-Jack--Jones-Men-White--Black-Slim-Fit-Checked-Casual-Shirt-5-4.jpg",
        "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/8131511/2019/10/30/f95ebc59-e8c2-44b1-8b26-4a2078af530d1572428433517-Jack--Jones-Men-Olive-Green-Slim-Fit-Solid-Chinos-7721572428-1.jpg",
        "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/11207372/2020/2/5/43210b97-11e6-43f3-b011-357a8bdacf8b1580902145818-Jack--Jones-Men-Shirts-5381580902144477-1.jpg",
      ],
      filters: {
        season: ["summer"],
        for: ["men"],
        type: ["footware", "topware"],
        brand: "name of brand",
      },
      tags: [],
    };
    setProduct(product);

    const inner = product.images.map((item, i) => (
      <div key={i}>
        <img
          className="product_carousel_img"
          style={{ height: "460px" }}
          src={item}
          alt="not found"
        />
      </div>
    ));

    setCarouselInner(inner);

    setPageLoaded(true);
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
                Price - ₹<span>{product.price[product.size] || "_"}</span>
              </p>

              <p className="product_size">
                Size -
                {product.sizes.map((item, i) => (
                  <span
                    onClick={() => {
                      const myProduct = { ...product };
                      myProduct.size = item;
                      setProduct(myProduct);
                    }}
                    key={i}
                    className={`${
                      item === product.size ? "product_size_active" : ""
                    }`}
                  >
                    {item}
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
