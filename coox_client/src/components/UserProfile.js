import React, { useState, useEffect } from 'react';
import axios from "axios"; //for api requests
import authHeader from '../api_services/authHeader.js';
import { FaUserCircle } from 'react-icons/fa';
import { RiUserStarFill} from 'react-icons/ri';
import { FaUsers } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import { IoIosTime } from 'react-icons/io';
import { CgPlayListAdd } from 'react-icons/cg';
import { HiChatAlt2 } from 'react-icons/hi';
import Moment from 'react-moment';

const API_URL = "http://localhost:3005/";  //api url for getting user data

let usrname;
if ('username' in localStorage) {
    usrname = localStorage.getItem('username');
} else {
    usrname = '';
}


const UserProfile = () => {
    const [user, setUser] = useState('');
    const [postsCount, setPostsCount] = useState(0);
    const [fansCount, setFansCount] = useState(0);
    const [favesCount, setFavesCount] = useState(0);

    useEffect(() => {

        axios.get(API_URL + 'userItem', { headers: authHeader(), params: {username: usrname}}).then(response => {
            // console.log(response.data);
            
            setUser(response.data);

        }).catch(error => {
            console.log(error);
        });

        //get postsCount  //getFansCount //getFavesCount
        axios.get(API_URL + 'userData', { headers: authHeader(), params: { username: usrname } }).then(response => {
            // console.log(response.data);
            setPostsCount(response.data.postsCount);
            setFansCount(response.data.fansCount);
            setFavesCount(response.data.favesCount);

        }).catch(error => {
            console.log(error);
        });

    });

    function editProfile() {
        let userId = user._id;
        window.location.assign(`/editProfile/?userId=${userId}`);

    }

    //     // eslint-disable-next-line jsx-a11y/img-redundant-alt
    //     image = <img src={user.userImage} className="user-image" alt="User Image" />
       

    const UserImage = () => {
        if (user.customData) {
            if (user.customData.imageUrl) {
                // eslint-disable-next-line jsx-a11y/img-redundant-alt
                return <img src={user.customData.imageUrl} className="user-image" alt="User Image" />

            } else {

                return <FaUserCircle className="user-image-icon" />  //no image

            }
        } else {

            return <FaUserCircle className="user-image-icon" />  //no image

        }

    }


    // console.log(user.customData);
    return (
        <div className="user-profile">
            <div><UserImage /></div>
            <div className="user-profile-info">
                <div className="user-profile-name">@{user.user}</div>
                <div className="user-profile-joined"><b>Joined <Moment fromNow>{user.createdAt}</Moment></b></div>
                <div className="user-profile-posts"><CgPlayListAdd /> <b>{postsCount} Posts</b></div>
                <div className="user-profile-fans"><FaUsers /> <b>{fansCount} Fans</b></div>
                <div className="user-profile-faves"><RiUserStarFill /> <b>{favesCount} Faves</b></div>
            </div>
            <div className="edit-profile">
                <Button onClick={editProfile} href="#" className="edit-profile-button" variant="outline-primary" >Edit Profile</Button>
            </div>
        </div>
    );

}
    
    export default UserProfile;