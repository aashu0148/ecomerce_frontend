import React from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";

import Sidebar from "../Sidebar/Sidebar";
import Main from "../Main/Main";

function Body(props) {
  return (
    <div>
      <Grid
        container
        spacing={2}
        style={{
          margin: 0,
          width: "100%",
        }}
      >
        <Grid item xs={12} sm={3} lg={3} md={3}>
          <Sidebar />
        </Grid>
        <Grid item xs={12} sm={9} lg={9} md={9}>
          <Main />
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(Body);
