import React from "react";
import "./Online.css";

function Online({user}) {
  return (
    <li className="rightBarFriend">
      <div className="rightBarProfileImgContainer">
        <img
          src={user.profilePicture}
          className="rightBarProfileImg"
        />
        <span className="rightBarOnline"></span>
      </div>
      <span className="rightBarUserName">{user.userName}</span>
    </li>
  );
}

export default Online;
