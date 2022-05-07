import React from 'react';
import './Friends.css';

function Friends({user}) {
    return (
        <li className="sidebarFriend">
        <img className="sidebarFriendImage" src={user.profilePicture}/>
        <span className="sidebarFriendName">{user.username}</span>
    </li>
    )
}

export default Friends
