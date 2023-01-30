import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { AiOutlineHome, AiOutlineMessage } from "react-icons/ai";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FiSettings } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { activeUser } from "../slices/userSlice";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import Button from "@mui/material/Button";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth, updateProfile, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const RootLayout = () => {
  const auth = getAuth();
  let data = useSelector((state) => state);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //cropper start
  const [image, setImage] = useState();
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState();
  const [profile, setProfile] = useState("");

  const onChange = (e) => {
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
      console.log(files);
    } else if (e.target) {
      files = e.target.files;
      console.log(files);
    }
    const reader = new FileReader();
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
      const storage = getStorage();
      const storageRef = ref(
        storage,
        `profilepic/${data.userdata.userInfo.uid}`
      );
      const message4 = cropper.getCroppedCanvas().toDataURL();
      uploadString(storageRef, message4, "data_url").then((snapshot) => {
        setOpen(false);
        setImage("");
        getDownloadURL(storageRef).then((downloadURL) => {
          console.log("File available at", downloadURL);
          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          }).then(() => {
            dispatch(activeUser(auth.currentUser));
            localStorage.setItem("userInfo", JSON.stringify(auth.currentUser));
          });
        });
        toast("Profile picture uploaded");
      });
    }
  };
  useEffect(() => {
    setProfile(data.userdata.userInfo.photoURL);
  }, [data]);
  //cropper end

  let handleLogOut = () => {
    signOut(auth).then(() => {
      localStorage.removeItem("userInfo");
      dispatch(activeUser(null));
      navigate("/login");
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
        <Grid item xs={1}>
          <div className="sidebarbox">
            <div className="sidebar">
              <div className="imgholder">
                <img
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "50%",
                  }}
                  onClick={handleOpen}
                  src={profile}
                />

                {/* {image ? (
                  <div className="img-preview"></div>
                ) : data.userdata.userInfo.photoURL ? (
                  <img
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "50%",
                    }}
                    onClick={handleOpen}
                    src={profile}
                  />
                ) : (
                  <img onClick={handleOpen} src="assets/profile.png" />
                )} */}
              </div>
              <h5>{data.userdata.userInfo.displayName}</h5>
              <div className="iconholder">
                <AiOutlineHome className="icon" />
                <AiOutlineMessage className="icon" />
                <IoIosNotificationsOutline className="icon" />
                <FiSettings className="icon" />
                <MdLogout onClick={handleLogOut} className="icon-lg" />
              </div>
            </div>
          </div>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Image Upload
                <div className="imgholder">
                  {image ? (
                    <div className="img-preview"></div>
                  ) : data.userdata.userInfo.photoURL ? (
                    <img
                      style={{
                        width: "70px",
                        height: "70px",
                        borderRadius: "50%",
                      }}
                      src={data.userdata.userInfo.photoURL}
                    />
                  ) : (
                    <img src="assets/profile.png" />
                  )}
                </div>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <input onChange={onChange} type="file" />
                {image && (
                  <>
                    <Cropper
                      style={{ height: 400, width: "100%" }}
                      zoomTo={0.5}
                      initialAspectRatio={1}
                      preview=".img-preview"
                      src={image}
                      viewMode={1}
                      minCropBoxHeight={10}
                      minCropBoxWidth={10}
                      background={false}
                      responsive={true}
                      autoCropArea={1}
                      checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                      onInitialized={(instance) => {
                        setCropper(instance);
                      }}
                      guides={true}
                    />
                    <Button onClick={getCropData} variant="contained">
                      Upload Photo
                    </Button>
                  </>
                )}
              </Typography>
            </Box>
          </Modal>
        </Grid>
        <Outlet />
      </Grid>
    </>
  );
};

export default RootLayout;
