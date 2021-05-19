import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ProductCard from "./ProductCard";

function Products(props) {
  const [searchInputFocus, setSearchInputFocus] = useState(false);

  return (
    <div>
      <Grid
        container
        spacing={2}
        justify="center"
        alignItems="center"
        style={{ margin: "0", width: "100%" }}
      >
        <Grid item xs={12} sm={4} md={4} lg={4}>
          <h2>Products</h2>
        </Grid>
        <Grid item xs={12} sm={8} md={8} lg={8}>
          <div
            className="navbar_search"
            style={{
              boxShadow: searchInputFocus
                ? "-1px 2px 5px rgb(0 0 0 / 12%)"
                : "-1px 2px 5px rgb(0 0 0 / 5%)",
            }}
          >
            <SearchIcon style={{ cursor: "pointer", color: "#afacad" }} />
            <input
              onFocus={() => setSearchInputFocus(true)}
              onBlur={() => setSearchInputFocus(false)}
              type="text"
              placeholder="Search product "
              style={{ padding: "8px" }}
            />
          </div>
        </Grid>
        {/* <Grid item xs={12} sm={12} md={12} lg={12}>
          <Divider />
        </Grid> */}
        <ProductCard
          image=""
          title={
            `"Product 1jkbhuftc vftgbn vftvgbn gvhfdtrftgykhbnm bvgftyuhjnm bvcfdc vbnmjhygthfdxc bnbvbcfghbn "`.slice(
              0,
              50
            ) + "..."
          }
          price="1200"
          size="XL , L , M "
        />
        <ProductCard
          image=""
          title={`"Product 45 shirt with a sleve "`.slice(0, 50) + "..."}
          price="1200"
          size="L , M , XL"
        />
        <ProductCard
          image=""
          title={`"Product 1jkbhufcfghbn "`.slice(0, 50) + "..."}
          price="1200"
          size="L , M , XL"
        />
        <ProductCard
          image=""
          title={`"Product 1jkbhuftkjbtydrvbcfghbn "`.slice(0, 50) + "..."}
          price="1200"
          size="L , M , XL"
        />
        <div></div>
      </Grid>
    </div>
  );
}

export default Products;
