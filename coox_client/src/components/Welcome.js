import welcomeImage from '../welcomeImage.jpg';
import React, { useState, useEffect } from 'react';
import axios from "axios"; //for api requests
import { Button } from 'react-bootstrap';
import { SiCodechef } from 'react-icons/si';

const API_URL = "http://localhost:3005/";


const Welcome = () => {

    const [posts, setPosts] = useState('');

    useEffect(() => {
        //Public posts for unregistered/non-logged in users 
        axios.get(API_URL + 'publicPosts').then(response => {
            //  console.log(response.data);
            setPosts(response.data.length);
        }).catch(error => {
            console.log(error);
        });

    });
    return (
           <div>
                <img src={welcomeImage} className="welcome-image" alt="welcome" />
                        <div className="welcome-message">
                        <h1 className="welcome-title"><SiCodechef className="header-icon" /> Welcome to Coox</h1>
                        <p>
                            A platform where you can showcase your cooking skills with your friends and fans
                            
                        </p>
                        </div>
                <div className="meals-prepped">{posts} Posts and Counting...</div>
                {/* make the number keep changing */ }
                <div className="join-message">
                    <h3>See Who and What's Cooking</h3>
                    <div className="join-inner">
                        <div className="join">Join Coox Today</div>
                        <Button href="/signup" className="signup-button" variant="success" size="lg" block>Sign up</Button>
                        <Button href="/login" className="join-button" variant="outline-primary" size="lg" block>Log in</Button>
                    </div>
                </div>
        
        </div>

   );

}

export default Welcome;