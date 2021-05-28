import React, { useState } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Swal from "sweetalert2";

function DeleteModal(props) {
  const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(false);
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

  const deleteCard = () => {
    setDeleteButtonDisabled(true);
    fetch(`${process.env.REACT_APP_SERVER}/admin/delete-home-card`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id: props.id,
        cid: props.data._id,
      }),
    })
      .then(async (res) => {
        setDeleteButtonDisabled(false);
        const data = await res.json();
        if (!data.status) {
          setErrorMsg(data.message);
          return;
        }
        props.refresh();
        props.close();
        swarlPopupSuccess("Card deleted successfully");
      })
      .catch(() => {
        setDeleteButtonDisabled(false);
        setErrorMsg("Can't connect to server. Please retry");
      });
  };

  return (
    <div>
      <h2 style={{ margin: "20px 0" }}>Confirm delete ?</h2>
      <small className="field-error-msg">{errorMsg}</small>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Button variant="contained" onClick={props.close}>
          Cancel
        </Button>
        <Button
          disabled={deleteButtonDisabled}
          variant="contained"
          color="secondary"
          onClick={deleteCard}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    id: state.id,
  };
};

export default connect(mapStateToProps)(DeleteModal);
