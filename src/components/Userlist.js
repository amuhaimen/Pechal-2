import React, { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  onValue,
  push,
  set,
  remove,
} from "firebase/database";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Userlist = () => {
  let db = getDatabase();

  let [userlist, setUserlist] = useState([]);
  let [freq, setFreq] = useState([]);
  let [friends, setFriends] = useState([]);
  let [cancel, setCancel] = useState([]);
  let data = useSelector((state) => state);
  // console.log(data.userdata.userInfo.uid);

  useEffect(() => {
    const userRef = ref(db, "users");
    onValue(userRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.userdata.userInfo.uid != item.key) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setUserlist(arr);
    });
  }, []);
  //cancel part start=======================
  useEffect(() => {
    const userRef = ref(db, "friendrequest");
    onValue(userRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), id: item.key });
      });
      setCancel(arr);
    });
  }, []);
  //cancel part end============================

  //friends part start============================
  useEffect(() => {
    const userRef = ref(db, "friends");
    onValue(userRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().receiverid + item.val().senderid);
      });
      setFriends(arr);
    });
  }, []);
  //friends part end=====================

  //friendrequest part start=======================
  useEffect(() => {
    const userRef = ref(db, "friendrequest");
    onValue(userRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().receiverid + item.val().senderid);
      });
      setFreq(arr);
    });
  }, []);
  //friendrequest part start=======================

  //friendreques part start=====================
  let handleFriendRequest = (info) => {
    set(push(ref(db, "friendrequest")), {
      sendername: data.userdata.userInfo.displayName,
      senderid: data.userdata.userInfo.uid,
      receivername: info.displayName,
      receiverid: info.id,
    }).then(() => {
      toast("Request sent");
    });
  };
  //friendreques part end=====================

  //Cancel friendrequest part start=====================
  //********************eta valovabe bujte pari nay*********************
  let handleCancelRequest = (item) => {
    cancel.map((cancel) => {
      if (item.id === cancel.receiverid) {
        remove(ref(db, "friendrequest/" + cancel.id)).then(() => {
          toast("Friend Request Canceled");
        });
      }
    });
  };
  //Cancel friendrequest part end=====================

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
          <h3>User list</h3>
        </div>

        <div className="boxholder">
          {userlist.map((item) => (
            <div className="box">
              <div className="boximgholder">
                <img src="assets/profile.png" />
              </div>
              <div className="title">
                <h3>{item.displayName}</h3>
                <p>{item.email}</p>
              </div>
              <div>
                {friends.includes(item.id + data.userdata.userInfo.uid) ||
                friends.includes(data.userdata.userInfo.uid + item.id) ? (
                  <button className="boxbtn">Friend</button>
                ) : freq.includes(item.id + data.userdata.userInfo.uid) ||
                  freq.includes(data.userdata.userInfo.uid + item.id) ? (
                  <>
                    <button className="boxbtn">Pending</button>
                    <button
                      onClick={() => handleCancelRequest(item)}
                      className="boxbtn"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleFriendRequest(item)}
                    className="boxbtn"
                  >
                    Send request
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Userlist;
