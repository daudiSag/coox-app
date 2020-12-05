import React, { useState, useEffect } from 'react';
import axios from "axios"; //for api requests
import authHeader from '../api_services/authHeader.js';
import { FaRegComment } from 'react-icons/fa';
import { BsHeart } from 'react-icons/bs';
import { BsFillHeartFill } from 'react-icons/bs';
import { RiDeleteBin5Line } from 'react-icons/ri';

const API_URL = "http://localhost:3005/";  //api url 

let likeIcon, username;

if ('username' in localStorage) {
    username = localStorage.getItem('username');
} else {
    username = '';
}

const CommentReaction = (props) => {

    const [likes, setLikes] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [commentCount, setCommentsCount] = useState(0);

    useEffect(() => {

        if ('user' in localStorage) {
            axios.get(API_URL + 'postcommentItem', { headers: authHeader(), params: { commentId: props.commentId } }).then(response => {
                //console.log(response.data);
                setLikesCount(response.data.likes.length);
                setCommentsCount(response.data.childCommentsCount);

                for (let i = 0; i < response.data.likes.length; i++) {
                    if (response.data.likes[i].username === username) {
                        setLikes(true);
                    }
                }

            }).catch(error => {
                console.log(error);
            });

        } else {
            //Public posts for unregistered/non-logged in users 
            axios.get(API_URL + 'publicPosts').then(response => {
                console.log(response.data);
                // setPosts(response.data);

            }).catch(error => {
                console.log(error);
            });

        }

    });

    if (likes === true) {
        likeIcon = <BsFillHeartFill className="full-heart" />

    } else {
        likeIcon = <BsHeart />
    }

    function likeComment() {
        //like post code goes here
        const commentId = props.commentId;

        if (likes === false) {
            let commentInfo = {
                $push: {
                    likes: {
                        username: username,
                        like: true
                    }
                }
            }

            axios.put(API_URL + "postcommentItem",
                {
                    commentId,
                    commentInfo
                },
                { headers: authHeader() })
                .then(response => {
                    // return response.data;
                });
        }
    }

    function expandComments() {


    }

    function deleteComment() {
        const commentId = props.commentId;
        if (window.confirm('Are You Sure You want to Delete this Comment?')) {
            axios.put(API_URL + "postcomments", { commentId },
                { headers: authHeader() })
                .then(response => {
                    // return response.data;
                });
        }


    }

    if (props.creator === username) {
    return (
        <div>
            <div className="comment-reaction-buttons">
                <div onClick={expandComments}><FaRegComment /> <b>{commentCount}</b> </div>
                <div onClick={likeComment}> {likeIcon} <b>{likesCount}</b> </div>
                <div onClick={deleteComment}><RiDeleteBin5Line /><b></b></div>
            </div>
        </div>
    );
    } else {

        return (
            <div>
                <div className="comment-reaction-buttons">
                    <div onClick={expandComments}><FaRegComment /> <b>{commentCount}</b> </div>
                    <div onClick={likeComment}> {likeIcon} <b>{likesCount}</b> </div>
                </div>
            </div>
        );

    }

}

export default CommentReaction;