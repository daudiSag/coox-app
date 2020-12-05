//the posts component
import React, { useState, useEffect} from 'react';
import PostItem from './PostItem.js';
//import lasagna from '../images/lasagnaImage.jpg'; //for testing
import axios from "axios"; //for api requests
import authHeader from '../api_services/authHeader.js';
import { Button } from 'react-bootstrap';

//slet posts_arr = [];

const API_URL = "http://localhost:3005/";  //api url for getting posts


const Posts = () => {
    function addPost() {

         window.location.assign('/addPost');

    }

    const [posts, setPosts] = useState([]);
    useEffect(() => {

            axios.get(API_URL + 'posts', { headers: authHeader() }).then(response => {
                // console.log(response.data);
                setPosts(response.data);

            }).catch(error => {
                console.log(error);
            });


    });

    
    return (
        <div className="posts-list">
            <Button onClick={addPost} variant="primary" type="submit" className="add-post-button" block>
                Add Post
            </Button>
            {posts.map(post => (
                <PostItem id={post._id} createdBy={post.createdBy} createdAt={post.createdAt} title={post.title} 
                imageUrl={post.imageUrl} commentCount={post.commentCount} likes={post.likes} />
               
            ))}
        </div>
    )
}

export default Posts;


