
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import axios from "axios"; //for api requests
import { SiCodechef } from 'react-icons/si';

const API_URL = "http://localhost:3005/";
let usrname;

  if ( 'username' in localStorage ) {
      usrname = localStorage.getItem('username');
    } else {
       usrname = '';
    }

const LoginForm = () => {

  
 
    const [username, setUsername] = useState(usrname);
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // // console.log(`Username:  ${username}`);
        // console.log(`Password: ${password}`);
            return axios
                .post(API_URL + "login", {
                    username,
                    password
                })
                .then(response => {
                    if (response.data.accessToken) {
                        localStorage.setItem("user", JSON.stringify(response.data));
                    }
                    window.location.replace("/posts"); //redirect to posts page
                    return response.data;
                });

    }

    return (
        <div>
            <div className="login-title"><SiCodechef className="title-icon" /></div>
            <h1>Coox Member Login</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasic">
                    <Form.Control className="username-input" type="text" placeholder="Enter Email or User Name" value={username} onChange={e => setUsername(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Control className="password-input" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Button className="login-submit" variant="primary" size="lg" type="submit" block>Login</Button>
            </Form>
            <hr></hr>
            <div>
                <Button href="/" variant="link">Return Home</Button> {'   '}
                <Button href="/signup" variant="link">New to Coox? Signup</Button>
            </div>
        </div>


    );

        

}

export default LoginForm;
