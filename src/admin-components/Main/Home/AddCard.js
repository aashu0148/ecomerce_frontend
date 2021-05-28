import React, { useState } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import Swal from "sweetalert2";

import PictureCard from "../../../Components/Card/PictureCard";
import TextCard from "../../../Components/Card/TextCard";
import Select from "../../../Components/Field/Select";
import Button from "../../../Components/Button/Button";

function AddCard(props) {
  const [values, setValues] = useState({
    brand: "",
    for: "",
    season: "",
    type: "",
    image: "",
    text: "",
    color: "",
    background: "",
    price: {
      lte: "",
      gte: "",
    },
  });

  const [fieldError, setFieldError] = useState({
    brand: "",
    for: "",
    season: "",
    type: "",
    image: "",
    text: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

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
      const myValues = { ...values };
      myValues.image = "";
      setValues(myValues);

      const myFieldError = { ...fieldError };
      myFieldError.image = "";
      setFieldError(myFieldError);

      return;
    }
    const fileSize = file.size / 1024 / 1024;
    const fileType = file.type;

    if (!fileType.includes("image")) {
      const myFieldError = { ...fieldError };
      myFieldError.image = "File must be image only";
      setFieldError(myFieldError);
      return;
    }
    if (fileSize > 2.5) {
      const myFieldError = { ...fieldError };
      myFieldError.image = "Image must be smaller than 2.5MB";
      setFieldError(myFieldError);
      return;
    }

    const myFieldError = { ...fieldError };
    myFieldError.image = "";
    setFieldError(myFieldError);

    const myValues = { ...values };
    myValues.image = file;
    setValues(myValues);
  };

  const submission = (e) => {
    e.preventDefault();
    if (
      !(
        values.brand ||
        values.for ||
        values.type ||
        values.season ||
        values.price.lte ||
        values.price.gte
      )
    ) {
      setErrorMsg("Enter atleast one from Brand, For, Type, Season,Price");
      return;
    }

    if (!(values.text || values.image)) {
      setErrorMsg("Enter atleast one from Text, Image");
      return;
    }

    setErrorMsg("");
    const formData = new FormData();

    formData.append("id", props.id);
    const filter = {};
    if (values.brand) filter.brand = [values.brand]
    if (values.for) filter.for = [values.for];
    if (values.type) filter.type = [values.type];
    if (values.season) filter.season = [values.season];
    if (values.price.lte || values.price.gte)
      filter.price = {
        lte: values.price.lte,
        gte: values.price.gte,
      };
    formData.append("filters", JSON.stringify(filter));

    if (values.text) formData.append("text", values.text);
    if (values.color) formData.append("color", values.color);
    if (values.background) formData.append("background", values.background);
    if (values.image) formData.append("image", values.image);
    setSubmitButtonDisabled(true);

    fetch(`${process.env.REACT_APP_SERVER}/admin/add-home-card`, {
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
        swarlPopupSuccess("New Card added");
        props.refresh();
        props.close();
      })
      .catch(() => {
        setSubmitButtonDisabled(false);
        setErrorMsg("Can't connect to server. Please retry");
      });
  };

  return (
    <form
      onSubmit={submission}
      style={{ maxHeight: "80vh", maxWidth: "1000px", overflowY: "scroll" }}
    >
      <Grid container spacing={1} style={{ margin: "0", width: "100%" }}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <h2>Add Card</h2>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6}>
          <div className="field-form-elem">
            <label>Text</label>
            <input
              type="text"
              placeholder="Enter card text"
              onBlur={(e) => {
                const value = e.target.value.trim();
                const myValues = { ...values };
                myValues.text = value;
                setValues(myValues);
                if (!value) {
                  const myFieldError = { ...fieldError };
                  myFieldError.text = "Enter value";
                  setFieldError(myFieldError);
                } else {
                  const myFieldError = { ...fieldError };
                  myFieldError.text = "";
                  setFieldError(myFieldError);
                }
              }}
            />
            <small style={{ width: "90%" }} className="field-error-msg">
              {fieldError.text}
            </small>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <div className="field-form-elem">
            <label>Price</label>
            <div style={{ display: "flex" }}>
              <input
                style={{ minWidth: "0" }}
                type="tel"
                placeholder="Enter low price"
                value={values.price.gte}
                onChange={(e) => {
                  const value = e.target.value;
                  const char = value.slice(-1);
                  if ((char >= "0" && char <= "9") || value === "") {
                    const myValues = { ...values };
                    myValues.price.gte = Number.parseInt(value);
                    setValues(myValues);
                  }
                }}
              />
              <input
                style={{ minWidth: "0" }}
                type="tel"
                placeholder="Enter high price"
                value={values.price.lte}
                onChange={(e) => {
                  const value = e.target.value;
                  const char = value.slice(-1);
                  if ((char >= "0" && char <= "9") || value === "") {
                    const myValues = { ...values };
                    myValues.price.lte = Number.parseInt(value);
                    setValues(myValues);
                  }
                }}
              />
            </div>
            <small style={{ width: "90%" }} className="field-error-msg">
              {fieldError.price}
            </small>
          </div>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6}>
          <div className="field-form-elem">
            <label>Brand</label>
            <input
              type="text"
              placeholder="Enter brand"
              onBlur={(e) => {
                const value = e.target.value.trim();
                if (!value) {
                  const myFieldError = { ...fieldError };
                  myFieldError.brand = "Enter value";
                  setFieldError(myFieldError);
                } else {
                  const myFieldError = { ...fieldError };
                  myFieldError.brand = "";
                  setFieldError(myFieldError);
                  const myValues = { ...values };
                  myValues.brand = value;
                  setValues(myValues);
                }
              }}
            />
            <small style={{ width: "90%" }} className="field-error-msg">
              {fieldError.brand}
            </small>
          </div>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Select
            label="Select type"
            options={["", "Topwear", "Bottomwear", "Footwear"]}
            onChange={(e) => {
              const value = e.target.value.trim();
              if (!value) {
                const myFieldError = { ...fieldError };
                myFieldError.type = "Select value";
                setFieldError(myFieldError);
              } else {
                const myFieldError = { ...fieldError };
                myFieldError.type = "";
                setFieldError(myFieldError);
                const myValues = { ...values };
                myValues.type = value;
                setValues(myValues);
              }
            }}
          />
          <small style={{ width: "90%" }} className="field-error-msg">
            {fieldError.type}
          </small>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Select
            label="For"
            options={["", "Men", "Women", "children"]}
            onChange={(e) => {
              const value = e.target.value.trim();
              if (!value) {
                const myFieldError = { ...fieldError };
                myFieldError.for = "Select value";
                setFieldError(myFieldError);
              } else {
                const myFieldError = { ...fieldError };
                myFieldError.for = "";
                setFieldError(myFieldError);
                const myValues = { ...values };
                myValues.for = value;
                setValues(myValues);
              }
            }}
          />
          <small style={{ width: "90%" }} className="field-error-msg">
            {fieldError.for}
          </small>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Select
            label="Select season"
            options={["", "Winter", "Summer", "Spring"]}
            onChange={(e) => {
              const value = e.target.value.trim();
              if (!value) {
                const myFieldError = { ...fieldError };
                myFieldError.season = "Select value";
                setFieldError(myFieldError);
              } else {
                const myFieldError = { ...fieldError };
                myFieldError.season = "";
                setFieldError(myFieldError);
                const myValues = { ...values };
                myValues.season = value;
                setValues(myValues);
              }
            }}
          />
          <small style={{ width: "90%" }} className="field-error-msg">
            {fieldError.season}
          </small>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <div className="field-form-elem">
            <label>Image</label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={(e) => {
                validateImage(e.target.files[0]);
              }}
            />
            <small style={{ width: "90%" }} className="field-error-msg">
              {fieldError.image}
            </small>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <div className="field-form-elem">
            <label>Text Color</label>
            <input
              type="color"
              onChange={(e) => {
                const myValues = { ...values };
                myValues.color = e.target.value;
                setValues(myValues);
              }}
              style={{ padding: "3px", minHeight: "30px" }}
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <div className="field-form-elem" style={{ position: "relative" }}>
            <label>Background Color</label>
            <input
              type="color"
              onChange={(e) => {
                const myValues = { ...values };
                myValues.background = e.target.value;
                setValues(myValues);
              }}
              style={{ padding: "3px", minHeight: "30px" }}
            />
          </div>
        </Grid>
      </Grid>

      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        {values.image ? (
          <PictureCard
            image={window.URL.createObjectURL(values.image)}
            text={values.text}
            color={values.color}
          />
        ) : (
          <TextCard
            text={values.text}
            color={values.color}
            background={values.background}
          />
        )}
      </div>

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
        Add Product
      </Button>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    id: state.id,
  };
};

export default connect(mapStateToProps)(AddCard);
