import React, { useContext, useRef, useState } from "react";
import "./Share.css";
import PermMediaOutlinedIcon from "@mui/icons-material/PermMediaOutlined";
import LabelIcon from "@mui/icons-material/Label";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { AuthContext } from "../Context/Auth-context";
import axios from "axios";
import CancelIcon from "@mui/icons-material/Cancel";
import {server_url} from '../../utils';


function Share() {
  const [file, setFile] = useState(null);

  const { user } = useContext(AuthContext);

  const desc = useRef();

  const sharePost = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = file.name;
      data.append("file", file);
      data.append("name", fileName);
      newPost.img = fileName;
      try {
        await axios.post(`${server_url}upload`, data);
      } catch (error) {
        console.log(error);
      }
    }

    try {
      await axios.post(`${server_url}posts`, newPost);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="shareContainer">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImage"
            src={
              user.profilePicture
                ? user.profilePicture
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
            }
          />
          <input
            ref={desc}
            className="shareInput"
            placeholder={`What's is in your mind ${user?.username}?`}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} />
            <CancelIcon
              className="shareCancelImg"
              onClick={() => {
                setFile(null);
              }}
            />
          </div>
        )}
        <form className="shareBottom" onSubmit={sharePost}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMediaOutlinedIcon className="shareIcon" htmlColor="tomato" />
              <span className="shareOptionText">Photo/Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png, .jpeg, .jpg"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            </label>
            <div className="shareOption">
              <LabelIcon className="shareIcon" htmlColor="#3366ff" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <LocationOnIcon className="shareIcon" htmlColor="green" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotionsIcon className="shareIcon" htmlColor="goldenrod" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}

export default Share;
