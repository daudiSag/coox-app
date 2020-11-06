import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { RiUserStarFill} from 'react-icons/ri';
import { FaUsers } from 'react-icons/fa';
import { IoIosTime } from 'react-icons/io';
import { CgPlayListAdd } from 'react-icons/cg';
import { HiChatAlt2 } from 'react-icons/hi';


let image;

const UserProfile = () => {
    const [user, setUser] = useState({
          username: 'daudiCoox',
             email: 'daudi.sagala@gmail.com',
         createdAt: '14days',
         userImage: ''
    });

    if (user.userImage) {

        image = <img src={user.userImage} className="user-image" alt="User Image" />

    } else {

        image = <FaUserCircle />  //no image

    }

    return (
        <div className="user-profile">
            <div className="user-image">
                {image}
            </div>
            <div className="user-profile-info">
                <div className="user-profile-name">@{user.username}</div>
                <div className="user-profile-joined"><IoIosTime /> <b>Joined {user.createdAt}</b></div>
                <div className="user-profile-posts"><CgPlayListAdd /> <b>28 Posts</b></div>
                <div className="user-profile-fans"><FaUsers /> <b>13283 Fans</b></div>
                <div className="user-profile-faves"><RiUserStarFill /> <b>127 Faves</b></div>
                <div className="user-profile-messages"><HiChatAlt2 /> <b>847 Messages</b>
                    <div className="un-read">12 New!</div>
                </div>
               
            </div>
        </div>
    );

}
    
    export default UserProfile;