import React, { useState } from "react";
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
  let handleClick = () => {
    if (formData.email == "") {
      console.log("email nai");
    }
    if (formData.fullName == "") {
      console.log("nam nai");
    }
    if (formData.password == "") {
      console.log("pass nai");
    }
  };
  // let handleEmail = (e) => {
  //   console.log(e.target.value);
  // };
  // let handleName = (e) => {
  //   console.log(e.target.value);
  // };
  // let handlePassword = (e) => {
  //   console.log(e.target.value);
  // };
  let [formData, setFormData] = useState({
    email: "",
    fullName: "",
    password: "",
  });
  let handleForm = (e) => {
    let { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    // if (e.target.name == "email") {
    //   setFormData({ ...formData, email: e.target.value });
    //   console.log(formData);
    // } else if (e.target.name == "fullName") {
    //   setFormData({ ...formData, fullName: e.target.value });
    //   console.log(formData);
    // } else {
    //   setFormData({ ...formData, password: e.target.value });
    //   console.log(formData);
    // }
  };
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
                  type="email"
                  name="email"
                  textChange={handleForm}
                  className="reginput"
                  label="Email Address"
                  variant="outlined"
                />
                <InputBox
                  type="text"
                  name="fullName"
                  textChange={handleForm}
                  className="reginput"
                  label="Full name"
                  variant="outlined"
                />
                <InputBox
                  type="password"
                  name="password"
                  textChange={handleForm}
                  className="reginput"
                  label="Password"
                  variant="outlined"
                />
                <PButton
                  click={handleClick}
                  bname={Commonbutton}
                  title="Sign up"
                />
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
