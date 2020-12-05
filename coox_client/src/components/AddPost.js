
import React, { useState, useEffect } from 'react';
import axios from "axios"; //for api requests
import authHeader from '../api_services/authHeader.js';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { SiCodechef } from 'react-icons/si';
import { MdCloudUpload } from 'react-icons/md';
import { AiFillCloseSquare} from 'react-icons/ai';
import { RiImageEditFill } from 'react-icons/ri';
let username;

if ('username' in localStorage) {
    username = localStorage.getItem('username');
} else {
    username = '';
}
//console.log(username);


const API_URL = "http://localhost:3005/";

const AddPost = () => { 
    const [title, setPostTitle]     = useState('');
    const [postImageUrl, setpostImageUrl] = useState('');
    const createdBy = username;
    let imageUrl;

    function uploadWidget() {
        window.cloudinary.openUploadWidget({ cloud_name: 'dgowl1p3x', upload_preset: 'zuclc9xe', tags: ['food'] },
            function (error, result) {
                if (error) throw error;
              //  console.log(result.info.secure_url);
                if(result.event === 'success') {
                     imageUrl = result.info.secure_url;
                     setpostImageUrl(imageUrl);
                }
            });
    }

    useEffect(() => {

       // console.log(postImageUrl);
        //send post data to server


    });

    function cancelPost() {

         window.location.assign('/posts');
       
    }

    function removeImage() {
        setpostImageUrl('');

    }

    function Image() {
        if (postImageUrl) {
        // Import result is the URL of your image
            return (
                <div className="image-div">
                    <RiImageEditFill className="change-image" onClick={uploadWidget}/>
                    <AiFillCloseSquare className="remove-image" onClick={removeImage}/>
                     {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                    <img className="post-image" src={postImageUrl} alt="Post Image" />
                </div>
            );
        } else {

            return <div className="upload">
                        <Button onClick={uploadWidget} variant="link" className="upload-button">
                            <MdCloudUpload className="image-upload" /> Attach Image
                        </Button>
                    </div>

        }
    }

    const onSubmit = (event) => {
        event.preventDefault();

        return axios
            .post(API_URL + "posts", {
                title: title,
                postImageUrl: postImageUrl,
                createdBy: createdBy
            },
            { headers: authHeader() })
            .then(response => {
                 window.location.assign("/posts"); //redirect to posts page
               // return response.data;
            });

    }


    return (

            <div className="add-post">
                <div className="add-post-inner">
                    <h3 className="add-post-title"><SiCodechef className="header-icon" /> Add Post</h3>

                        <FormControl className="post-description-input" as="textarea" rows={3} placeholder="Enter Post Description" value={title} onChange={e => setPostTitle(e.target.value)} />
                        <Image />
                     
                         <div className="add-post-buttons">          
                            <Button onClick={onSubmit} className="save-post-button" variant="primary" type="submit" block>
                                Save
                            </Button>
                        <Button className="cancel-post-button" variant="outline-secondary" type="cancel" onClick={cancelPost} block>
                                Cancel
                        </Button>
                        </div>
                </div>
            </div>

    );
}


export default AddPost;