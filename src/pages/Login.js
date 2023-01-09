import React from "react";
import Header from "../components/Header";
import Heading from "../components/Heading";
import Grid from "@mui/material/Grid";
import InputBox from "../components/InputBox";
import PButton from "../components/PButton";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import AuthenticationLink from "../components/AuthenticationLink";
import { Link } from "react-router-dom";

const Commonbutton = styled(Button)({
  width: "100%",
  fontFamily: ["Nunito", "sans-serif"],
  fontSize: "20px",
  fontWeight: "600",
  fontSize: 16,
  padding: "19px",
  marginTop: "56px",
  backgroundColor: "#5F35F5",
  "&:hover": {
    backgroundColor: "black",
  },
});

const Login = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div className="regleftside">
            <div>
              <Header>
                <Heading
                  title="Login to your account!"
                  className="heading"
                  as="h2"
                />
                <Link to="#">
                  <img style={{ marginTop: "30px" }} src="assets/google.png" />
                </Link>
              </Header>
              <div className="inputboxcontainer">
                <InputBox
                  className="reginput"
                  label="Email Address"
                  variant="standard"
                />

                <InputBox
                  className="reginput"
                  label="Password"
                  variant="standard"
                />
                <PButton bname={Commonbutton} title="Login to Continue" />
                <AuthenticationLink
                  className="reglink"
                  title="Don’t have an account ? "
                  href="/"
                  hreftitle="Sign up"
                />
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={6}>
          <img className="registrationimg" src="assets/loginimg.png" />
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
