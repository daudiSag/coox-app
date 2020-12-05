//for the small buttons underneath each post showing comment button, like, and share
import React, { useState, useEffect } from 'react';
import axios from "axios"; //for api requests
import authHeader from '../api_services/authHeader.js';
import { FaRegComment } from 'react-icons/fa';
import { BsHeart } from 'react-icons/bs';
import { BsFillHeartFill } from 'react-icons/bs';
import { IoIosShareAlt } from 'react-icons/io';
import { FiEdit } from 'react-icons/fi';

const API_URL = "http://localhost:3005/";  //api url 

let likeIcon, username;

if ('username' in localStorage) {
  username = localStorage.getItem('username');
} else {
  username = '';
}

const PostReaction = (props) => {
const [likes, setLikes] = useState(false);
const [likesCount, setLikesCount] = useState(0);
const [commentCount, setCommentsCount] = useState(0);

 let postId = props.postId;


 useEffect(() => {

     axios.get(API_URL + 'postItem', { headers: authHeader(), params: { postId: postId } }).then(response => {
        //console.log(response.data);
       setLikesCount(response.data.likes.length);
       setCommentsCount(response.data.commentCount);

       for (let i = 0; i < response.data.likes.length; i++) {
         if (response.data.likes[i].username === username) {
           setLikes(true);
         }
       }

     }).catch(error => {
       console.log(error);
     });


 }, [postId]);

  // console.log(likes);

if (likes === true){
    likeIcon = <BsFillHeartFill className="full-heart" />

  } else {
    likeIcon =  <BsHeart />
  }


  function goToPost(e) {
    e.preventDefault();
    const postId = props.postId;
    window.location.assign(`/postItem/?postId=${postId}`);


  }

  

  function likePost() {
    //like post code goes here
    const postId = props.postId;

    if(likes === false) {
      let postInfo = {
          $push: {
            likes: {
              username: username,
              like: true
            } 
        }
      }

      axios.put(API_URL + "posts",
        {
          postId,
          postInfo
        },
        { headers: authHeader() })
        .then(response => {
          window.location.replace("/posts"); //redirect to posts page
          // return response.data;
        }); 
      }
  }

  function sharePost(e) {
    //sharePost code goes here
    const postId = props.postId;
    window.location.assign(`/sharePost/?postId=${postId}`);

  }

  function editPost() {
    const postId = props.postId;
    window.location.assign(`/editPost/?postId=${postId}`);

  }

  if (props.postCreator === username) {

    return (
      <div>
        <div className="reaction-buttons">
          <div onClick={goToPost}><FaRegComment /> <b>{commentCount}</b> </div>
          <div> {likeIcon} <b>{likesCount}</b> </div>
          <div onClick={editPost}> <FiEdit /> <b>Edit</b> </div>
          <div onClick={sharePost}><IoIosShareAlt /><b> Share</b></div>
        </div>
      </div>
    );

  } else {

    return (
      <div>
        <div className="reaction-buttons">
          <div onClick={goToPost}><FaRegComment /> <b>{commentCount}</b> </div>
          <div onClick={likePost}> {likeIcon} <b>{likesCount}</b> </div>
          <div onClick={sharePost}><IoIosShareAlt /><b> Share</b></div>
        </div>
      </div>
    );

  }
  
}
export default PostReaction;