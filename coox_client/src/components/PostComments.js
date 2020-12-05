import React, { useState, useRef, useEffect } from 'react';
import axios from "axios"; //for api requests
import authHeader from '../api_services/authHeader.js';
import { Button } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { FaCommentSlash } from 'react-icons/fa';
import { BiSend } from 'react-icons/bi';
// import { RiImageAddFill } from 'react-icons/ri';
import PostComment from './PostComment.js';
let username, parentcommentId, imageUrl;

const API_URL = "http://localhost:3005/";  //api url 


// const params = new URLSearchParams(window.location.search)
// const postId = params.get('postId');

if ('username' in localStorage) {
    username = localStorage.getItem('username');
} else {
    username = '';
}

const PostComments = (props) => { 
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [isEditing, setEditing] = useState(true);
  
    const inputRef = useRef(null);

    // const toggleEdit = () => {
    //     setEditing(!isEditing);
    // };
   

    useEffect(() => {
        let isMounted = true;
        if (isEditing){
            if (isMounted) {
            inputRef.current.focus();
            }
        }
 
            axios.get(API_URL + 'postcomments', { headers: authHeader(), params: { postId: props.postId } }).then(response => {
                console.log(response.data.length);
                //
                if (isMounted) {
                    setComments(response.data);
                }

            }).catch(error => {
                console.log(error);
            });

        return () => { isMounted = false };


    });
    

 const handleSubmit = (event) => {
       event.preventDefault();
        setEditing(!isEditing);
        console.log(newComment);
        let title = newComment;
       // let imageUrl: imageUrl;
        let createdBy = username;
        let postId = props.postId;

        return axios.post(API_URL + "postcomments", {
            title,
            imageUrl,        //if attaching an image to comment
            createdBy,
            postId
        },{headers: authHeader() }).then(response => {
                // window.location.assign("/posts"); //redirect to posts page
                return response.data;
        });

    }


    // const addImage = (event) => {
    //     event.preventDefault();
    // }

     
    if (comments.length === 0) {

        return (
            <div className="comments-list">
                <InputGroup>
                    <FormControl
                        className="comment-input"
                        placeholder="Add a comment.."
                        aria-label="Add a comment.."
                        aria-describedby="basic-addon2"
                        ref={inputRef}
                        value={newComment} onChange={e => setNewComment(e.target.value)}
                    />
                    <InputGroup.Append>
                        <Button onClick={handleSubmit} className="submit-comment-btn" variant="outline-secondary"><BiSend className="submit-comment-icon" /></Button>
                        {/* <Button onClick={addImage} className="submit-comment-btn" variant="outline-secondary"><RiImageAddFill className="submit-comment-icon" /></Button> */}
                    </InputGroup.Append>
                </InputGroup>

                <div className="no-comments">
                    <div>
                    <FaCommentSlash className="no-comment-icon" />
                    </div>    
                    <p>This post has no comments</p>
                </div>
            </div>
        );


    } else {
        
        return (
            <div className="comments-list">
                <InputGroup>
                    <FormControl
                        className="comment-input"
                        placeholder="Add a comment.."
                        aria-label="Add a comment.."
                        aria-describedby="basic-addon2"
                        ref={inputRef}
                        value={newComment} onChange={e => setNewComment(e.target.value)}
                    />
                    <InputGroup.Append>
                        <Button onClick={handleSubmit} className="submit-comment-btn" variant="outline-secondary"><BiSend className="submit-comment-icon" /></Button>
                        {/* <Button onClick={addImage} className="submit-comment-btn" variant="outline-secondary"><RiImageAddFill className="submit-comment-icon" /></Button> */}
                    </InputGroup.Append>
                </InputGroup>
                <div className="post-comments-div">
                    {comments.map(comment => (
                        <PostComment id={comment._id} createdBy={comment.createdBy} createdAt={comment.createdAt} title={comment.title}
                            imageUrl={comment.imageUrl} commentCount={comment.childCommentsCount} likesCount={comment.likesCount} />
                    ))}
                </div>
            </div>
        );

    }

 
    
    

}

export default PostComments;