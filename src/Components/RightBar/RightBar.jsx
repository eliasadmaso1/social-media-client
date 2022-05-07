import "./RightBar.css";
import Online from "../Online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/Auth-context";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function Rightbar({ user }) {
  const { user: currentUser, dispatch } = useContext(AuthContext);

  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [followed, setFollowed] = useState(null);

  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?._id));
  }, [user?._id, currentUser]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendsList = await axios.get(
          `http://localhost:8800/users/friends/${user._id}`
        );

        setFriends(friendsList.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, [user]);

  useEffect(() => {
    const getOnlineFriends = async () => {
      try {
        const onlineFriendsRes = await axios.get(
          `http://localhost:8800/users/friends/${currentUser._id}`
        );
        setOnlineFriends(onlineFriendsRes.data);
      } catch (error) {
        console.log(error);
      }
    };
    getOnlineFriends();
  }, [currentUser]);

  const updateUserFollowings = async () => {
    try {
      if (followed) {
        await axios.put(`http://localhost:8800/users/unfollow/${user._id}`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`http://localhost:8800/users/follow/${user._id}`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
      console.log(err);
    }
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <CardGiftcardIcon className="birthdayImg" htmlColor="orange" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img
          className="rightbarAd"
          src="https://dlq00ggnjruqn.cloudfront.net/prometheus/getImage?id=268303"
          alt=""
          width="400"
        />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {onlineFriends.map((friend) => {
            return <Online key={friend._id} user={friend} />;
          })}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button
            className="rightbarFollowButton"
            onClick={updateUserFollowings}
          >
            {followed ? "Unfollow" : "Follow"}
            {followed ? <RemoveIcon /> : <AddIcon />}
          </button>
        )}

        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">
              {user.city ? user.city : "add city"}
            </span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">
              {user.from ? user.from : "add location"}
            </span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship ? user.relationship : "add relationship"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>

        <div className="rightbarFollowings">
          {friends.length === 0 && (
            <div className="rightbarFollowing" style={{ color: "gray" }}>
              {" "}
              dont have friends
            </div>
          )}
          {friends.map((friend) => {
            return (
              <Link
                to={`/profile/${friend.username}`}
                style={{ textDecoration: "none" }}
              >
                <div className="rightbarFollowing">
                  <img
                    src={
                      friend.profilePicture
                        ? friend.profilePicture
                        : "https://www.omyoga.co.il/wp-content/themes/hello-elementor/img/no-avatar.png"
                    }
                    alt=""
                    className="rightbarFollowingImg"
                  />
                  <span className="rightbarFollowingName">
                    {friend.username}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </>
    );
  };
  return (
    <div className="rightBarContainer">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
