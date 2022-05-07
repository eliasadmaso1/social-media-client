import React, { useContext } from "react";
import "./TopBar.css";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { AuthContext } from "../Context/Auth-context";
import { Link } from "react-router-dom";

function TopBar({ inHome }) {
  const { user } = useContext(AuthContext);

  const logOut = () => {
    localStorage.setItem("user", null);
    window.location.reload();
  };

  return (
    <div className="topBarContainer">
      <div className="topBarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Social Media</span>
        </Link>
      </div>
      <div className="topBarCenter">
        <div className="searchBar">
          <SearchIcon className="searchIcon" />
          <input placeholder="Search" className="searchInput" />
        </div>
      </div>
      <div className="topBarRight">
        <div className="topBarLinks">
          <Link to="/edit" style={{ textDecoration: "none", color: "white" }}>
            <span className="topBarLink">Settings</span>
          </Link>
          {inHome ? (
            <span className="topBarLink" onClick={logOut}>
              Log out
            </span>
          ) : null}
        </div>
        <div className="topBarIcons">
          <div className="topbarIconItem">
            <PersonIcon />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <ChatIcon />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <NotificationsIcon />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? user.profilePicture
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
            }
            className="topBarImage"
          />
        </Link>
      </div>
    </div>
  );
}

export default TopBar;
