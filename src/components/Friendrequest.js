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

const Friendrequest = () => {
  const db = getDatabase();
  let [freq, setFreq] = useState([]);
  let data = useSelector((state) => state);
  console.log(data.userdata.userInfo.uid);

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

  let handleDeleteFriendRequest = (friendRequest) => {
    remove(ref(db, "friendrequest/" + friendRequest.id)).then(() => {
      console.log("successfully deleted");
    });
  };
  let handleAcceptFriendRequest = (friendRequest) => {
    set(push(ref(db, "friends")), {
      ...friendRequest,
      Date: `${new Date().getDate()}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()}`,
    }).then(() => {
      remove(ref(db, "friendrequest/" + friendRequest.id)).then(() => {
        console.log("Friend request accepted");
      });
    });
  };
  return (
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
                <button
                  onClick={() => handleAcceptFriendRequest(item)}
                  className="boxbtn"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleDeleteFriendRequest(item)}
                  className="boxbtn"
                >
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
  );
};

export default Friendrequest;
