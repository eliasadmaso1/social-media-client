import React, { useContext, useEffect, useState } from "react";
import "./Post.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from 'axios';
import {format} from 'timeago.js';
import {Link} from 'react-router-dom';
import { AuthContext } from "../Context/Auth-context";


function Post({ post }) {

  const PF = process.env.PUBLIC_FOLDER;


  const {user:currentUser} = useContext(AuthContext);

  const [user,setUser] = useState({})

  useEffect(()=>{
    const fetchUser = async()=>{
      const res = await axios.get(`http://localhost:8800/users?userId=${post.userId}`);
      setUser(res.data)

    }

  fetchUser()

  },[]);

  useEffect(()=>{
    setIsLiked(post.likes.includes(currentUser._id))

  },[post.likes])

    const [like,setLike] = useState(post.likes.length);
    const [isLiked,setIsLiked] = useState(false);

    const likeHandler = async()=>{
      try{
        await axios.put(`http://localhost:8800/posts/like/${post._id}`,{userId:currentUser._id})

      }
      catch(error){
        console.log(error);
      }

        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    }
  return (
    <div className="postContainer">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
           <Link to={`profile/${user.username}`}> <img
              src={user.profilePicture ? user.profilePicture : "https://www.omyoga.co.il/wp-content/themes/hello-elementor/img/no-avatar.png"}
              className="postProfileImage"
            />
            </Link>
            <span className="postUserName">
              {user.username}
            </span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVertIcon />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.desc}</span>
          <img src={`http://localhost:8800/images/${post.img}`} className="postImage" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <ThumbUpAltIcon className="likeIcon" htmlColor="#3366ff" onClick={likeHandler}/>
            <FavoriteIcon className="likeIcon" htmlColor="red" onClick={likeHandler}/>
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <div className="postCommentText">{post.comment} comments</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
