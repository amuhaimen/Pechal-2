import React, { useState } from "react";
import Header from "../components/Header";
import Heading from "../components/Heading";
import Grid from "@mui/material/Grid";
import InputBox from "../components/InputBox";
import PButton from "../components/PButton";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import AuthenticationLink from "../components/AuthenticationLink";
import Alert from "@mui/material/Alert";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
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
  const auth = getAuth();
  let [formData, setFormData] = useState({
    email: "",
    fullName: "",
    password: "",
  });

  let [show, setShow] = useState(false);

  let [error, setError] = useState({
    email: "",
    fullName: "",
    password: "",
  });

  let handleForm = (e) => {
    let { name, value } = e.target;
    if (name == "password") {
      let capi = /[A-Z]/;
      let lower = /[a-z]/;
      let num = /[0-9]/;
      console.log(value);
      if (!capi.test(value)) {
        setError({ ...error, password: " one capital lettar  required" });
        return;
      }
      if (!lower.test(value)) {
        setError({ ...error, password: " one lower lettar  required" });
        return;
      }
      if (!num.test(value)) {
        setError({ ...error, password: " one number required" });
        return;
      }
      if (value.length < 6) {
        setError({ ...error, password: "password length at-least 6" });
        return;
      }
    }

    setFormData({ ...formData, [name]: value });
    setError({ ...error, [name]: "" });
  };

  //=========================after 33 minutes=================
  // 1.Home Work= have to show success message with settime-out function
  //***********************************************************/
  // let handleEmail = (e) => {
  //   console.log(e.target.value);
  // };
  // let handleName = (e) => {
  //   console.log(e.target.value);
  // };
  // let handlePassword = (e) => {
  //   console.log(e.target.value);
  // };

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

  let handleClick = () => {
    let expression =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (formData.email == "") {
      setError({ ...error, email: "email required" });
    } else if (!expression.test(formData.email)) {
      setError({ ...error, email: "Valid email required" });
    } else if (formData.fullName == "") {
      setError({ ...error, fullName: "full name required" });
    } else if (formData.password == "") {
      setError({ ...error, password: "password required" });
    } else {
      createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then((user) => {
          sendEmailVerification(auth.currentUser).then(() => {
            // Email verification sent!
            // ...
            console.log("email sent");
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          // const errorMessage = error.message;

          if (errorCode.includes("auth/email-already-in-use")) {
            setError({ ...error, email: "Email Already Exists" });
          }
        });
    }
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
                {error.email && (
                  <Alert className="error" severity="error">
                    {error.email}
                  </Alert>
                )}
                <InputBox
                  type="text"
                  name="fullName"
                  textChange={handleForm}
                  className="reginput"
                  label="Full name"
                  variant="outlined"
                />
                {error.fullName && (
                  <Alert className="error" severity="error">
                    {error.fullName}
                  </Alert>
                )}
                <div style={{ width: "100%", position: "relative" }}>
                  <InputBox
                    type={show ? "text" : "password"}
                    name="password"
                    textChange={handleForm}
                    className="reginput"
                    label="Password"
                    variant="outlined"
                  />
                  {show ? (
                    <AiFillEye
                      onClick={() => setShow(false)}
                      className="eyeicon"
                    />
                  ) : (
                    <AiFillEyeInvisible
                      onClick={() => setShow(true)}
                      className="eyeicon"
                    />
                  )}
                </div>
                {error.password && (
                  <Alert className="error" severity="error">
                    {error.password}
                  </Alert>
                )}
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
