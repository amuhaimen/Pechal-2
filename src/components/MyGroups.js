import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

//Modal start
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
//modal end

//list in MUI start

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
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
          arr.push(item.val());
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

  return (
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
                <button onClick={() => handleOpen(item.gid)} className="boxbtn">
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
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              {grlist.map((item) => (
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
                          {" — wants to be your group member"}
                        </React.Fragment>
                      }
                    />
                  </ListItem>

                  <Divider variant="inset" component="li" />
                </>
              ))}
            </List>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default MyGroups;
