
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import axios from "axios"; //for api requests
import { SiCodechef } from 'react-icons/si';

const SignupForm = () => {
    const[email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

   const API_URL = "http://localhost:3005/";

  const handleSubmit = (event) => {
    event.preventDefault();
      // console.log(`Email: ${email}`);
      // console.log(`Username: ${username}`);
      // console.log(`Password:  ${password}`);
      // console.log(`Confirm Password:  ${confirmPassword}`);
      if (password === confirmPassword) {
        //passwords match
        // alert("Password DO match!");
          return axios.post(API_URL + "signup", {
            username,
            email,
            password
          }).then(function (response) {

            if (response.data.accessToken) {

            localStorage.setItem("user", JSON.stringify(response.data));
            localStorage.setItem("username", username);
              window.location.assign("/"); //redirect to home page
          }


          }).catch(function (error) {

            if (error.response) {

              alert("Email and Username Should both be Unique");
              
            } else {
            alert('Smething went wrong :(')
          }

          });
        

      } else {
        //passwords do not match
        alert("Password mismatch!");

      }
   

  }
    return (
      <div>
        <div className="signup-title"><SiCodechef className="title-icon" /></div>
        <h1>Join Coox</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
              <Form.Control className="email-input" type="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)} />
          </Form.Group>
              <Form.Group controlId="formBasic">
                  {/* <Form.Label>User Name</Form.Label> */}
            <Form.Control className="username-input" type="text" placeholder="User Name" value={username} onChange={e => setUsername(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                  {/* <Form.Label>Password</Form.Label> */}
            <Form.Control className="password-input" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                  {/* <Form.Label>Password</Form.Label> */}
            <Form.Control className="confirm-password-input" type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
              </Form.Group>
          <Button className="signup-submit" variant="success" size="lg" type="submit" block>Sign up</Button>
        </Form>
        <hr></hr>
        <div>
          <Button href="/" variant="link">Return Home</Button> {'   '}
          <Button href="/login" variant="link">Already Joined? Login</Button>
        </div>
      </div>
    );

}

export default SignupForm;