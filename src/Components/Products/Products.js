import React, { useState, useEffect } from "react";
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
import "./Products.css";

function Products() {
  const [sortBoxOpen, setSortBoxOpen] = useState(false);
  const [filterBoxOpen, setFilterBoxOpen] = useState(false);

  const [requiredFilters, setRequiredFilters] = useState([]);

  const [filters, setFilters] = useState([
    {
      id: "83",
      name: "Price",
      values: [
        {
          name: "Price Value 1",
          value: "19",
        },
        {
          name: "Price Value 1",
          value: "18",
        },
        {
          name: "Price Value 1",
          value: "17",
        },
        {
          name: "Price Value 1",
          value: "16",
        },
      ],
    },
    {
      id: "23",
      name: "Shirt",
      values: [
        {
          name: "Shirt Value 1",
          value: "15",
        },
        {
          name: "Shirt Value 1",
          value: "14",
        },
        {
          name: "Shirt Value 1",
          value: "3",
        },
        {
          name: "Shirt Value 1",
          value: "12",
        },
      ],
    },
    {
      id: "14",
      name: "T-Shirt",
      values: [
        {
          name: "T-Shirt Value 1",
          value: "11",
        },
        {
          name: "T-Shirt Value 1",
          value: "10",
        },
        {
          name: "T-Shirt Value 1",
          value: "9",
        },
        {
          name: "T-Shirt Value 1",
          value: "8",
        },
      ],
    },
    {
      id: "5",
      name: "Jacket",
      values: [
        {
          name: "Jacket Value 1",
          value: "7",
        },
        {
          name: "Jacket Value 1",
          value: "6",
        },
        {
          name: "Jacket Value 1",
          value: "5",
        },
        {
          name: "Jacket Value 1",
          value: "4",
        },
      ],
    },
    {
      id: "63",
      name: "Lower",
      values: [
        {
          name: "Lower Value 1",
          value: "3",
        },
        {
          name: "Lower Value 1",
          value: "1",
        },
        {
          name: "Lower Value 1",
          value: "2",
        },
        {
          name: "Lower Value 1",
          value: "45",
        },
      ],
    },
  ]);
  const [filterLeftSelectedIndex, setFilterLeftSelectedIndex] = useState(0);

  useEffect(() => {
    if (false) {
      setFilters([]);
      setRequiredFilters([]);
    }

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

  return (
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
                        key={item.value}
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

        <Card
          title="Product 1"
          price={1400}
          image="https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/11207672/2020/3/17/d7a23f89-f0df-43b4-a00d-1a3742e8cafe1584442789288-Jack--Jones-Men-White--Black-Slim-Fit-Checked-Casual-Shirt-5-4.jpg"
        />
        <Card
          title="Product 2"
          price={1400}
          image="https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/11207372/2020/2/5/43210b97-11e6-43f3-b011-357a8bdacf8b1580902145818-Jack--Jones-Men-Shirts-5381580902144477-1.jpg"
        />
        <Card
          title="Product 3"
          price={1400}
          image="https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/8131511/2019/10/30/f95ebc59-e8c2-44b1-8b26-4a2078af530d1572428433517-Jack--Jones-Men-Olive-Green-Slim-Fit-Solid-Chinos-7721572428-1.jpg"
        />
        <Card
          title="Product 4"
          price={1400}
          image="https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/11207378/2020/2/5/3196a313-3b5e-454c-93e5-839252227e7e1580902163843-Jack--Jones-Men-Shirts-1071580902162156-1.jpg"
        />
        <Card
          title="Product 5"
          price={1400}
          image="https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/11207376/2020/6/1/677350ea-d6e9-4e3b-9d46-2d80806045351590991398031-Jack--Jones-Men-Blue-Glenn-Slim-Fit-Low-Rise-Mildly-Distress-1.jpg"
        />
        <Card title="Product 6" price={1400} />
      </Grid>
    </div>
  );
}

export default Products;
