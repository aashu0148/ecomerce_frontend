import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/action";
import { useHistory } from "react-router-dom";
import { Grid, IconButton } from "@material-ui/core";

import man from "../../assets/svg/man-2.svg";
import woman from "../../assets/svg/woman-2.svg";
import Icon from "../Icon";
import PictureCard from "../Card/PictureCard";
import TextCard from "../Card/TextCard";
import Spinner from "../Spinner/Spinner";
import "./Main.css";

function Main(props) {
  const history = useHistory();
  const [sortBox, setSortBox] = useState(false);
  const [showSpinner, setShowSpinner] = useState(true);
  const [cards, setCards] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER}/admin/home-card`)
      .then(async (res) => {
        setShowSpinner(false);
        const data = await res.json();
        if (!data.status) {
          return;
        }
        setCards(data.data);
      })
      .catch(() => {
        setShowSpinner(false);
        setErrorMsg("Error connecting server. Please retry");
      });
  }, []);

  return (
    <div className="main">
      <div
        className={`main_backdrop ${sortBox ? "main_backdrop_active" : ""}`}
        onClick={() => setSortBox(false)}
      />
      <Grid
        container
        spacing={2}
        justify="center"
        style={{
          margin: 0,
          width: "100%",
        }}
      >
        <Grid item xs={12} sm={12} lg={12}>
          <div className="main_topbar">
            <h2>New In</h2>
            <IconButton
              style={{ padding: "0", borderRadius: "15px" }}
              onClick={() => {
                props.setFiltersAction({
                  for: ["Men"],
                });
                history.push("/products");
              }}
            >
              {" "}
              <div className="main_topbar_elem">
                <Icon src={man} />
                <p>Men</p>
              </div>
            </IconButton>
            <IconButton
              style={{ padding: "0", borderRadius: "15px" }}
              onClick={() => {
                props.setFiltersAction({
                  for: ["women"],
                });
                history.push("/products");
              }}
            >
              <div className="main_topbar_elem ">
                <Icon src={woman} />
                <p>Women</p>
              </div>
            </IconButton>
          </div>
        </Grid>

        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <h3 style={{ width: "100%" }}>{errorMsg}</h3>
          {showSpinner ? (
            <Spinner />
          ) : cards.length === 0 ? (
            <h3>No cards found.</h3>
          ) : (
            cards.map((item, i) =>
              item.image ? (
                <PictureCard
                  key={i}
                  image={`${process.env.REACT_APP_SERVER}/${item.image}`}
                  text={item.text}
                  color={item.color}
                  onClick={() => {
                    props.setFiltersAction(item.filters);
                    history.push("/products");
                  }}
                />
              ) : (
                <TextCard
                  key={i}
                  text={item.text}
                  color={item.color}
                  background={item.background}
                  onClick={() => {
                    props.setFiltersAction(item.filters);
                    history.push("/products");
                  }}
                />
              )
            )
          )}
          {/* <TextCard
            background="coral"
            text="Men's wear under 1200"
            color="#fff"
          />
          <PictureCard image="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2021/4/29/6cacbf88-b43a-4404-8fae-c6036bc76ec51619699577874-Sportswear_Desk.jpg" />
          <PictureCard image="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2021/4/29/962e59b2-3b66-4f76-8272-24353a84d3df1619700997051-Ethnic_Desktop_Banner.jpg" />
          <TextCard text="Kurtas under 500" color="#fff" />
          <TextCard
            text="Unbelivable pricing"
            background="lightblue"
            color="green"
          />
          <PictureCard
            color="#7cd629"
            text="Denim Shirts"
            image="https://media.istockphoto.com/photos/cool-smiling-man-using-smartphone-on-grey-wall-picture-id1158242286?b=1&k=6&m=1158242286&s=170667a&w=0&h=VAkFZDu4IYuRFb17tK5iwI-Ou-YEVNqr6oxjKmvunaU="
          /> */}
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFiltersAction: (filters) =>
      dispatch({ type: actionTypes.SET_FILTERS, filters: filters }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
