import React, { useEffect, useState } from "react";
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

const Friendrequest = () => {
  const db = getDatabase();
  let [freq, setFreq] = useState([]);
  let data = useSelector((state) => state);
  // console.log(data.userdata.userInfo.uid);

  useEffect(() => {
    const starCountRef = ref(db, "friendrequest");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().receiverid == data.userdata.userInfo.uid) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setFreq(arr);
    });
  }, []);

  let handleReject = (item) => {
    remove(ref(db, "friendrequest/" + item.id)).then(() => {
      toast("Friend Request rejected");
    });
  };
  let handleAccept = (item) => {
    set(push(ref(db, "friends")), {
      ...item,
      Date: `${new Date().getDate()}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()}`,
    }).then(() => {
      remove(ref(db, "friendrequest/" + item.id)).then(() => {
        toast("Friend Request Accepted");
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
          <h3>Friend request</h3>
        </div>
        <div className="boxholder">
          {freq.length > 0 ? (
            freq.map((item) => (
              <div className="box">
                <div className="boximgholder">
                  <img src="assets/profile.png" />
                </div>
                <div className="title">
                  <h3>{item.sendername}</h3>
                  <p>Hi Guys, Wassup!</p>
                </div>
                <div>
                  <button onClick={() => handleAccept(item)} className="boxbtn">
                    Accept
                  </button>
                  <button onClick={() => handleReject(item)} className="boxbtn">
                    Reject
                  </button>
                </div>
              </div>
            ))
          ) : (
            <Alert style={{ marginTop: "20px" }} severity="info">
              No Friend Request!
            </Alert>
          )}
        </div>
      </div>
    </>
  );
};

export default Friendrequest;
