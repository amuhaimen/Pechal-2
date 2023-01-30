import React, { useState } from "react";
import Header from "../components/Header";
import Heading from "../components/Heading";
import Grid from "@mui/material/Grid";
import InputBox from "../components/InputBox";
import PButton from "../components/PButton";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import AuthenticationLink from "../components/AuthenticationLink";
import { Link } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { activeUser } from "../slices/userSlice";
import { ColorRing } from "react-loader-spinner";
import Alert from "@mui/material/Alert";

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
  let [show, setShow] = useState(false);
  let [loader, setLoader] = useState(false);
  let auth = getAuth();
  let navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  let dispatch = useDispatch();

  let [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  let [error, setError] = useState({
    email: "",
    password: "",
  });

  let handleClick = () => {
    if (formData.email == "") {
      setError({ ...error, email: "email required" });
    } else if (formData.password == "") {
      setError({ ...error, password: "password required" });
    }
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        dispatch(activeUser(userCredential.user));
        localStorage.setItem("userInfo", JSON.stringify(userCredential.user));
        if (userCredential.user.emailVerified) {
          setLoader(true);
          setTimeout(() => {
            navigate("/pechal");
          }, 2000);
        } else {
          toast("please verify your email first and try again");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  let handleForm = (e) => {
    let { name, value } = e.target;
    if (name == "password") {
    }

    setFormData({ ...formData, [name]: value });
    setError({ ...error, [name]: "" });
  };

  let handleGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      console.log("google done");
    });
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
                  title="Login to your account!"
                  className="heading"
                  as="h2"
                />
                <Link to="#">
                  <img
                    onClick={handleGoogle}
                    style={{ marginTop: "30px" }}
                    src="assets/google.png"
                  />
                </Link>
              </Header>
              <div className="inputboxcontainer">
                <InputBox
                  textChange={handleForm}
                  className="reginput"
                  label="Email Address"
                  variant="standard"
                  name="email"
                />
                {error.email && (
                  <Alert className="error" severity="error">
                    {error.email}
                  </Alert>
                )}

                <div style={{ width: "100%", position: "relative" }}>
                  <InputBox
                    type={show ? "text" : "password"}
                    name="password"
                    textChange={handleForm}
                    className="reginput"
                    label="Password"
                    variant="standard"
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
                    bname={Commonbutton}
                    title="Login to Continue"
                  />
                )}

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
