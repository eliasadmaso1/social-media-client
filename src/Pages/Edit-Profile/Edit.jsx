import React, { useContext, useEffect, useState } from "react";
import "./Edit.css";
import { useRef } from "react";
import { updateUser } from "../../Components/Service/user-service";
import { AuthContext } from "../../Components/Context/Auth-context";
import TopBar from "../../Components/TopBar/TopBar";
import PermMediaOutlinedIcon from "@mui/icons-material/PermMediaOutlined";
import axios from 'axios';

function Edit() {
  const { user, dispatch } = useContext(AuthContext);

  const username = useRef();
  const from = useRef();
  const city = useRef();
  const relationship = useRef();

  const [profileImg, setProfileImg] = useState("");
  const [coverImg, setCoverImg] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (coverImg && profileImg) {
        const profile = new FormData();
        const profileImgName = profileImg.name;
        profile.append("file", profileImg);
        profile.append("name", profileImgName);

        const cover = new FormData();
        const coverImgName = coverImg.name;
        cover.append("file", coverImg);
        cover.append("name", coverImgName);
        try {
          await axios.post("http://localhost:8800/upload", profile);
          await axios.post("http://localhost:8800/upload", cover);
        } catch (error) {
          console.log(error);
        }
        const pName = `http://localhost:8800/images/${profileImgName}`;
        const cName = `http://localhost:8800/images/${coverImgName}`;

        await updateUser(
          user._id,
          username.current.value,
          from.current.value,
          city.current.value,
          relationship.current.value,
          pName,
          cName,
          dispatch
        );
      }
      else if(coverImg){
       
          const profile = new FormData();
          const profileImgName = profileImg.name;
          profile.append("file", profileImg);
          profile.append("name", profileImgName);
  
          const cover = new FormData();
          const coverImgName = coverImg.name;
          cover.append("file", coverImg);
          cover.append("name", coverImgName);
  
          await updateUser(
            user._id,
            username.current.value,
            from.current.value,
            city.current.value,
            relationship.current.value,
            profileImgName,
            coverImgName,
            dispatch
          );
      }
      else if(profileImg){
       
        const profile = new FormData();
        const profileImgName = profileImg.name;
        profile.append("file", profileImg);
        profile.append("name", profileImgName);

        const cover = new FormData();
        const coverImgName = coverImg.name;
        cover.append("file", coverImg);
        cover.append("name", coverImgName);

        await updateUser(
          user._id,
          username.current.value,
          from.current.value,
          city.current.value,
          relationship.current.value,
          profileImgName,
          coverImgName,
          dispatch
        );
    }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <TopBar />
      <div className="editContainer">
        <div className="userDetails-div">
          <div className="userDetails">
            <div className="details">Your details </div>
            <span>User Name - {user.username ? user.username : "none"}</span>

            <span>From - {user.from ? user.from : "none"}</span>
            <span>City - {user.city ? user.city : "none"}</span>
            <span>
              Relationship - {user.relationship ? user.relationship : "none"}
            </span>
            <img
              className="userImg"
              src={
                user.profilePicture
                  ? user.profilePicture
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
              }
            />
          </div>
        </div>
        <div className="formEdit-div">
          <div className="formEdit">
            <form id="form" className="form">
              <h2>Update Your Details</h2>
              <div className="form-control">
                <label for="username">Username</label>
                <input
                  type="text"
                  placeholder="Enter username"
                  ref={username}
                />
              </div>
              <div className="form-control">
                <label for="from">From</label>
                <input type="text" placeholder="Enter Country" ref={from} />
              </div>
              <div className="form-control">
                <label for="city">City</label>
                <input type="text" placeholder="Enter City" ref={city} />
              </div>
              <div className="form-control">
                <label for="relationship">Relationship</label>
                <input
                  type="text"
                  placeholder="Enter Relationship"
                  ref={relationship}
                />
              </div>
              <div className="form-control">
                <label htmlFor="file1" className="shareOption">
                  <PermMediaOutlinedIcon
                    className="shareIcon"
                    htmlColor="black"
                  />
                  <span className="shareOptionText">Profile Picture</span>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    id="file1"
                    accept=".png, .jpeg, .jpg"
                    onChange={(e) => {
                      setProfileImg(e.target.files[0]);
                    }}
                  />
                </label>
              </div>
              <div className="form-control">
                <label htmlFor="file2" className="shareOption">
                  <PermMediaOutlinedIcon
                    className="shareIcon"
                    htmlColor="black"
                  />
                  <span className="shareOptionText">Cover Picture</span>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    id="file2"
                    accept=".png, .jpeg, .jpg"
                    onChange={(e) => {
                      setCoverImg(e.target.files[0]);
                    }}
                  />
                </label>
              </div>
              <button className="auth-btn" onClick={handleClick}>
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Edit;
