import React from "react";
import { Outlet } from "react-router-dom";
import Grid from "@mui/material/Grid";

const RootLayout = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <div className="sidebarbox">
            <div className="sidebar">asdfasd</div>
          </div>
        </Grid>
        <Outlet />
      </Grid>
    </>
  );
};

export default RootLayout;
