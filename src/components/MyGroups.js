import React, { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  onValue,
  remove,
  set,
  push,
} from "firebase/database";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//Modal start
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
//modal end

//list in MUI start

import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material/";

//list in MUI end

//modal style start
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
//modal style end

const MyGroups = () => {
  const db = getDatabase();
  let [glist, setGlist] = useState([]);
  let [grlist, setGrlist] = useState([]);
  let data = useSelector((state) => state);

  const [open, setOpen] = React.useState(false);
  const handleOpen = (id) => {
    setOpen(true);
    const starCountRef = ref(db, "grouprequest");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().groupid == id) {
          arr.push({ ...item.val(), did: item.key });
        }
      });
      setGrlist(arr);
    });
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    const starCountRef = ref(db, "groups");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.userdata.userInfo.uid == item.val().adminid) {
          arr.push({ ...item.val(), gid: item.key });
        }
      });
      setGlist(arr);
    });
  }, []);

  let handleDeleteGR = (id) => {
    remove(ref(db, "grouprequest/" + id)).then(() => {
      toast("removed!");
    });
  };

  // let handleAcceptGR = (item) => {
  //   set(push(ref(db, "Members")), {
  //     ...item.val(),
  //     id: item.key,
  //   }).then((id) => {
  //     remove(ref(db, "grouprequest/" + id)).then(() => {
  //       toast("removed!");
  //     });
  //   });
  // };

  return (
    <>
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
      <div className="grouplistholder">
        <div className="titleholder">
          <h3>My Groups</h3>
        </div>

        <div className="boxholder">
          {glist.length > 0 ? (
            glist.map((item) => (
              <div className="box">
                <div className="boximgholder">
                  <img src="assets/profile.png" />
                </div>
                <div className="title">
                  <p>{item.adminname}</p>
                  <h3>{item.groupname}</h3>
                  <p>{item.grouptag}</p>
                </div>
                <div>
                  <button className="boxbtn">info</button>
                  <button
                    onClick={() => handleOpen(item.gid)}
                    className="boxbtn"
                  >
                    MR
                  </button>
                </div>
              </div>
            ))
          ) : (
            <Alert style={{ marginTop: "20px" }} severity="info">
              No Groups!
            </Alert>
          )}
        </div>
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Member Request
              </Typography>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                {grlist.length > 0 ? (
                  grlist.map((item) => (
                    <>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar
                            alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={item.username}
                          secondary={
                            <React.Fragment>
                              <Typography
                                sx={{ display: "inline" }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {item.username}
                              </Typography>
                              {" — wants to join your group."}
                            </React.Fragment>
                          }
                        />
                        <Button variant="outlined">Accept</Button>
                        <IconButton
                          onClick={() => handleDeleteGR(item.did)}
                          aria-label="delete"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItem>

                      <Divider variant="inset" component="li" />
                    </>
                  ))
                ) : (
                  <Alert severity="info">No Request here!</Alert>
                )}
              </List>
            </Box>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default MyGroups;
