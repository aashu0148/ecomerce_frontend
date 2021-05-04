import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import { Grid } from "@material-ui/core";
import BackIcon from "@material-ui/icons/KeyboardBackspace";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Button from "../Button/Button";
import "./Product.css";

function Product(props) {
  const id = props.match.params.id;
  console.log(id);
  return (
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
            width={props.mobileView ? "100%" : "350px"}
            stopOnHover={true}
            className="product_carousel"
          >
            <div>
              <img
                className="product_carousel_img"
                style={{ height: "460px" }}
                src="https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/11207672/2020/3/17/d7a23f89-f0df-43b4-a00d-1a3742e8cafe1584442789288-Jack--Jones-Men-White--Black-Slim-Fit-Checked-Casual-Shirt-5-4.jpg"
                alt="not found"
              />
            </div>
            <div>
              <img
                style={{ height: "460px" }}
                className="product_carousel_img"
                src="https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/8131511/2019/10/30/f95ebc59-e8c2-44b1-8b26-4a2078af530d1572428433517-Jack--Jones-Men-Olive-Green-Slim-Fit-Solid-Chinos-7721572428-1.jpg"
                alt="not found"
              />
            </div>
            <div>
              <img
                style={{ height: "460px" }}
                className="product_carousel_img"
                src="https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/11207372/2020/2/5/43210b97-11e6-43f3-b011-357a8bdacf8b1580902145818-Jack--Jones-Men-Shirts-5381580902144477-1.jpg"
                alt="not found"
              />
            </div>
          </Carousel>
        </Grid>

        <Grid item xs={12} sm={7} lg={7} className="product_content">
          <div>
            <h1>Product Title goes here.</h1>
            <p className="product_price">
              Price - ₹<span>1800</span>
            </p>
            <p className="product_desc">
              This is Dummy text instead of it here goes the DESCRIPTION of the
              product. Etiam et dapibus urna. Nam dapibus, sem vitae rhoncus
              porta, lorem nisl tincidunt metus, sed vehicula velit odio ac
              odio. Aliquam malesuada cursus leo a dapibus. Vestibulum vel
              euismod velit. Nulla ac dui sodales, fermentum tortor a, consequat
              nulla. Ut non mauris nulla. Phasellus luctus auctor odio,
              facilisis dignissim erat commodo in. Nullam nulla quam, mattis ut
              est nec, laoreet viverra lacus.
            </p>
          </div>
          <Button type="button" raised style={{ marginRight: "10px" }}>
            Add to Cart
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    mobileView: state.mobileView,
  };
};

export default connect(mapStateToProps)(Product);
