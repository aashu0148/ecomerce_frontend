import React from "react";
import { connect } from "react-redux";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from "@material-ui/core";

import notFound from "../../assets/svg/404.svg";

function NormalCard(props) {
  return (
    <Card
      style={{
        width: props.mobileView ? "165px" : "250px",
        boxShadow: "0px 1px 12px rgba(0 0 0 /10%)",
        margin: props.mobileView ? "2px" : "10px",
      }}
      raised
      onClick={props.onClick}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          image={props.image || notFound}
          title={props.imageTitle}
          style={{
            height: props.mobileView ? "220px" : "300px",
            objectFit: props.image ? "cover" : "contain",
          }}
        />
        <CardContent style={{ padding: "8px" }}>
          <h3
            style={{
              fontWeight: "bold",
              color: "#000",
              textTransform: "capitalize",
            }}
          >
            {props.title}
          </h3>
          <p>
            ₹ <span>{props.price}</span>
          </p>
        </CardContent>
        <br />
      </CardActionArea>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    mobileView: state.mobileView,
  };
};

export default connect(mapStateToProps)(NormalCard);
