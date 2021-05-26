import React, { useState } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import Swal from "sweetalert2";

import Button from "../../../Components/Button/Button";

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
    thumbnail: "",
    image1: "",
    image2: "",
    image3: "",
    // tags: [],
    // brand: "",
    // for: "",
    // season: "",
    // type: "",
  });

  const [fieldError, setFieldError] = useState({
    title: "",
    desc: "",
    thumbnail: "",
    image1: "",
    image2: "",
    image3: "",
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

  const validateImage = (file, imageName) => {
    if (!file) {
      const myFieldError = { ...fieldError };
      myFieldError[imageName] = "Select image";
      setFieldError(myFieldError);
      return;
    }
    const fileSize = file.size / 1024 / 1024;
    const fileType = file.type;

    if (!fileType.includes("image")) {
      const myFieldError = { ...fieldError };
      myFieldError[imageName] = "File must be image only";
      setFieldError(myFieldError);
      return;
    }
    if (fileSize > 2.5) {
      const myFieldError = { ...fieldError };
      myFieldError[imageName] = "Image must be smaller than 2.5MB";
      setFieldError(myFieldError);
      return;
    }

    const myFieldError = { ...fieldError };
    myFieldError[imageName] = "";
    setFieldError(myFieldError);

    const myValues = { ...values };
    myValues[imageName] = file;
    setValues(myValues);
  };

  const submission = (e) => {
    e.preventDefault();

    if (
      fieldError.title ||
      fieldError.desc ||
      fieldError.thumbnail ||
      fieldError.image1 ||
      fieldError.image2 ||
      fieldError.image3
    ) {
      setErrorMsg("Invalid value entered");
      return;
    }
    setErrorMsg("");

    const formData = new FormData();

    formData.append("uid", props.uid);
    formData.append("pid", props.pid);
    if (values.title) formData.append("title", values.title);
    if (values.price) {
      const price = {};
      Object.keys(priceValue).forEach((item) => {
        if (priceValue[item]) {
          price[item] = priceValue[item];
        }
      });
      formData.append("price", JSON.stringify(price));
    }
    if (values.desc) formData.append("desc", values.desc);
    if (values.thumbnail) formData.append("thumbnail", values.thumbnail);
    if (values.image1) formData.append("image1", values.image1);
    if (values.image2) formData.append("image2", values.image2);
    if (values.image3) formData.append("image3", values.image3);

    setSubmitButtonDisabled(true);

    fetch(`${process.env.REACT_APP_SERVER}/product/update`, {
      method: "POST",
      body: formData,
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
      style={{ maxHeight: "80vh", overflowY: "scroll" }}
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

        <Grid item xs={12} sm={6} md={6} lg={6}>
          <div className="field-form-elem">
            <label>Thumbnail</label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={(e) => {
                validateImage(e.target.files[0], "thumbnail");
              }}
            />
            <small style={{ width: "90%" }} className="field-error-msg">
              {fieldError.thumbnail}
            </small>
          </div>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6}>
          <div className="field-form-elem">
            <label>Image 1</label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={(e) => {
                validateImage(e.target.files[0], "image1");
              }}
            />
            <small style={{ width: "90%" }} className="field-error-msg">
              {fieldError.image1}
            </small>
          </div>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6}>
          <div className="field-form-elem">
            <label>Image 2</label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={(e) => {
                validateImage(e.target.files[0], "image2");
              }}
            />
            <small style={{ width: "90%" }} className="field-error-msg">
              {fieldError.image2}
            </small>
          </div>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6}>
          <div className="field-form-elem">
            <label>Image 3</label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={(e) => {
                validateImage(e.target.files[0], "image3");
              }}
            />
            <small style={{ width: "90%" }} className="field-error-msg">
              {fieldError.image3}
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
