import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa';
import { CgPlayListAdd } from 'react-icons/cg';

const PopularCooks = () => {
    const [cooks, setCooks] = useState([
            {
            username: 'klingonian',
            userImage: '',
            fans: '238K',
            posts: '6.7K',
            },
            {
            username: 'daudiCoox',
            userImage: '',
            fans: '122K',
            posts: '7K',

            },
            {
            username: 'misterRich',
            userImage: '',
            fans: '10.5K',
            posts: '2.9K',
            },
            {
                username: 'RealRamsey',
                userImage: '',
                fans: '1.01M',
                posts: '13.7K',
            },

    ]);

    return (
        <div className="popular-cooks-list">
            <h3 className="popular-cooks-title">Popular Cooks</h3>
            {cooks.map(cook => (
                <div className="popular-cook">
                    <div className="cook-image">
                        <FaUserCircle />
                     </div>   
                    <div className="cook-info">
                        <div className="user-name">@{cook.username}</div>
                         <div className="fans-posts-div">
                            <div className="user-posts"><CgPlayListAdd /> <b>{cook.posts} Posts</b></div>
                            <div className="user-fans"><FaUsers /> <b>{cook.fans} Fans</b></div>
                        </div>
                    </div>
                    <div className="follow">
                        <Button href="#" className="follow-button" variant="outline-primary" size="lg">Follow</Button>
                    </div>
                </div>
            ))}
            <div className="show-more">
                <a href="#">Show more</a>
            </div>
        </div>
    );

}

export default PopularCooks;