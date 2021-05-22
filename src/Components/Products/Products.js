import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, IconButton, Divider } from "@material-ui/core";
import SortIcon from "@material-ui/icons/Sort";
import FilterIcon from "@material-ui/icons/FilterList";

import Card from "../Card/Card";
import man from "../../assets/svg/man-2.svg";
import woman from "../../assets/svg/woman-2.svg";
import Icon from "../Icon";
import ListItem from "../ListItem/ListItem";
import CheckListItem from "../ListItem/CheckListItem";
import Button from "../Button/Button";
import Spinner from "../Spinner/Spinner";
import Footer from "../Footer/Footer";
import "./Products.css";

function Products() {
  const [pageLoaded, setPageLoaded] = useState(false);

  const [sortBoxOpen, setSortBoxOpen] = useState(false);
  const [filterBoxOpen, setFilterBoxOpen] = useState(false);

  const [requiredFilters, setRequiredFilters] = useState([]);
  const [filterLeftSelectedIndex, setFilterLeftSelectedIndex] = useState(0);
  const [filters, setFilters] = useState([
    {
      name: "Price",
      values: [
        {
          name: "Under 500",
          value: "19",
        },
        {
          name: "Price Value 2",
          value: "18",
        },
        {
          name: "Price Value 3",
          value: "17",
        },
        {
          name: "Price Value 4",
          value: "16",
        },
      ],
    },
    {
      name: "Type",
      values: [
        {
          name: "Topwear",
          value: "15",
        },
        {
          name: "Bottomwear",
          value: "14",
        },
        {
          name: "Footwear",
          value: "3",
        },
      ],
    },
    {
      name: "For",
      values: [
        {
          name: "Men",
          value: "11",
        },
        {
          name: "Women",
          value: "10",
        },
        {
          name: "Children",
          value: "9",
        },
      ],
    },
    {
      name: "Brand",
      values: [
        {
          name: "Puma",
          value: "7",
        },
        {
          name: "Gucci",
          value: "6",
        },
      ],
    },
    {
      name: "Season",
      values: [
        {
          name: "Summer",
          value: "3",
        },
        {
          name: "Winter",
          value: "1",
        },
        {
          name: "Spring",
          value: "2",
        },
      ],
    },
    {
      name: "Size",
      values: [
        {
          name: "S",
          value: "310",
        },
        {
          name: "M",
          value: "78451",
        },
        {
          name: "L",
          value: "501",
        },
        {
          name: "XL",
          value: "42",
        },
        {
          name: "XXL",
          value: "8965",
        },
      ],
    },
  ]);
  const [products, setProducts] = useState(<Spinner />);

  useEffect(() => {
    if (false) {
      setFilters([]);
    }
    fetch(`${process.env.REACT_APP_SERVER}/product`)
      .then(async (res) => {
        setPageLoaded(true);
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
          <Link
            key={item._id}
            to={`/product/${item._id}`}
            style={{ textDecoration: "none" }}
          >
            <Card
              title={item.title}
              price={item.price[Object.keys(item.price)[0]]}
              image={`${process.env.REACT_APP_SERVER}/${item.image}`}
              id={item._id}
            />
          </Link>
        ));
        setProducts(result);
      })
      .catch(() => {
        setPageLoaded(true);
        setProducts(
          <small className="field-error-msg">
            Can't connect to server. Please refresh
          </small>
        );
      });
    console.log("Required filters are : ", requiredFilters);
  }, [filterLeftSelectedIndex, requiredFilters]); // eslint-disable-line react-hooks/exhaustive-deps

  const addToMyFilter = (filterValue) => {
    const myFilters = [...requiredFilters];
    const index = myFilters.indexOf(filterValue);
    if (index < 0) myFilters.push(filterValue);
    setRequiredFilters(myFilters);
  };
  const removeToMyFilter = (filterValue) => {
    const myFilters = [...requiredFilters];
    const index = myFilters.indexOf(filterValue);
    if (index > -1) {
      myFilters.splice(index, 1);
    }
    setRequiredFilters(myFilters);
  };

  return pageLoaded ? (
    <div className="products">
      <div
        className={`products_backdrop ${
          sortBoxOpen ? "products_backdrop_active" : ""
        }`}
        onClick={() => {
          setSortBoxOpen(false);
        }}
      />
      <div
        className={`products_filter_backdrop ${
          filterBoxOpen ? "products_filter_backdrop_active" : ""
        }`}
        onClick={() => {
          setFilterBoxOpen(false);
        }}
      />
      <Grid
        container
        spacing={2}
        justify="space-around"
        style={{ margin: "0", width: "100%" }}
      >
        <Grid item xs={12} sm={3} md={3} lg={3}>
          <h1 style={{ whiteSpace: "nowrap" }}>Products</h1>
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
              <ListItem noHover>None</ListItem>
              <ListItem noHover>Price</ListItem>
              <ListItem noHover last>
                Popularity
              </ListItem>
            </div>
          </div>

          <div
            className="products_topbar_elem"
            onClick={() => setFilterBoxOpen(!filterBoxOpen)}
          >
            <IconButton style={{ padding: "0", borderRadius: "15px" }}>
              <FilterIcon />
              <p>Filter</p>
            </IconButton>
            <div
              className={`products_filter-box ${
                filterBoxOpen ? "products_filter-box_active" : ""
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <Grid
                container
                spacing={2}
                style={{ margin: "0", width: "100%" }}
              >
                <Grid item xs={4} className="products_filter-box_left">
                  {filters.map((item, i) => (
                    <ListItem
                      key={i}
                      selected={i === filterLeftSelectedIndex}
                      onClick={() => setFilterLeftSelectedIndex(i)}
                      last={i === filters.length - 1}
                    >
                      {item.name}
                    </ListItem>
                  ))}
                </Grid>
                <Grid item xs={8} className="products_filter-box_right">
                  <div>
                    {filters[filterLeftSelectedIndex].values.map((item, i) => (
                      <CheckListItem
                        key={item.value + i}
                        id={item.value}
                        last={
                          i ===
                          filters[filterLeftSelectedIndex].values.length - 1
                        }
                        checked={requiredFilters.indexOf(item.value) > -1}
                        changed={(check) =>
                          check
                            ? addToMyFilter(item.value)
                            : removeToMyFilter(item.value)
                        }
                      >
                        {item.name}
                      </CheckListItem>
                    ))}
                  </div>
                  <div>
                    <br />
                    <Divider />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        outline={true}
                        onClick={() => setFilterBoxOpen(false)}
                      >
                        Close
                      </Button>
                      <Button style={{ marginLeft: "auto" }}>Apply</Button>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} lg={12}>
          <Divider />
        </Grid>

        {products}
        <Grid item xs={12} md={12} lg={12}>
          <Footer />
        </Grid>
      </Grid>
    </div>
  ) : (
    <Spinner />
  );
}

export default Products;
