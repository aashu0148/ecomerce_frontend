import React from "react";
import { connect } from "react-redux";
import { Card, CardActionArea, CardMedia } from "@material-ui/core";

import notFound from "../../assets/svg/404.svg";

function PictureCard(props) {
  return (
    <Card
      style={{
        width: props.mobileView ? "310px" : "400px",
        height: props.mobileView ? "200px" : "250px",
        boxShadow: "1px -1px 12px rgba(0 0 0 /15%)",
        display: "flex",
        alignItems: "center",
        justifyContent: props.justify || "start",
        margin: "10px",
        background: "#fff",
        textAlign: "center",
        borderRadius: "20px",
      }}
      raised
    >
      <CardActionArea style={{ color: "#fff" }}>
        <CardMedia
          // component="img"
          image={props.image || notFound}
          title={props.imageTitle}
          style={{
            width: props.mobileView ? "310px" : "400px",
            height: props.mobileView ? "200px" : "250px",
            backgroundSize: props.image ? "cover" : "contain",
            opacity: "0.8",
          }}
        />
      </CardActionArea>
      <div
        style={{
          position: "absolute",
          color: props.color || "#000",
          fontWeight: "900",
          fontSize: "var(--font-large)",
        }}
      >
        <h2
          style={{
            fontFamily: "sans-serif",
            margin: "10px",
            color: "#000",
          }}
        >
          {props.text}
        </h2>
      </div>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    mobileView: state.mobileView,
  };
};

export default connect(mapStateToProps)(PictureCard);
