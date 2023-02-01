import React, { useState, useEffect } from "react";
import {
  getDatabase,
  ref,
  onValue,
  set,
  remove,
  push,
} from "firebase/database";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Alert from "@mui/material/Alert";

const Blockedusers = () => {
  const db = getDatabase();
  let [blocklist, setBlocklist] = useState([]);
  let data = useSelector((state) => state);
  console.log(data.userdata.userInfo.uid);

  useEffect(() => {
    const starCountRef = ref(db, "block");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().blockbyid == data.userdata.userInfo.uid) {
          arr.push({
            id: item.key,
            block: item.val().block,
            blockid: item.val().blockid,
          });
        } else if (item.val().blockid == data.userdata.userInfo) {
          arr.push({
            id: item.key,
            blockby: item.val().blockby,
            blockbyid: item.val().blockbyid,
          });
        }
      });
      setBlocklist(arr);
    });
  }, []);

  let handleUnblock = (item) => {
    set(push(ref(db, "friends")), {
      sendername: data.userdata.userInfo.displayName,
      senderid: data.userdata.userInfo.uid,
      receivername: item.block,
      receiverid: item.blockid,
    }).then(() => {
      remove(ref(db, "block/" + item.id)).then(() => {
        toast("User UnBlocked");
      });
    });
  };
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
          <h3>Block list</h3>
        </div>

        <div className="boxholder">
          {blocklist.length > 0 ? (
            blocklist.map((item) => (
              <div className="box">
                <div className="boximgholder">
                  <img src="assets/profile.png" />
                </div>
                <div className="title">
                  {item.block ? <h3>{item.block}</h3> : <h3>{item.blockby}</h3>}
                  <p>Hi Guys, Wassup!</p>
                </div>
                <div>
                  <button
                    onClick={() => handleUnblock(item)}
                    className="boxbtn"
                  >
                    Unblock
                  </button>
                </div>
              </div>
            ))
          ) : (
            <Alert style={{ marginTop: "20px" }} severity="info">
              No Blocked User!
            </Alert>
          )}
        </div>
      </div>
    </>
  );
};

export default Blockedusers;
