import React, {useState, useEffect} from 'react';
import axios from "axios"; //for api requests
import authHeader from '../api_services/authHeader.js';
import { FaUserCircle } from 'react-icons/fa';
import { ImArrowLeft2 } from 'react-icons/im';
import PostComments from './PostComments.js';
import Moment from 'react-moment';

let image;
// console.log(window.location.pathname);
const params = new URLSearchParams(window.location.search)
const postId = params.get('postId');
// console.log(params.get('postId'));
// console.log(authHeader());
const API_URL = "http://localhost:3005/";  //api url 

 const PostItemPage = () => {

    const [post, setPost] = useState('');
   

    useEffect(() => {

        axios.get(API_URL + 'postItem', {headers: authHeader(), params: {postId: postId}}).then(response => {
            // console.log(response.data);
            //
            setPost(response.data);

        }).catch(error => {
            console.log(error);
        });

    }, []);

    if (post.imageUrl) {

        // eslint-disable-next-line jsx-a11y/img-redundant-alt
        image = <img src={post.imageUrl} className="post-image" alt="Post Image" />

    } else {

        image = <div></div>  //no image

    }

    function goToPost(e) {
        e.preventDefault();
        //build URL
         window.location.assign(`/postItem/?postId=${postId}`);
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
                <div className="post-item-nav"><ImArrowLeft2 className="icon" onClick={goBack}/> Post Comments</div>
            </div>
            <div className="post-item">
             <div key={post._id} className="post" onClick={goToPost}>
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
                    <div className="post-comments-title">Post Comments</div>
                    <div className="post-comments">
                        <PostComments postId={postId} /> 
                    </div>
                </div>
            </div>
          </div>
        </div>

    );

}

export default PostItemPage;