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
  return (
    <div className="grouplistholder">
      <div className="titleholder">
        <h3>Friends</h3>
      </div>

      <div className="boxholder">
        {friends.map((item) => (
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
              <button className="boxbtn">Block</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Friends;
