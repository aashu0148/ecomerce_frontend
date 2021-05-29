import React, { useEffect, useState } from "react";
import { Divider, Grid, Modal } from "@material-ui/core";
import AddIcon from "@material-ui/icons/AddBox";
import CancelIcon from "@material-ui/icons/Cancel";

import Spinner from "../../../Components/Spinner/Spinner";
import AddCard from "./AddCard";
import HomeCard from "./HomeCard";
import "./Home.css";

function Home() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [showSpinner, setShowSpinner] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [cards, setCards] = useState([]);

  const refreshCards = () => {
    setShowSpinner(true);
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
      });
  };

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
            minWidth: "350px",
            minHeight: "400px",
            width: "fit-content",
            height: "fit-content",
            outline: "none",
            margin: "5px",
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
          <AddCard
            close={() => setAddModalOpen(false)}
            refresh={refreshCards}
          />
        </div>
      </Modal>
      <Grid container spacing={2} style={{ width: "100%", margin: "0" }}>
        <Grid item xs={10} sm={10} md={10} lg={10}>
          <h2>Home Cards</h2>
        </Grid>
        <Grid item xs={2} sm={2} md={2} lg={2} style={{ textAlign: "center" }}>
          <AddIcon
            style={{
              cursor: "pointer",
              fontSize: "2rem",
              color: "var(--primary-color)",
            }}
            onClick={() => setAddModalOpen(true)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Divider />
        </Grid>
        <small
          style={{ width: "100%", fontSize: "0.9rem", textAlign: "center" }}
          className="field-error-msg"
        >
          {errorMsg}
        </small>
        {showSpinner ? (
          <Spinner />
        ) : cards.length === 0 ? (
          <h3>No Cards found :/</h3>
        ) : (
          <div style={{ width: "100%" }}>
            {cards.map((item, i) => (
              <HomeCard
                key={i}
                number={i + 1}
                data={item}
                refresh={refreshCards}
              />
            ))}
          </div>
        )}
      </Grid>
    </div>
  );
}

export default Home;
