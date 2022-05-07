import React, { useContext, useEffect, useState } from "react";
import Post from "../Post-Component/Post";
import Share from "../Share/Share";
import "./Feed.css";
import axios from "axios";
import { AuthContext } from "../Context/Auth-context";
import {server_url} from '../../utils';

function Feed({ username,margin }) {
  const { user } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get(`${server_url}posts/profile/${username}`)
        : await axios.get(`${server_url}posts/feed/${user._id}`);

      setPosts(
        res.data.sort((post1, post2) => {
          return new Date(post2.createdAt) - new Date(post1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [user._id, username]);
  return (
    <div className="feedContainer">
      <div className="feedWrapper" style={{marginLeft:margin}}>
        {(!username || username === user.username) && <Share />}

        {posts.map((post) => {
          return <Post post={post} key={post._id} />;
        })}
      </div>
    </div>
  );
}

export default Feed;
