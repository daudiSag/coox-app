import React, { useState, useEffect } from 'react';
import axios from "axios"; //for api requests
import authHeader from '../api_services/authHeader.js';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { SiCodechef } from 'react-icons/si';
import { MdCloudUpload } from 'react-icons/md';
import { AiFillCloseSquare } from 'react-icons/ai';
import { RiImageEditFill } from 'react-icons/ri';


const params = new URLSearchParams(window.location.search)
const postId = params.get('postId');


const API_URL = "http://localhost:3005/";

const EditPost = () => {
    const [post, setPost] = useState('');
    const [title, setPostTitle] = useState('');
    const [postImageUrl, setpostImageUrl] = useState('');
    let imageUrl;

    function uploadWidget() {

        window.cloudinary.openUploadWidget({ cloud_name: 'dgowl1p3x', upload_preset: 'zuclc9xe', tags: ['food'] },
            function (error, result) {
                if (error) throw error;
                //  console.log(result.info.secure_url);
                if (result.event === 'success') {
                    imageUrl = result.info.secure_url;
                    setpostImageUrl(imageUrl);
                }
            });
    }

    useEffect(() => {

        // console.log(postImageUrl);
        axios.get(API_URL + 'postItem', { headers: authHeader(), params: { postId: postId } }).then(response => {
            // console.log(response.data);
            setPost(response.data);
            setpostImageUrl(response.data.imageUrl);



        }).catch(error => {
            console.log(error);
        });


    }, []);

    function cancelPost() {

        window.location.assign('/posts');

    }

    function deletePost() {

        if (window.confirm('Are You Sure You want to Delete this Post?')) {
            axios.put(API_URL + "postItem", { postId },
                { headers: authHeader() })
                .then(response => {
                    window.location.assign('/posts');
                    return response.data;

                });
        }


    }

    function removeImage() {
        setpostImageUrl('');

    }

    const Image = () => {

        if (postImageUrl) {
            return (
                <div className="image-div">
                    <RiImageEditFill className="change-image" onClick={uploadWidget} />
                    <AiFillCloseSquare className="remove-image" onClick={removeImage} />
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
        let postInfo = {
            $set: {
                title: title,
                postImageUrl: postImageUrl
            }
        }

        return axios
            .put(API_URL + "posts", {
                postId,
                postInfo
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
                <h3 className="add-post-title"><SiCodechef className="header-icon" /> Edit Post</h3>

                <FormControl className="post-description-input" as="textarea" rows={3} placeholder="Enter Post Description" value={post.title} onChange={e => setPostTitle(e.target.value)} />
                <Image />
                <div className="add-post-buttons">
                    <Button onClick={onSubmit} className="save-post-button" variant="primary" type="submit" block>
                        Save Changes
                    </Button>
                    <Button className="cancel-post-button" variant="outline-secondary" type="cancel" onClick={cancelPost} block>
                        Cancel Edit
                   </Button>
                    <Button className="cancel-post-button" variant="outline-danger" type="cancel" onClick={deletePost} block>
                        Delete Post
                    </Button>
                </div>

            </div>
        </div>

    );
}


export default EditPost;