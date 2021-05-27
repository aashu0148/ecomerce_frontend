import React from "react";
import { connect } from "react-redux";
import { Card, CardActionArea } from "@material-ui/core";

function TextCard(props) {
  return (
    <Card
      style={{
        width: props.mobileView ? "310px" : "400px",
        height: props.mobileView ? "200px" : "250px",
        boxShadow: "1px -1px 12px rgba(0 0 0 /15%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "10px",
        background:
          props.background ||
          "linear-gradient(to top left, var(--primary-color), var(--secondary-color))",
        color: props.color || "#000",
        borderRadius: "20px",
      }}
      raised
      onClick={props.onClick}
    >
      <CardActionArea
        style={{
          width: props.mobileView ? "310px" : "400px",
          height: props.mobileView ? "200px" : "250px",
          textAlign: "center",
        }}
      >
        <h1>{props.text}</h1>
      </CardActionArea>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    mobileView: state.mobileView,
  };
};

export default connect(mapStateToProps)(TextCard);
