import React, { useState, useEffect } from "react";
// import * as actionTypes from "../../store/action";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import PreLoader from "../../Components/PreLoader/PreLoader";

function Dashboard(props) {
  const [preloading, setPreloading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER}/user/check-role`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        id: props.id,
        email: props.email,
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!data.status) {
          window.location.href = "/";
          return;
        }
        setPreloading(false);
      })
      .catch(() => {
        window.location.href = "/";
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return props.auth ? (
    preloading ? (
      <PreLoader />
    ) : (
      <div className="admin-dashboard">
        <h1>Admin page here</h1>
      </div>
    )
  ) : (
    <Redirect to="/" />
  );
}

const mapStateToProps = (state) => {
  return {
    id: state.id,
    email: state.email,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
