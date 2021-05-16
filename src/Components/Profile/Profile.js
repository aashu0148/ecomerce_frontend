import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/action";
import { Redirect } from "react-router";
import { Grid, Divider } from "@material-ui/core";

import Navbar from "../Navbar/Navbar";
import Popup from "../SweetPopup/Popup";
import Input from "../Field/Input";
import Button from "../Button/Button";

function Profile(props) {
  const [nameValue, setNamevalue] = useState(props.name || "");
  const [mobileValue, setMobileValue] = useState(props.mobile || "");
  const [valueChanged, setValueChanged] = useState(false);
  const [updateButtonDisabled, setUpdateButtonDisabled] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [popupActive, setPopupActive] = useState(false);

  const submission = () => {
    if (!nameValue || !mobileValue || mobileValue.length !== 10) {
      setErrorMsg("Invalid values");
      return;
    }
    setErrorMsg("");
    setUpdateButtonDisabled(true);

    fetch(`${process.env.REACT_APP_SERVER}/user/update-profile`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: nameValue,
        mobile: mobileValue,
        id: props.id,
      }),
    })
      .then(async (res) => {
        setUpdateButtonDisabled(false);
        const data = await res.json();

        if (!data.status) {
          setErrorMsg(data.message);
          return;
        }
        setPopupActive(true);
        setTimeout(() => setPopupActive(false), 5000);
        props.updateAction({
          name: nameValue,
          mobile: mobileValue,
        });
        setValueChanged(false);
      })
      .catch(() => {
        setErrorMsg("Error connecting to server");
        setUpdateButtonDisabled(false);
      });
  };

  useEffect(() => {
    if (props.name !== nameValue || props.mobile !== mobileValue)
      setValueChanged(true);
    else setValueChanged(false);
  }, [nameValue, mobileValue]); // eslint-disable-line react-hooks/exhaustive-deps
  console.log("in profile page");
  return props.auth ? (
    <div className="profile">
      <Popup text="updated Succesfully" active={popupActive} />
      <Navbar />
      <Grid
        container
        spacing={2}
        style={{ margin: "0", width: "100%" }}
        justify="center"
      >
        <Grid item xs={12} md={12} lg={12}>
          <h1>Profile</h1>
        </Grid>
        <Grid
          item
          container
          xs={12}
          md={10}
          lg={9}
          style={{ background: "#fff", padding: "15px" }}
          alignItems="center"
        >
          <Grid item xs={4} lg={4}>
            <h3 style={{ margin: "10px 0" }}>Name</h3>
          </Grid>
          <Grid item xs={8} lg={8}>
            <Input
              style={{ fontWeight: "bold" }}
              value={nameValue}
              onChange={(e) => {
                setNamevalue(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12} style={{ margin: "4px 0" }}>
            <Divider />
          </Grid>
          <Grid item xs={4} lg={4}>
            <h3 style={{ margin: "10px 0" }}>Email</h3>
          </Grid>
          <Grid item xs={8} lg={8}>
            <Input
              disabled
              style={{ fontWeight: "bold" }}
              value={props.email}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12} style={{ margin: "4px 0" }}>
            <Divider />
          </Grid>
          <Grid item xs={4} lg={4}>
            <h3 style={{ margin: "10px 0" }}>Mobile</h3>
          </Grid>
          <Grid item xs={8} lg={8}>
            <Input
              maxLength="10"
              style={{ fontWeight: "bold" }}
              value={mobileValue}
              onChange={(e) => {
                const value = e.target.value;
                const char = value.slice(-1);
                if ((char >= "0" && char <= "9") || value === "")
                  setMobileValue(value);
              }}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12} style={{ margin: "4px 0" }}>
            <Divider />
          </Grid>
          <small
            style={{ fontWeight: "bold", textAlign: "center" }}
            className="field-error-msg"
          >
            {errorMsg}
          </small>
          {valueChanged ? (
            <Button
              disabled={updateButtonDisabled}
              type="button"
              onClick={submission}
            >
              Update
            </Button>
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    </div>
  ) : (
    <Redirect to="/" />
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    id: state.id,
    name: state.name,
    mobile: state.mobile,
    email: state.email,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateAction: (data) =>
      dispatch({
        type: actionTypes.UPDATE,
        name: data.name,
        mobile: data.mobile,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
