import React, { useState, useEffect } from 'react';
import axios from "axios"; //for api requests
import authHeader from '../api_services/authHeader.js';
import { Form } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { MdCloudUpload } from 'react-icons/md';
import { AiFillCloseSquare } from 'react-icons/ai';
import { RiImageEditFill } from 'react-icons/ri';


const params = new URLSearchParams(window.location.search)
const userId = params.get('userId');

let username;

if ('username' in localStorage) {
    // eslint-disable-next-line no-unused-vars
    username = localStorage.getItem('username');
} 

const API_URL = "http://localhost:3005/";

const EditProfile = () => {
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [userImageUrl, setuserImageUrl] = useState('');
    let imageUrl;


    function uploadWidget() {
        // alert('works');
        window.cloudinary.openUploadWidget({ cloud_name: 'dgowl1p3x', upload_preset: 'zuclc9xe', tags: ['profile'] },
            function (error, result) {
                if (error) throw error;
                //  console.log(result.info.secure_url);
                if (result.event === 'success') {
                    setuserImageUrl(result.info.secure_url);
                }
            });
    }

    useEffect(() => {

        // console.log(postImageUrl);
        axios.get(API_URL + 'userItem', { headers: authHeader(), params: { username: username } }).then(response => {
            // console.log(response.data);
            setUser(response.data);
            setuserImageUrl(response.data.customData.imageUrl);
            setEmail(response.data.customData.email);
            setUsername(response.data.user);

        }).catch(error => {
            console.log(error);
        });


    }, [username]);

    function removeImage() {
        setuserImageUrl('');

    }

    const Image = () => {

        if (userImageUrl) {
            return (
                <div className="image-div">
                    <RiImageEditFill className="change-image" onClick={uploadWidget} />
                    <AiFillCloseSquare className="remove-image" onClick={removeImage} />
                    {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                    <img className="post-image" src={userImageUrl} alt="User Image" />
                </div>
            );

        } else {

            return <div className="upload">
                <Button onClick={uploadWidget} variant="link" className="upload-button">
                    <MdCloudUpload className="image-upload" /> Attach Profile Image
                </Button>
            </div>
        }

    }

    const onSubmit = (event) => {
        event.preventDefault();
        if (userImageUrl) {
            imageUrl = userImageUrl
        } else {
            if (user.customData.imageUrl) {
                // eslint-disable-next-line no-unused-vars
                imageUrl = user.customData.imageUrl;
            }
        }

        let userInfo = {
            $set: {
               customData: { 
                email: email,
                imageUrl: imageUrl,
                deleted: false
               }
            }
        }

        return axios
            .put(API_URL + "userItem", {
                userId,
                userInfo
            },
                { headers: authHeader() })
            .then(response => {
                window.location.assign("/posts"); //redirect to posts page
                // return response.data;
            });

    }

    function cancelEdit() {

        if (window.history) {

            window.history.back();

        } else {
            window.location.assign('/');
        }

    }

    function deleteProfile() {

        if (window.confirm('Are You Sure You want to Delete Your Account?')) {
            localStorage.removeItem("user");
            window.location.assign('/');
            axios.put(API_URL + "users", { userId },
                { headers: authHeader() })
                .then(response => {

                    return response.data;

                });
            localStorage.removeItem("user");
            localStorage.removeItem("username");
            window.location.assign('/');
        }


    }

    return (
        <div className="add-post">
            <div className="add-post-inner">
                <h3 className="add-user-title">Edit Profile</h3>
                <Form.Label className="label"> Email address</Form.Label>
                <FormControl className="email-input" type="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)} />
                <Form.Label className="label">User Name</Form.Label>
                <FormControl className="username-input" type="text" placeholder="User Name" value={username} onChange={e => setUsername(e.target.value)} readOnly />

                <Image />
                <div className="edit-profile-buttons">
                    <Button onClick={onSubmit} className="save-button" variant="primary" type="submit" block>
                        Save Changes
                            </Button>
                    <Button className="cancel-button" variant="outline-secondary" type="cancel" onClick={cancelEdit} block>
                        Cancel Edit
                        </Button>
                </div>
                <hr></hr>
                <Button className="delete-profile-button" variant="outline-danger" type="cancel" onClick={deleteProfile} block>
                    Delete Account
                </Button>
            </div>
        </div>
    );



}
export default EditProfile;