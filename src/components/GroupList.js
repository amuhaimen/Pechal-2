import React, { useState, useEffect } from "react";
//Modal start
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
//modal end
import TextField from "@mui/material/TextField";
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const GroupList = () => {
  //modal start
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //modal end

  let [gname, setGname] = useState("");
  let [gtag, setGtag] = useState("");
  let [glist, setGlist] = useState([]);

  const db = getDatabase();

  let data = useSelector((state) => state);
  let handleCreateGroup = () => {
    console.log("clicked");
    set(push(ref(db, "groups")), {
      groupname: gname,
      grouptag: gtag,
      adminid: data.userdata.userInfo.uid,
      adminname: data.userdata.userInfo.displayName,
    }).then(() => {
      setOpen(false);
      toast("Successfully group created");
    });
  };

  useEffect(() => {
    const starCountRef = ref(db, "groups");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.userdata.userInfo.uid != item.val().adminid) {
          arr.push({ ...item.val(), gid: item.key });
        }
      });
      setGlist(arr);
    });
  }, []);

  let handleGroupJoin = (item) => {
    set(push(ref(db, "grouprequest")), {
      groupid: item.gid,
      groupname: item.groupname,
      userid: data.userdata.userInfo.uid,
      username: data.userdata.userInfo.displayName,
    }).then(() => {
      console.log("request sent");
    });
  };

  return (
    <div className="grouplistholder">
      <div className="titleholder">
        <h3>Group List</h3>
        <button onClick={handleOpen}>create group</button>
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
                <button
                  onClick={() => handleGroupJoin(item)}
                  className="boxbtn"
                >
                  Join
                </button>
              </div>
            </div>
          ))
        ) : (
          <h1>no groups here</h1>
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
              Create Group
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField
                onChange={(e) => setGname(e.target.value)}
                style={{ marginBottom: "10px" }}
                id="outlined-basic"
                label="Group Name"
                variant="outlined"
              />
              <br />
              <TextField
                onChange={(e) => setGtag(e.target.value)}
                id="outlined-basic"
                label="Group Tag"
                variant="outlined"
              />
              <br />
              <Button
                onClick={handleCreateGroup}
                style={{ marginTop: "10px" }}
                variant="contained"
              >
                Create Group
              </Button>
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default GroupList;
