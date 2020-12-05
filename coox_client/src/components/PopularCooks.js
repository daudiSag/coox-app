import React, { useState, useEffect } from 'react';
import axios from "axios"; //for api requests
import authHeader from '../api_services/authHeader.js';
import { Button } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa';
import { FaUserAltSlash } from 'react-icons/fa';
import { BsFillHeartFill } from 'react-icons/bs';


const API_URL = "http://localhost:3005/";  //api url for getting user data

let usrname;
if ('username' in localStorage) {
    usrname = localStorage.getItem('username');
} else {
    usrname = '';
}

const PopularCooks = () => {
    const [cooks, setCooks] = useState([]);

    useEffect(() => {
        axios.get(API_URL + 'popularUsers', { headers: authHeader(), params: { username: usrname } }).then(response => {
            // console.log(response.data);

            setCooks(response.data);

        }).catch(error => {
            console.log(error);
        });

    });

    const FollowStatus = (props) => {
        if (props.fave) {

            function unfollow() {
                let faveId = props.username;
                let fanId = usrname;

                axios.put(API_URL + "fans",
                    {
                        faveId,
                        fanId
                    },
                    { headers: authHeader() })
                    .then(response => {
                        return response.data;
                    });

            }

            return (
                <div className="follow">
                    <Button onClick={unfollow} href="#" className="follow-button" variant="outline-primary" size="lg">Unfollow</Button>
                </div>
            );

        } else {
            function follow() {
                let faveId = props.username;
                let fanId = usrname;

                axios.post(API_URL + "fans", {
                    faveId: faveId,
                    fanId: fanId,
                }, { headers: authHeader() })
                    .then(response => {
                        return response.data;
                    });
            }

            return (
                <div className="follow">
                    <Button onClick={follow} href="#" className="follow-button" variant="outline-primary" size="lg">Follow</Button>
                </div>
            );

        }
    }



    // console.log(cooks);

    if (cooks.length > 0) {

        return (
            <div className="popular-cooks-list">
                <h3 className="popular-cooks-title">Popular Cooks</h3>
                {cooks.map(cook => (
                    <div className="popular-cook">
                        <div className="cook-image">
                            <FaUserCircle />
                        </div>
                        <div className="cook-info">
                            <div className="user-name">@{cook.user}</div>
                            <div className="fans-posts-div">
                                <div className="user-posts"><BsFillHeartFill /> <b>{cook.postLikes} Posts</b></div>
                                <div className="user-fans"><FaUsers /> <b>{cook.fans} Fans</b></div>
                            </div>
                        </div>
                        <FollowStatus username={cook.username} fave={cook.fave} />
                    </div>
                ))}
            </div>
        );

    } else {

        return (
            <div className="popular-cooks-list">
                <h3 className="popular-cooks-title">Popular Cooks</h3>
                <div className="popular-cooks-empty">
                    <div>
                        <FaUserAltSlash className="empty-icon" />
                        <p>
                            No Popular Cooks Yet...
                    </p>
                    </div>
                </div>
            </div>
         );
   }

}

export default PopularCooks;