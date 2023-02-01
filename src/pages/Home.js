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

  // let handleLogOut = () => {
  //   signOut(auth).then(() => {
  //     localStorage.removeItem("userInfo");
  //     dispatch(activeUser(null));
  //     navigate("/login");
  //   });
  // };
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
      {/* <button onClick={handleLogOut}>LogOut</button> */}
    </>
  );
};

export default Home;

//==================================
//H.W:1.home e jaoar pore registration and log in page e jaoa jabe na
// 2. have to show success message with settime-out function (Done)
// 3. icon active and hover korte hobe.
// 4.userlist e friend request pathanor por je sender tar id te cancel button add hobe.
// 5.user list e friend hoye gele unfriend er option thakbe

//==================================
//Problem:1.Authentication theke id bad dile realtime theke bad hoy na
//Problem:2.profile picture change er khetre 1 bar realtime change hoy bt 2nd bar reload chara change hoy na.

//==================================
//deu work:1.forgot password
//deu work:2.userlist thikthak kaj kore na(user list e user er name and profile picture properly ashe na)
//deu work:3.profile picture e kichu na thakle shekha default avatar/picture boshate hobe (modal er logic boshalei hobe)
