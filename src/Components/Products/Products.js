import React, { useState } from "react";
import { Grid, IconButton } from "@material-ui/core";
import SortIcon from "@material-ui/icons/Sort";
import FilterIcon from "@material-ui/icons/FilterList";

import man from "../../assets/svg/man-2.svg";
import woman from "../../assets/svg/woman-2.svg";
import Icon from "../Icon";
import "./Products.css";

function Products() {
  const [sortBoxOpen, setSortBoxOpen] = useState(false);
  const [filterBoxOpen, setFilterBoxOpen] = useState(false);

  return (
    <div className="products">
      <div
        className={`products_backdrop ${
          sortBoxOpen || filterBoxOpen ? "products_backdrop_active" : ""
        }`}
        onClick={() => {
          setFilterBoxOpen(false);
          setSortBoxOpen(false);
        }}
      />
      <Grid container spacing={2} style={{ margin: "0", width: "100%" }}>
        <Grid item xs={12} sm={3} md={3} lg={3}>
          <h1 style={{ whiteSpace: "nowrap" }}>Our Products</h1>
        </Grid>
        <Grid item className="products_topbar" xs={12} sm={9} lg={9} container>
          <IconButton style={{ padding: "0", borderRadius: "15px" }}>
            {" "}
            <div className="products_topbar_elem">
              <Icon src={man} />
              <p>Men</p>
            </div>
          </IconButton>
          <IconButton style={{ padding: "0", borderRadius: "15px" }}>
            <div className="products_topbar_elem ">
              <Icon src={woman} />
              <p>Women</p>
            </div>
          </IconButton>

          <div
            className="products_topbar_elem"
            onClick={() => setSortBoxOpen(!sortBoxOpen)}
            style={{ position: "relative" }}
          >
            <IconButton style={{ padding: "0", borderRadius: "15px" }}>
              <SortIcon />
              <p>Sort</p>
            </IconButton>
            <div
              className={`products_sort-box ${
                sortBoxOpen ? "products_sort-box_active" : ""
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <li>None</li>
              <li>Price</li>
              <li>Ascending</li>
              <li>Descending</li>
              <li>Popular</li>
            </div>
          </div>

          <div
            className="products_topbar_elem"
            onClick={() => setFilterBoxOpen(!filterBoxOpen)}
          >
            <FilterIcon />
            <p>Filter</p>
            <div
              className={`products_filter-box ${
                filterBoxOpen ? "products_filter-box_active" : ""
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <li>None</li>
              <li>Price</li>
              <li>Ascending</li>
              <li>Descending</li>
              <li>Popular</li>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Products;
