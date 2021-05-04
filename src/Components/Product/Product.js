import React from "react";
import { connect } from "react-redux";

import { Grid } from "@material-ui/core";

function Product(props) {
  const id = props.match.params.id;
  console.log(id);
  return <div className="product"></div>;
}

const mapStateToProps = (state) => {
  return {
    mobileView: state.mobileView,
  };
};

export default connect(mapStateToProps)(Product);
