import React, { useContext } from "react";
import "./Profile.css";
import SideBar from "../../Components/SideBar/SideBar";
import TopBar from "../../Components/TopBar/TopBar";
import Feed from "../../Components/Feed/Feed";
import { useState, useEffect } from "react";
import axios from "axios";
import Rightbar from "../../Components/RightBar/RightBar";
import { AuthContext } from "../../Components/Context/Auth-context";
import { useParams } from "react-router";

function Profile() {
  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:8800/users?username=${username}`
      );
      setUser(res.data);
      console.log(res.data);
    };

    fetchUser();
  }, [username]);

  return (
    <div className="profileBody">
      <TopBar  inHome={false}/>
      <div className="profile">
        <SideBar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src={
                  user.coverPicture
                    ? user.coverPicture
                    : "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_1200,h_600/https://blog.snappa.com/wp-content/uploads/2022/01/facebook-cover-photo-size.jpg"
                }
                className="profileCoverImg"
              />
              <img
                src={
                  user.profilePicture
                    ? user.profilePicture
                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                }
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} margin="100px"/>

            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
