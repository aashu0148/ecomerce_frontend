import React, { useState, useEffect } from "react";
import { Grid, Modal } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/AddBox";
import CancelIcon from "@material-ui/icons/Cancel";

import Spinner from "../../Components/Spinner/Spinner";
import AddProduct from "./AddProduct";
import ProductCard from "./ProductCard";

function Products(props) {
  const [searchInputFocus, setSearchInputFocus] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [products, setProducts] = useState(<Spinner />);

  const refreshProducts = () => {
    fetch(`${process.env.REACT_APP_SERVER}/product`)
      .then(async (res) => {
        const response = await res.json();
        if (!response.status) {
          setProducts(<h3>No Products found</h3>);
          return;
        }
        const data = response.data;
        if (!data) {
          setProducts(<h3>No Products found</h3>);
          return;
        }
        const result = data.map((item) => (
          <ProductCard
            key={item._id}
            id={item._id}
            data={item}
            image={item.image}
            title={
              item.title.length > 49
                ? item.title.slice(0, 50) + "..."
                : item.title
            }
            price={item.price[Object.keys(item.price)[0]]}
            sizes={Object.keys(item.price).join(" , ").toUpperCase()}
          />
        ));

        setProducts(result);
      })
      .catch(() => {
        setProducts(
          <small className="field-error-msg">
            Can't connect to server. Please refresh
          </small>
        );
      });
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER}/product`)
      .then(async (res) => {
        const response = await res.json();
        if (!response.status) {
          setProducts(<h3>No Products found</h3>);
          return;
        }
        const data = response.data;
        if (!data) {
          setProducts(<h3>No Products found</h3>);
          return;
        }
        const result = data.map((item) => (
          <ProductCard
            key={item._id}
            id={item._id}
            data={item}
            image={item.image}
            title={
              item.title.length > 49
                ? item.title.slice(0, 50) + "..."
                : item.title
            }
            price={item.price[Object.keys(item.price)[0]]}
            sizes={Object.keys(item.price).join(" , ").toUpperCase()}
            refresh={refreshProducts}
          />
        ));

        setProducts(result);
      })
      .catch(() => {
        setProducts(
          <small className="field-error-msg">
            Can't connect to server. Please refresh
          </small>
        );
      });
  }, []);

  return (
    <div>
      <Modal
        open={addModalOpen}
        onClose={() => {
          setAddModalOpen(false);
        }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            padding: "20px",
            background: "#fff",
            minWidth: "300px",
            minHeight: "400px",
            width: "fit-content",
            height: "fit-content",
            outline: "none",
            margin: "8px",
          }}
        >
          <div style={{ textAlign: "end" }}>
            <CancelIcon
              onClick={() => setAddModalOpen(false)}
              style={{
                color: "darkgray",
                cursor: "pointer",
              }}
            />
          </div>
          <AddProduct
            close={() => setAddModalOpen(false)}
            refresh={refreshProducts}
          />
        </div>
      </Modal>
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
        <Grid item xs={9} sm={6} md={6} lg={6}>
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
        <Grid item xs={3} sm={2} md={2} lg={2} style={{ textAlign: "center" }}>
          <AddIcon
            style={{
              cursor: "pointer",
              fontSize: "2rem",
              color: "var(--primary-color)",
            }}
            onClick={() => setAddModalOpen(true)}
          />
        </Grid>
        {/* <Grid item xs={12} sm={12} md={12} lg={12}>
          <Divider />
        </Grid> */}
        {products}

        <div></div>
      </Grid>
    </div>
  );
}

export default Products;
