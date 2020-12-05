import React, { useState, useEffect } from 'react';
import axios from "axios"; //for api requests
import authHeader from '../api_services/authHeader.js';
import { FaUserCircle } from 'react-icons/fa';
import { ImArrowLeft2 } from 'react-icons/im';
import Moment from 'react-moment';  
import { FacebookShareButton, PinterestShareButton, RedditShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, PinterestIcon, TwitterIcon, RedditIcon } from "react-share";

let image;

const params = new URLSearchParams(window.location.search)
const postId = params.get('postId');

const API_URL = "http://localhost:3005/";  //api url 

const SharePost = () => {

    const [post, setPost] = useState('');

    let shareUrl = window.location.href;
    useEffect(() => {

        axios.get(API_URL + 'postItem', { headers: authHeader(), params: { postId: postId } }).then(response => {
            // console.log(response.data);
            //
            setPost(response.data);

        }).catch(error => {
            console.log(error);
        });

    });

    if (post.imageUrl) {

        // eslint-disable-next-line jsx-a11y/img-redundant-alt
        image = <img src={post.imageUrl} className="post-image" alt="Post Image" />

    } else {

        image = <div></div>  //no image

    }

    function goBack() {

        if (window.history) {

            window.history.back();

        } else {
            window.location.assign('/');
        }

    }

    return (
        <div className="post-item-page">
            <div className="navbar">
                <div className="post-item-nav"><ImArrowLeft2 className="icon" onClick={goBack} /> Post Comments</div>
            </div>
            <div className="post-item">
                <div key={post._id} className="post">
                    <div className="creator-thumb">
                        <FaUserCircle />
                        {/* {props.creatorThumb} */}
                    </div>
                    <div className="post-info">
                        <div className="post-creator-info">
                            <b className="creator-name"> {post.createdBy}</b> &nbsp; <b className="divider">.</b> &nbsp;
                        <b className="created-at"><Moment fromNow>{post.createdAt}</Moment> </b>
                        </div>
                        <div className="post-title">{post.title}</div>
                        {image}
                       <div className="share-buttons-div">
                            <FacebookShareButton quote={post.title} url={shareUrl}> <FacebookIcon size={32} round={true} /></FacebookShareButton>
                            <PinterestShareButton media={image} url={shareUrl}><PinterestIcon size={32} round={true} /></PinterestShareButton> 
                            <RedditShareButton title={post.title} url={shareUrl}><RedditIcon size={32} round={true} /></RedditShareButton> 
                            <TwitterShareButton title={post.title} url={shareUrl}><TwitterIcon size={32} round={true} /></TwitterShareButton>
                       </div>
                    </div>
                </div>
            </div>
        </div>

    );

}

export default SharePost;