import React, { useState } from "react";
import { Checkbox, Grid } from "@material-ui/core";

import Select from "../../Components/Field/Select";
import Button from "../../Components/Button/Button";

function Addproduct() {
  const [priceValue, setPriceValue] = useState("");

  const [fieldError, setFieldError] = useState({
    title: "",
    size: "",
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

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
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
            options={["", "S", "M", "L", "XL", "XXL", "XXXL"]}
            onChange={(e) => {
              const value = e.target.value.trim();
              if (!value) {
                const myFieldError = { ...fieldError };
                myFieldError.size = "Select value";
                setFieldError(myFieldError);
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
                />
                S
              </p>
              <p style={{ fontSize: "var(--font-small)" }}>
                <Checkbox
                  size="small"
                  style={{ color: "var(--primary-color)" }}
                />
                M
              </p>
              <p style={{ fontSize: "var(--font-small)" }}>
                <Checkbox
                  size="small"
                  style={{ color: "var(--primary-color)" }}
                />
                XL
              </p>
              <p style={{ fontSize: "var(--font-small)" }}>
                <Checkbox
                  size="small"
                  style={{ color: "var(--primary-color)" }}
                />
                XXL
              </p>
              <p style={{ fontSize: "var(--font-small)" }}>
                <Checkbox
                  size="small"
                  style={{ color: "var(--primary-color)" }}
                />
                XXXL
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
              onBlur={(e) => {
                const value = e.target.value.trim();
                if (!value) {
                  const myFieldError = { ...fieldError };
                  myFieldError.thumbnail = "Enter value";
                  setFieldError(myFieldError);
                }
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
            <input type="file" accept=".jpg,.jpeg,.png" />
            <small style={{ width: "90%" }} className="field-error-msg">
              {fieldError.image1}
            </small>
          </div>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6}>
          <div className="field-form-elem">
            <label>Image 2</label>
            <input type="file" accept=".jpg,.jpeg,.png" />
            <small style={{ width: "90%" }} className="field-error-msg">
              {fieldError.image2}
            </small>
          </div>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6}>
          <div className="field-form-elem">
            <label>Image 3</label>
            <input type="file" accept=".jpg,.jpeg,.png" />
            <small style={{ width: "90%" }} className="field-error-msg">
              {fieldError.image3}
            </small>
          </div>
        </Grid>
      </Grid>
      <Button type="submit" style={{ borderRadius: "5px" }}>
        Add Product
      </Button>
    </form>
  );
}

export default Addproduct;
