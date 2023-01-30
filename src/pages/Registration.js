import React, { useState } from "react";
import Header from "../components/Header";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import Grid from "@mui/material/Grid";
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
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ColorRing } from "react-loader-spinner";
import { getDatabase, ref, set } from "firebase/database";

const CommonButton = styled(Button)({
  width: "100%",
  padding: "19px 12px",
  backgroundColor: "#5F35F5",
  borderRadius: "86px",
  marginTop: "56px",
  fontFamily: ["Nunito", "sans - serif"],
  fontSize: "20.64px",
  "&:hover": {
    backgroundColor: "#000",
  },
});

const Registration = () => {
  const auth = getAuth();
  const db = getDatabase();
  let navigate = useNavigate();
  let [show, setShow] = useState(false);
  let [loader, setLoader] = useState(false);
  let [formData, setFormData] = useState({
    email: "",
    fullname: "",
    password: "",
  });
  let [error, setError] = useState({
    email: "",
    fullname: "",
    password: "",
  });

  let handleForm = (e) => {
    let { name, value } = e.target;
    if (name == "password") {
      // let capi = /[A-Z]/;
      // let lower = /[a-z]/;
      // let num = /[0-9]/;
      // console.log(value);
      // if (!capi.test(value)) {
      //   setError({ ...error, password: " one capital lettar  required" });
      //   return;
      // }
      // if (!lower.test(value)) {
      //   setError({ ...error, password: " one lower lettar  required" });
      //   return;
      // }
      // if (!num.test(value)) {
      //   setError({ ...error, password: " one number required" });
      //   return;
      // }
      // if (value.length < 6) {
      //   setError({ ...error, password: "password length at-least 6" });
      //   return;
      // }
    }

    setFormData({ ...formData, [name]: value });
    setError({ ...error, [name]: "" });

    // if (e.target.name == "email") {
    //   setFormData({ ...formData, email: e.target.value });
    //   console.log(formData);
    // } else if (e.target.name == "fullname") {
    //   setFormData({ ...formData, fullname: e.target.value });
    //   console.log(formData);
    // } else {
    //   setFormData({ ...formData, password: e.target.value });
    //   console.log(formData);
    // }
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
  let handleClick = () => {
    //PROBLEM: form fill-up na kore button click korleo loader ashe eta off hobe kivabe

    let expression =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (formData.email == "") {
      setLoader(false);
      setError({ ...error, email: "email required" });
    } else if (!expression.test(formData.email)) {
      setLoader(false);
      setError({ ...error, email: "Valid email required" });
    } else if (formData.fullName == "") {
      setLoader(false);
      setError({ ...error, fullName: "full name required" });
    } else if (formData.password == "") {
      setLoader(false);
      setError({ ...error, password: "password required" });
    } else {
      setLoader(true);
      createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then((user) => {
          sendEmailVerification(auth.currentUser).then(() => {
            console.log(user.user);
            updateProfile(auth.currentUser, {
              displayName: formData.fullname,
            })
              .then(() => {
                set(ref(db, "users/" + user.user.uid), {
                  displayName: user.user.displayName,
                  email: user.user.email,
                }).then(() => {
                  setLoader(false);
                  toast("Registration Successful,please check your email");
                  setTimeout(() => {
                    navigate("/login");
                  }, 2000);
                });
              })
              .catch((error) => {
                // An error occurred
                // ...
              });
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          // const errorMessage = error.message;

          if (errorCode.includes("auth/email-already-in-use")) {
            setLoader(false);
            setError({ ...error, email: "Email Already Exists" });
          }
        });
    }
  };
  return (
    <>
      <Grid container spacing={2}>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Grid item xs={6}>
          <div className="regleftside">
            <div>
              <Header>
                <Heading
                  className="heading"
                  title="Get started with easily register"
                  as="h2"
                />
                <p className="regsubheading">
                  Free register and you can enjoy it
                </p>
              </Header>
              <div className="inputboxcontainer">
                <InputBox
                  name="email"
                  type="email"
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
                  name="fullname"
                  type="text"
                  textChange={handleForm}
                  className="reginput"
                  label="Full Name"
                  variant="outlined"
                />
                {error.fullname && (
                  <Alert className="error" severity="error">
                    {error.fullname}
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
                {loader ? (
                  <ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={[
                      "#e15b64",
                      "#f47e60",
                      "#f8b26a",
                      "#abbd81",
                      "#849b87",
                    ]}
                  />
                ) : (
                  <PButton
                    click={handleClick}
                    bname={CommonButton}
                    title="Sign up"
                  />
                )}
                <AuthenticationLink
                  className="reglink"
                  title="Already have an account"
                  hreftitle="Sign In"
                  href="/login"
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
