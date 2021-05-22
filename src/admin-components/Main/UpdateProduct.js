import React, { useState } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import Swal from "sweetalert2";

import Button from "../../Components/Button/Button";

function UpdateProduct(props) {
  const [priceValue, setPriceValue] = useState({
    s: props.data.price.s || "",
    m: props.data.price.m || "",
    l: props.data.price.l || "",
    xl: props.data.price.xl || "",
    xxl: props.data.price.xxl || "",
    xxxl: props.data.price.xxxl || "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const [values, setValues] = useState({
    title: props.data.title,
    price: {
      s: props.data.price.s || "",
      m: props.data.price.m || "",
      l: props.data.price.l || "",
      xl: props.data.price.xl || "",
      xxl: props.data.price.xxl || "",
      xxxl: props.data.price.xxxl || "",
    },
    desc: props.data.desc,
    // tags: [],
    // brand: "",
    // for: "",
    // season: "",
    // type: "",
  });

  const [fieldError, setFieldError] = useState({
    title: "",
    desc: "",
  });

  const swarlPopupSuccess = (text) => {
    Swal.fire({
      title: "Done",
      text: text,
      icon: "success",
      confirmButtonText: "Cool",
      confirmButtonColor: "#a55fe0",
    });
  };

  const submission = (e) => {
    e.preventDefault();

    if (fieldError.title || fieldError.desc) {
      setErrorMsg("Invalid value entered");
      return;
    }
    setErrorMsg("");

    const requestBody = {};

    requestBody.uid = props.uid;
    requestBody.pid = props.pid;
    if (values.title) requestBody.title = values.title;
    if (priceValue) {
      const price = {};
      Object.keys(priceValue).forEach((item) => {
        if (priceValue[item]) {
          price[item] = priceValue[item];
        }
      });
      requestBody.price = price;
    }
    if (values.desc) requestBody.desc = values.desc;

    setSubmitButtonDisabled(true);

    fetch(`${process.env.REACT_APP_SERVER}/product/update`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const data = await res.json();
        if (!data.status) {
          setErrorMsg(data.message);
          return;
        }
        swarlPopupSuccess("Product successfully updated");
        props.close();
        props.refresh();
      })
      .catch(() => {
        setSubmitButtonDisabled(false);
        setErrorMsg("Can't connect to server. Please retry");
      });
  };

  return (
    <form
      onSubmit={submission}
      style={{ maxHeight: "70vh", overflowY: "scroll" }}
    >
      <div style={{ textAlign: "end" }}>
        <CancelIcon
          onClick={props.close}
          style={{
            color: "darkgray",
            cursor: "pointer",
          }}
        />
      </div>
      <Grid
        container
        spacing={1}
        style={{ margin: "0", width: "100%", maxWidth: "800px" }}
      >
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <h2>Update Product</h2>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6}>
          <div className="field-form-elem">
            <label>Title</label>
            <input
              type="text"
              placeholder="Enter product name"
              value={values.title}
              onChange={(e) => {
                const value = e.target.value.trim();
                const myValues = { ...values };
                myValues.title = value;
                setValues(myValues);
              }}
              onBlur={(e) => {
                const value = e.target.value.trim();
                if (!value) {
                  const myFieldError = { ...fieldError };
                  myFieldError.title = "Enter value";
                  setFieldError(myFieldError);
                } else {
                  const myFieldError = { ...fieldError };
                  myFieldError.title = "";
                  setFieldError(myFieldError);
                  const myValues = { ...values };
                  myValues.title = value;
                  setValues(myValues);
                }
              }}
            />
            <small style={{ width: "90%" }} className="field-error-msg">
              {fieldError.title}
            </small>
          </div>
        </Grid>

        <Grid item container xs={12} sm={12} md={12} lg={12}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <label
              style={{
                textAlign: "start",
                color: "gray",
                fontSize: " 0.9rem",
                letterSpacing: "1px",
                fontWeight: "800",
                marginTop: " 10px",
                padding: " 0 15px",
              }}
            >
              Enter price
            </label>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={6}
            style={{ display: "flex", alignItems: "center" }}
          >
            <p
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <span style={{ padding: "2px 10px" }}>S</span>
            </p>
            <div className="field-form-elem" style={{ width: "100%" }}>
              <input
                type="tel"
                placeholder="Enter price"
                value={priceValue.s}
                onChange={(e) => {
                  const value = e.target.value;
                  const char = value.slice(-1);
                  if ((char >= "0" && char <= "9") || value === "") {
                    const myPValue = { ...priceValue };
                    myPValue.s = value;
                    setPriceValue(myPValue);
                  }
                }}
              />
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={6}
            style={{ display: "flex", alignItems: "center" }}
          >
            <p
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <span style={{ padding: "2px 10px" }}>M</span>
            </p>
            <div className="field-form-elem" style={{ width: "100%" }}>
              <input
                type="tel"
                placeholder="Enter price"
                value={priceValue.m}
                onChange={(e) => {
                  const value = e.target.value;
                  const char = value.slice(-1);
                  if ((char >= "0" && char <= "9") || value === "") {
                    const myPValue = { ...priceValue };
                    myPValue.m = value;
                    setPriceValue(myPValue);
                  }
                }}
              />
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={6}
            style={{ display: "flex", alignItems: "center" }}
          >
            <p
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <span style={{ padding: "2px 10px" }}>L</span>
            </p>
            <div className="field-form-elem" style={{ width: "100%" }}>
              <input
                type="tel"
                placeholder="Enter price"
                value={priceValue.l}
                onChange={(e) => {
                  const value = e.target.value;
                  const char = value.slice(-1);
                  if ((char >= "0" && char <= "9") || value === "") {
                    const myPValue = { ...priceValue };
                    myPValue.l = value;
                    setPriceValue(myPValue);
                  }
                }}
              />
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={6}
            style={{ display: "flex", alignItems: "center" }}
          >
            <p
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <span style={{ padding: "2px 10px" }}>XL</span>
            </p>
            <div className="field-form-elem" style={{ width: "100%" }}>
              <input
                type="tel"
                placeholder="Enter price"
                value={priceValue.xl}
                onChange={(e) => {
                  const value = e.target.value;
                  const char = value.slice(-1);
                  if ((char >= "0" && char <= "9") || value === "") {
                    const myPValue = { ...priceValue };
                    myPValue.xl = value;
                    setPriceValue(myPValue);
                  }
                }}
              />
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={6}
            style={{ display: "flex", alignItems: "center" }}
          >
            <p
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <span style={{ padding: "2px 10px" }}>XXL</span>
            </p>
            <div className="field-form-elem" style={{ width: "100%" }}>
              <input
                type="tel"
                placeholder="Enter price"
                value={priceValue.xxl}
                onChange={(e) => {
                  const value = e.target.value;
                  const char = value.slice(-1);
                  if ((char >= "0" && char <= "9") || value === "") {
                    const myPValue = { ...priceValue };
                    myPValue.xxl = value;
                    setPriceValue(myPValue);
                  }
                }}
              />
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={6}
            style={{ display: "flex", alignItems: "center" }}
          >
            <p
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <span style={{ padding: "2px 10px" }}>XXXL</span>
            </p>
            <div className="field-form-elem" style={{ width: "100%" }}>
              <input
                type="tel"
                placeholder="Enter price"
                value={priceValue.xxxl}
                onChange={(e) => {
                  const value = e.target.value;
                  const char = value.slice(-1);
                  if ((char >= "0" && char <= "9") || value === "") {
                    const myPValue = { ...priceValue };
                    myPValue.xxxl = value;
                    setPriceValue(myPValue);
                  }
                }}
              />
            </div>
          </Grid>
          <small style={{ width: "90%" }} className="field-error-msg">
            {fieldError.price}
          </small>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6}>
          <div className="field-form-elem">
            <label>Description</label>
            <textarea
              style={{ minHeight: "150px" }}
              maxLength="500"
              placeholder="Enter Description"
              value={values.desc}
              onChange={(e) => {
                const value = e.target.value.trim();
                const myValues = { ...values };
                myValues.desc = value;
                setValues(myValues);
              }}
              onBlur={(e) => {
                const value = e.target.value.trim();
                if (!value) {
                  const myFieldError = { ...fieldError };
                  myFieldError.desc = "Enter value";
                  setFieldError(myFieldError);
                } else {
                  const myFieldError = { ...fieldError };
                  myFieldError.desc = "";
                  setFieldError(myFieldError);
                  const myValues = { ...values };
                  myValues.desc = value;
                  setValues(myValues);
                }
              }}
            />
            <small style={{ width: "90%" }} className="field-error-msg">
              {fieldError.desc}
            </small>
          </div>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        style={{ textAlign: "center" }}
      >
        <small style={{ textAlign: "center" }} className="field-error-msg">
          {errorMsg}
        </small>
      </Grid>

      <Button
        disabled={submitButtonDisabled}
        type="submit"
        style={{ borderRadius: "5px" }}
      >
        Update
      </Button>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    uid: state.id,
  };
};

export default connect(mapStateToProps)(UpdateProduct);
