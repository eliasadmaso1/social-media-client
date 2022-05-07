import React, { useContext, useEffect, useState } from "react";
import "./SideBar.css";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import PlayCircleFilledOutlinedIcon from "@mui/icons-material/PlayCircleFilledOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import InsertInvitationOutlinedIcon from "@mui/icons-material/InsertInvitationOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import Friends from "../Friends/Friends";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/Auth-context";
import {server_url} from '../../utils';


function SideBar() {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(`${server_url}users/all`);
      const result = res.data.filter((item) => {
        return item._id !== user._id;
      });
      setUsers(result);
    };
    fetchUsers();
  }, []);
  return (
    <div className="sideBarContainer">
      <div className="sideBarWrapper">
        <ul className="sideBarList">
          <li className="sideBarListItem">
            <RssFeedIcon className="sideBarIcon" />
            <span className="sideBarListItemText">Feed</span>
          </li>
          <li className="sideBarListItem">
            <ChatOutlinedIcon className="sideBarIcon" />
            <span className="sideBarListItemText">Chats</span>
          </li>
          <li className="sideBarListItem">
            <PlayCircleFilledOutlinedIcon className="sideBarIcon" />
            <span className="sideBarListItemText">Videos</span>
          </li>
          <li className="sideBarListItem">
            <GroupOutlinedIcon className="sideBarIcon" />
            <span className="sideBarListItemText">Groups</span>
          </li>
          <li className="sideBarListItem">
            <BookmarkOutlinedIcon className="sideBarIcon" />
            <span className="sideBarListItemText">BookMarks</span>
          </li>
          <li className="sideBarListItem">
            <HelpOutlineOutlinedIcon className="sideBarIcon" />

            <span className="sideBarListItemText">Questions</span>
          </li>
          <li className="sideBarListItem">
            <WorkOutlineOutlinedIcon className="sideBarIcon" />

            <span className="sideBarListItemText">Jobs</span>
          </li>
          <li className="sideBarListItem">
            <InsertInvitationOutlinedIcon className="sideBarIcon" />

            <span className="sideBarListItemText">Events</span>
          </li>
          <li className="sideBarListItem">
            <SchoolOutlinedIcon className="sideBarIcon" />

            <span className="sideBarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sideBarButton">Show More</button>
        <hr className="sidebarHr" />
        <ul className="sidbarFriendsList">
          {users.map((user) => {
            return (
              <Link
                to={`/profile/${user.username}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <Friends user={user} key={user._id} />
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
