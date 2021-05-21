import React, { useState } from "react";
import { connect } from "react-redux";
import { Checkbox, Grid } from "@material-ui/core";
import Swal from "sweetalert2";

import Select from "../../Components/Field/Select";
import Button from "../../Components/Button/Button";

function Addproduct(props) {
  const [priceValue, setPriceValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const [values, setValues] = useState({
    title: "",
    size: "",
    price: "",
    sizes: [],
    desc: "",
    tags: [],
    thumbnail: "",
    image1: "",
    image2: "",
    image3: "",
    brand: "",
    for: "",
    season: "",
    type: "",
  });

  const [fieldError, setFieldError] = useState({
    title: "",
    size: "",
    price: "",
    desc: "",
    tags: "",
    thumbnail: "",
    image1: "",
    image2: "",
    image3: "",
    brand: "",
    for: "",
    season: "",
    type: "",
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
      !values.title ||
      !values.size ||
      !values.desc ||
      !values.price ||
      !values.brand ||
      !values.for ||
      !values.type ||
      !values.season ||
      !values.thumbnail ||
      values.sizes.length === 0 ||
      values.tags.length === 0
    ) {
      setErrorMsg("All values required");
      return;
    }

    if (
      fieldError.title ||
      fieldError.price ||
      fieldError.size ||
      fieldError.thumbnail ||
      fieldError.brand ||
      fieldError.desc ||
      fieldError.tags ||
      fieldError.season ||
      fieldError.type ||
      fieldError.for ||
      fieldError.image1 ||
      fieldError.image2 ||
      fieldError.image3
    ) {
      setErrorMsg("Invalid value entered");
      return;
    }
    setErrorMsg("");

    const formData = new FormData();

    formData.append("uid", props.id);
    formData.append("title", values.title);
    formData.append("price", values.price);
    formData.append("filters", {
      type: values.type,
      brand: values.brand,
      season: values.season,
      for: values.for,
    });
    formData.append("tags", JSON.stringify(values.tags));
    formData.append("sizes", JSON.stringify(values.sizes));
    formData.append("size", values.size);
    formData.append("desc", values.desc);
    formData.append("thumbnail", values.thumbnail);
    if (values.image1) formData.append("image", values.image1);
    if (values.image2) formData.append("image", values.image2);
    if (values.image3) formData.append("image", values.image3);
    setSubmitButtonDisabled(true);

    fetch(`${process.env.REACT_APP_SERVER}/product/add`, {
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
        swarlPopupSuccess("New Product added");
        props.refresh()
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
      style={{ maxHeight: "70vh", overflowY: "scroll" }}
    >
      <Grid container spacing={1} style={{ margin: "0", width: "100%" }}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <h2>Add Product</h2>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6}>
          <div className="field-form-elem">
            <label>Title</label>
            <input
              type="text"
              placeholder="Enter product name"
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

        <Grid item xs={12} sm={6} md={6} lg={6}>
          <div className="field-form-elem">
            <label>Price</label>
            <input
              type="tel"
              placeholder="Enter price"
              value={priceValue}
              onChange={(e) => {
                const value = e.target.value;
                const char = value.slice(-1);
                if ((char >= "0" && char <= "9") || value === "")
                  setPriceValue(value);
              }}
              onBlur={(e) => {
                const value = e.target.value.trim();
                if (!value) {
                  const myFieldError = { ...fieldError };
                  myFieldError.price = "Enter value";
                  setFieldError(myFieldError);
                } else {
                  const myFieldError = { ...fieldError };
                  myFieldError.price = "";
                  setFieldError(myFieldError);
                  const myValues = { ...values };
                  myValues.price = Number.parseFloat(value);
                  setValues(myValues);
                }
              }}
            />
            <small style={{ width: "90%" }} className="field-error-msg">
              {fieldError.price}
            </small>
          </div>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Select
            label="Select size"
            options={["", "S", "M", "L", "XL", "XXL"]}
            onChange={(e) => {
              const value = e.target.value.trim();
              if (!value) {
                const myFieldError = { ...fieldError };
                myFieldError.size = "Select value";
                setFieldError(myFieldError);
              } else {
                const myFieldError = { ...fieldError };
                myFieldError.size = "";
                setFieldError(myFieldError);
                const myValues = { ...values };
                myValues.size = value;
                setValues(myValues);
              }
            }}
          />
          <small style={{ width: "90%" }} className="field-error-msg">
            {fieldError.size}
          </small>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6}>
          <div style={{ display: "flex", flexDirection: "column" }}>
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
              Available sizes
            </label>
            <div style={{ display: "flex" }}>
              <p style={{ fontSize: "var(--font-small)" }}>
                <Checkbox
                  size="small"
                  style={{ color: "var(--primary-color)" }}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    const myValues = { ...values };
                    if (checked) {
                      myValues.sizes.push("S");
                    } else {
                      myValues.sizes.splice(myValues.sizes.indexOf("S"), 1);
                    }
                    setValues(myValues);
                  }}
                />
                S
              </p>
              <p style={{ fontSize: "var(--font-small)" }}>
                <Checkbox
                  size="small"
                  style={{ color: "var(--primary-color)" }}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    const myValues = { ...values };
                    if (checked) {
                      myValues.sizes.push("M");
                    } else {
                      myValues.sizes.splice(myValues.sizes.indexOf("M"), 1);
                    }
                    setValues(myValues);
                  }}
                />
                M
              </p>
              <p style={{ fontSize: "var(--font-small)" }}>
                <Checkbox
                  size="small"
                  style={{ color: "var(--primary-color)" }}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    const myValues = { ...values };
                    if (checked) {
                      myValues.sizes.push("L");
                    } else {
                      myValues.sizes.splice(myValues.sizes.indexOf("L"), 1);
                    }
                    setValues(myValues);
                  }}
                />
                L
              </p>
              <p style={{ fontSize: "var(--font-small)" }}>
                <Checkbox
                  size="small"
                  style={{ color: "var(--primary-color)" }}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    const myValues = { ...values };
                    if (checked) {
                      myValues.sizes.push("XL");
                    } else {
                      myValues.sizes.splice(myValues.sizes.indexOf("XL"), 1);
                    }
                    setValues(myValues);
                  }}
                />
                XL
              </p>
              <p style={{ fontSize: "var(--font-small)" }}>
                <Checkbox
                  size="small"
                  style={{ color: "var(--primary-color)" }}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    const myValues = { ...values };
                    if (checked) {
                      myValues.sizes.push("XXL");
                    } else {
                      myValues.sizes.splice(myValues.sizes.indexOf("XXL"), 1);
                    }
                    setValues(myValues);
                  }}
                />
                XXL
              </p>
            </div>
          </div>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6}>
          <div className="field-form-elem">
            <label>Description</label>
            <textarea
              style={{ minHeight: "150px" }}
              maxLength="500"
              placeholder="Enter Description"
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
            <label>Tags (Separate tags with space)</label>
            <textarea
              style={{ minHeight: "150px" }}
              maxLength="100"
              placeholder="Enter Tags"
              onBlur={(e) => {
                const value = e.target.value.trim();
                if (!value) {
                  const myFieldError = { ...fieldError };
                  myFieldError.tags = "Enter value";
                  setFieldError(myFieldError);
                } else {
                  const myFieldError = { ...fieldError };
                  myFieldError.tags = "";
                  setFieldError(myFieldError);
                  const myValues = { ...values };
                  myValues.tags = value.replace(/\s\s+/g, " ").split(" ");
                  setValues(myValues);
                }
              }}
            />
            <small style={{ width: "90%" }} className="field-error-msg">
              {fieldError.tags}
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
            options={["", "Winter", "Summner", "Spring"]}
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

export default connect(mapStateToProps)(Addproduct);
