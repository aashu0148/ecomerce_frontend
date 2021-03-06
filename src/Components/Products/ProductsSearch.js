import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, IconButton, Divider } from "@material-ui/core";
// import SortIcon from "@material-ui/icons/Sort";
import FilterIcon from "@material-ui/icons/FilterList";

import Slide from './Slider'
import Card from "../Card/Card";
import ListItem from "../ListItem/ListItem";
import CheckListItem from "../ListItem/CheckListItem";
import Button from "../Button/Button";
import Spinner from "../Spinner/Spinner";
import Footer from "../Footer/Footer";
import "./Products.css";

const filters = [
  {
    name: "Price",
    values: [
      {
        name: "Under 500",
        value: "19",
      },
    ],
  },
  {
    name: "Type",
    values: [
      {
        name: "Topwear",
        value: "topwear",
      },
      {
        name: "Bottomwear",
        value: "bottomwear",
      },
      {
        name: "Footwear",
        value: "footwear",
      },
    ],
  },
  {
    name: "For",
    values: [
      {
        name: "Men",
        value: "men",
      },
      {
        name: "Women",
        value: "women",
      },
      {
        name: "Children",
        value: "children",
      },
    ],
  },
  {
    name: "Season",
    values: [
      {
        name: "Summer",
        value: "summer",
      },
      {
        name: "Winter",
        value: "winter",
      },
      {
        name: "Spring",
        value: "spring",
      },
    ],
  },
  {
    name: "Size",
    values: [
      {
        name: "S",
        value: "S",
      },
      {
        name: "M",
        value: "M",
      },
      {
        name: "L",
        value: "L",
      },
      {
        name: "XL",
        value: "XL",
      },
      {
        name: "XXL",
        value: "XXL",
      },
    ],
  },
];

function Products(props) {
  const [search, setSearch] = useState(props.match.params.search);
  const [pageLoaded, setPageLoaded] = useState(false);

  const [products, setProducts] = useState(<Spinner />);
  const [sortBoxOpen, setSortBoxOpen] = useState(false);
  const [filterBoxOpen, setFilterBoxOpen] = useState(false);
  const [filterLeftSelectedIndex, setFilterLeftSelectedIndex] = useState(0);

  const [priceSliderValue, setPriceSliderValue] = useState([0, 20000]);
  const [requiredFilters, setRequiredFilters] = useState({
    price: {
      lte: priceSliderValue[1],
      gte: priceSliderValue[0],
    },
    type: [],
    size: [],
    for: [],
    season: [],
  });

  useEffect(() => {
    setProducts(<Spinner />);
    setSearch(props.match.params.search);
  }, [props.match.params.search]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER}/product/search/${search}`)
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
  }, [search]); // eslint-disable-line react-hooks/exhaustive-deps

  const searchByFilter = () => {
    const filter = { ...requiredFilters };
    filter.price = {
      lte: priceSliderValue[1],
      gte: priceSliderValue[0],
    };

    setFilterBoxOpen(false);
    setProducts(<Spinner />);

    fetch(`${process.env.REACT_APP_SERVER}/product/filter-search`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        filters: filter,
      }),
    })
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
        setProducts(
          <small className="field-error-msg">
            Can't connect to server. Please refresh
          </small>
        );
      });
  };

  const addToMyFilter = (filterValue) => {
    const myFilters = { ...requiredFilters };
    const index =
      myFilters[filters[filterLeftSelectedIndex].name.toLowerCase()].indexOf(
        filterValue
      );

    if (index < 0)
      myFilters[filters[filterLeftSelectedIndex].name.toLowerCase()].push(
        filterValue
      );
    setRequiredFilters(myFilters);
  };
  const removeToMyFilter = (filterValue) => {
    const myFilters = { ...requiredFilters };
    const index =
      myFilters[filters[filterLeftSelectedIndex].name.toLowerCase()].indexOf(
        filterValue
      );

    if (index > -1)
      myFilters[filters[filterLeftSelectedIndex].name.toLowerCase()].splice(
        index,
        1
      );
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
          {/* <div
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
          </div> */}

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
                    {filters[filterLeftSelectedIndex].values.map((item, i) => {
                      if (filterLeftSelectedIndex === 0) {
                        return (
                          <div
                            key={Date.now() + i}
                            style={{ margin: "30px auto", maxWidth: "80%" }}
                          >
                            <Slide
                              value={priceSliderValue}
                              onChanged={(value) => setPriceSliderValue(value)}
                            />
                            <div>
                              <h4>
                                From -
                                <span style={{ color: "var(--primary-color)" }}>
                                  ??? {priceSliderValue[0]}
                                </span>
                              </h4>
                              <h4>
                                To -{" "}
                                <span style={{ color: "var(--primary-color)" }}>
                                  ??? {priceSliderValue[1]}
                                </span>
                              </h4>
                            </div>
                          </div>
                        );
                      }
                      return (
                        <CheckListItem
                          key={Date.now() + item.value + i}
                          id={Date.now() + item.value}
                          last={
                            i ===
                            filters[filterLeftSelectedIndex].values.length - 1
                          }
                          checked={
                            requiredFilters[
                              filters[
                                filterLeftSelectedIndex
                              ].name.toLowerCase()
                            ].indexOf(item.value) > -1
                          }
                          changed={(check) =>
                            check
                              ? addToMyFilter(item.value)
                              : removeToMyFilter(item.value)
                          }
                        >
                          {item.name}
                        </CheckListItem>
                      );
                    })}
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
                      <Button
                        style={{ marginLeft: "auto" }}
                        onClick={searchByFilter}
                      >
                        Apply
                      </Button>
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
