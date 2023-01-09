import React from "react";
import Header from "../components/Header";
import Heading from "../components/Heading";
import Grid from "@mui/material/Grid";
import InputBox from "../components/InputBox";
import PButton from "../components/PButton";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import AuthenticationLink from "../components/AuthenticationLink";

const Commonbutton = styled(Button)({
  borderRadius: "86px",
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

const Registration = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div className="regleftside">
            <div>
              <Header>
                <Heading
                  title="Get started with easily register"
                  className="heading"
                  as="h2"
                />
                <p className="regsubheading">
                  Free register and you can enjoy it
                </p>
              </Header>
              <div className="inputboxcontainer">
                <InputBox
                  className="reginput"
                  label="Email Address"
                  variant="outlined"
                />
                <InputBox
                  className="reginput"
                  label="Full name"
                  variant="outlined"
                />
                <InputBox
                  className="reginput"
                  label="Password"
                  variant="outlined"
                />
                <PButton bname={Commonbutton} title="Sign up" />
                <AuthenticationLink
                  className="reglink"
                  title="Already have an account"
                  href="/login"
                  hreftitle="Sign in"
                />
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={6}>
          <img className="registrationimg" src="assets/registrationimg.png" />
        </Grid>
      </Grid>
    </>
  );
};

export default Registration;
