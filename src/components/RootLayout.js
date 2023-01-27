import React from "react";
import { Outlet } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { AiOutlineHome, AiOutlineMessage } from "react-icons/ai";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FiSettings } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { useSelector } from "react-redux";

const RootLayout = () => {
  let data = useSelector((state) => state);
  console.log(data.userdata.userInfo.displayName);
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <div className="sidebarbox">
            <div className="sidebar">
              <div className="imgholder">
                <img src="assets/profile.png" />
              </div>
              <h5>{data.userdata.userInfo.displayName}</h5>
              <div className="iconholder">
                <AiOutlineHome className="icon" />
                <AiOutlineMessage className="icon" />
                <IoIosNotificationsOutline className="icon" />
                <FiSettings className="icon" />
                <MdLogout className="icon-lg" />
              </div>
            </div>
          </div>
        </Grid>
        <Outlet />
      </Grid>
    </>
  );
};

export default RootLayout;
