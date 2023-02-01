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
import Alert from "@mui/material/Alert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Friends = () => {
  const db = getDatabase();
  let [friends, setFriends] = useState([]);
  let data = useSelector((state) => state);
  console.log(data.userdata.userInfo.uid);

  useEffect(() => {
    const starCountRef = ref(db, "friends");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          data.userdata.userInfo.uid == item.val().receiverid ||
          data.userdata.userInfo.uid == item.val().senderid
        ) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setFriends(arr);
    });
  }, []);

  let handleBlock = (item) => {
    data.userdata.userInfo.uid == item.senderid
      ? set(push(ref(db, "block")), {
          block: item.receivername,
          blockid: item.receiverid,
          blockby: item.sendername,
          blockbyid: item.senderid,
        }).then(() => {
          remove(ref(db, "friends/" + item.id)).then(() => {
            toast("User Blocked");
          });
        })
      : set(push(ref(db, "block")), {
          block: item.sendername,
          blockid: item.senderid,
          blockby: item.receivername,
          blockbyid: item.receiverid,
        }).then(() => {
          remove(ref(db, "friends/" + item.id)).then(() => {
            toast("User Blocked");
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
          <h3>Friends</h3>
        </div>

        <div className="boxholder">
          {friends.length > 0 ? (
            friends.map((item) => (
              <div className="box">
                <div className="boximgholder">
                  <img src="assets/profile.png" />
                </div>
                <div className="title">
                  {data.userdata.userInfo.uid == item.senderid ? (
                    <h3>{item.receivername}</h3>
                  ) : (
                    <h3>{item.sendername}</h3>
                  )}
                  <p>{item.Date}</p>
                </div>
                <div>
                  <button onClick={() => handleBlock(item)} className="boxbtn">
                    Block
                  </button>
                </div>
              </div>
            ))
          ) : (
            <Alert style={{ marginTop: "20px" }} severity="info">
              No Friends!
            </Alert>
          )}
        </div>
      </div>
    </>
  );
};

export default Friends;
