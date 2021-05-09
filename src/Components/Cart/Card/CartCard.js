import React, { useState } from "react";
import { connect } from "react-redux";
import { Grid, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import * as actionTypes from "../../../store/action";
import Button from "../../Button/Button";
import notFound from "../../../assets/svg/404.svg";
import "./CartCard.css";

function CartCard(props) {
  const [qty, setQty] = useState(Number.parseInt(props.qty));

  return (
    <Grid
      container
      spacing={1}
      style={{
        width: "100%",
        margin: "10px 0",
        maxHeight: "230px",
      }}
      className="cart-card"
    >
      <Grid
        item
        xs={4}
        lg={4}
        className="cart-card_left"
        style={{ maxHeight: "230px" }}
      >
        <img
          style={{
            maxHeight: "230px",
            maxWidth: "180px",
            objectFit: props.image ? "cover" : "contain",
          }}
          src={props.image || notFound}
          alt="Not found"
        />
      </Grid>
      <Grid item xs={8} lg={8} className="cart-card_right">
        <div>
          <h3 style={{ marginBottom: "15px" }}>{props.title || "Title"}</h3>
          <h4>
            Price - ₹
            <span className="special-text">{props.price * qty || "_"}</span>
          </h4>
          <h4>
            Qty
            <IconButton
              style={{ padding: "5px" }}
              onClick={() => {
                if (qty > 1) {
                  const newQty = qty - 1;
                  setQty(newQty);
                }
                props.decrementProductAction(props.id, props.size);
              }}
            >
              <RemoveIcon
                style={{
                  fontSize: "1.6rem",
                  border: "1px solid #000",
                  borderRadius: "50%",
                }}
              />
            </IconButton>
            <span className="special-text">{qty || "_"}</span>
            <IconButton
              style={{ padding: "5px" }}
              onClick={() => {
                if (qty < 20) {
                  const newQty = qty + 1;
                  setQty(newQty);
                  props.incrementProductAction(props.id, props.size);
                }
              }}
            >
              <AddIcon
                style={{
                  fontSize: "1.6rem",
                  border: "1px solid #000",
                  borderRadius: "50%",
                }}
              />
            </IconButton>
          </h4>

          <h4>Size - {props.size || "_"}</h4>
        </div>

        <Button
          style={{ padding: "2px 10px", margin: "0" }}
          outline
          type="button"
          onClick={() => props.removeProductAction(props.id, props.size)}
        >
          Remove
        </Button>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    mobileView: state.mobileView,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    incrementProductAction: (id, size) =>
      dispatch({
        type: actionTypes.INCREMENT_PRODUCT,
        productId: id,
        productSize: size,
      }),
    decrementProductAction: (id, size) =>
      dispatch({
        type: actionTypes.DECREMENT_PRODUCT,
        productId: id,
        productSize: size,
      }),
    removeProductAction: (id, size) =>
      dispatch({
        type: actionTypes.REMOVE_PRODUCT,
        productId: id,
        productSize: size,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartCard);
