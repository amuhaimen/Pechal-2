import React, { useEffect } from "react";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { activeUser } from "../slices/userSlice";
import Grid from "@mui/material/Grid";
import GroupList from "../components/GroupList";
import Friendrequest from "../components/Friendrequest";
import Friends from "../components/Friends";
import MyGroups from "../components/MyGroups";
import Userlist from "../components/Userlist";
import Blockedusers from "../components/Blockedusers";

const Home = () => {
  const auth = getAuth();
  let navigate = useNavigate();
  let dispatch = useDispatch();

  let data = useSelector((state) => state);
  // console.log(data.userdata.userInfo);
  console.log(Boolean(!data.userdata.userInfo));

  useEffect(() => {
    if (!data.userdata.userInfo) {
      console.log("hello");
      navigate("/login ");
    }
  }, []);

  //=========================
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     console.log(user);
  //     dispatch(activeUser(user.user));
  //   } else {
  //     navigate("/login");
  //   }
  // });

  let handleLogOut = () => {
    signOut(auth).then(() => {
      localStorage.removeItem("userInfo");
      dispatch(activeUser(null));
      navigate("/login");
    });
  };
  return (
    <>
      {/* <h1>Home</h1> */}
      <Grid item xs={4}>
        <GroupList />
        <Friendrequest />
      </Grid>
      <Grid item xs={3}>
        <Friends />
        <MyGroups />
      </Grid>
      <Grid item xs={3}>
        <Userlist />
        <Blockedusers />
      </Grid>
      <button onClick={handleLogOut}>LogOut</button>
    </>
  );
};

export default Home;

//H.W:1.home e jaoar pore registration and log in page e jaoa jabe na
// 2. have to show success message with settime-out function
// 3. icon active and hover korte hobe
