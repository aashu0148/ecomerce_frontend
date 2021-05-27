import React, { useState } from "react";
import { connect } from "react-redux";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CancelIcon from "@material-ui/icons/Cancel";
import { Button } from "@material-ui/core";
import Swal from "sweetalert2";

function UpdateModal(props) {
  const [radioValue, setRadioValue] = useState("delivered");
  const [updateButtonDisabled, setUpdateButtonDisabled] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const swarlPopupSuccess = (text) => {
    Swal.fire({
      title: "Done",
      text: text,
      icon: "success",
      confirmButtonText: "Cool",
      confirmButtonColor: "#a55fe0",
    });
  };

  const onUpdate = () => {
    setUpdateButtonDisabled(true);
    const oid = props.data._id;
    setErrorMsg("");
    fetch(`${process.env.REACT_APP_SERVER}/admin/update-order`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id: props.id,
        oid: oid,
        cancelled: radioValue === "cancelled",
        delivered: radioValue === "delivered",
      }),
    })
      .then(async (res) => {
        setUpdateButtonDisabled(false);
        const data = await res.json();
        if (!data.status) {
          setErrorMsg(data.message);
          return;
        }

        props.refresh();
        props.close();
        swarlPopupSuccess("Order successfully updated");
      })
      .catch(() => {
        setUpdateButtonDisabled(false);
        setErrorMsg("Can't reach to the server. please try again");
      });
  };
  return (
    <div>
      <div style={{ textAlign: "end" }}>
        <CancelIcon
          onClick={props.close}
          style={{
            color: "darkgray",
            cursor: "pointer",
          }}
        />
      </div>
      <div
        className={`${props.mobileView ? "" : "styled-scrollbar"}`}
        style={{
          minWidth: "350px",
          maxWidth: "500px",
        }}
      >
        <h2>Update Order</h2>
        <RadioGroup
          aria-label="status"
          name="status"
          value={radioValue}
          onChange={(e) => setRadioValue(e.target.value)}
        >
          <FormControlLabel
            value="delivered"
            control={<Radio style={{ color: "#7cd629" }} />}
            label="Delivered"
          />
          <FormControlLabel
            value="cancelled"
            control={<Radio style={{ color: "coral" }} />}
            label="Cancelled"
          />
        </RadioGroup>
        <div style={{ textAlign: "center" }}>
          <small className="field-error-msg">{errorMsg}</small>
        </div>
        <div style={{ textAlign: "end" }}>
          <Button
            variant="contained"
            style={{
              background: "var(--primary-color)",
              color: "#fff",
            }}
            onClick={onUpdate}
            disabled={updateButtonDisabled}
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    id: state.id,
    mobileView: state.mobileView,
  };
};

export default connect(mapStateToProps)(UpdateModal);
