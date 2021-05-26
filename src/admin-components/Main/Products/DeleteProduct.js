import React, { useState } from "react";
import { Button } from "@material-ui/core";
import Swal from "sweetalert2";
import CancelIcon from "@material-ui/icons/Cancel";

function DeleteProduct(props) {
  const [errorMsg, setErrorMsg] = useState("");
  const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(false);

  const swarlPopupSuccess = (text) => {
    Swal.fire({
      title: "Done",
      text: text,
      icon: "success",
      confirmButtonText: "Cool",
      confirmButtonColor: "#a55fe0",
    });
  };

  const deleteProduct = () => {
    setDeleteButtonDisabled(true);

    fetch(`${process.env.REACT_APP_SERVER}/product/delete`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ id: props.pid }),
    })
      .then(async (res) => {
        setDeleteButtonDisabled(false);
        const data = await res.json();
        if (!data.status) {
          setErrorMsg(data.message);
          return;
        }
        swarlPopupSuccess("Product deleted successfully");
        props.close();
        props.refresh();
      })
      .catch(() => {
        setErrorMsg("Can't connect to server");
        setDeleteButtonDisabled(false);
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
          onClick={deleteProduct}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export default DeleteProduct;
