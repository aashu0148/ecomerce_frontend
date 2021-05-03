import React, { useState } from "react";
import { Grid, IconButton } from "@material-ui/core";

import man from "../../assets/svg/man-2.svg";
import woman from "../../assets/svg/woman-2.svg";
import Icon from "../Icon";
import Card from "../Card/Card";
import Picturecard from "../Card/PictureCard";
import TextCard from "../Card/TextCard";
import "./Main.css";

function Main() {
  const [sortBox, setSortBox] = useState(false);

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
            <IconButton style={{ padding: "0", borderRadius: "15px" }}>
              {" "}
              <div className="main_topbar_elem">
                <Icon src={man} />
                <p>Men</p>
              </div>
            </IconButton>
            <IconButton style={{ padding: "0", borderRadius: "15px" }}>
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
          <Picturecard image="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2021/4/29/6cacbf88-b43a-4404-8fae-c6036bc76ec51619699577874-Sportswear_Desk.jpg" />
          <Picturecard image="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2021/4/29/962e59b2-3b66-4f76-8272-24353a84d3df1619700997051-Ethnic_Desktop_Banner.jpg" />
          <Picturecard image="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2021/4/29/12da06e7-4fe2-4d2c-b2b1-4ff94a852ce31619700795560-Sports-Apparel_Desk.jpg" />
          <Picturecard
            text="Denim Shirts"
            image="https://media.istockphoto.com/photos/cool-smiling-man-using-smartphone-on-grey-wall-picture-id1158242286?b=1&k=6&m=1158242286&s=170667a&w=0&h=VAkFZDu4IYuRFb17tK5iwI-Ou-YEVNqr6oxjKmvunaU="
          />

          <TextCard text="Kurtas under 500" color="#fff" />
        </Grid>

        <Card
          title="denim of the year"
          image="https://cdn.pixabay.com/photo/2016/02/19/10/45/fashion-1209388__340.jpg"
          price="100"
        />
        <Card title="denim of the year" price="100" />
        <Card
          title="denim of the year"
          image="https://cdn.pixabay.com/photo/2016/02/19/10/45/fashion-1209388__340.jpg"
          price="100"
        />
      </Grid>
    </div>
  );
}

export default Main;
