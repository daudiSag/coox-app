//the posts component
import React, { useState, useEffect} from 'react';
import PostItem from './PostItem.js';
// import lasagna from '../images/lasagnaImage.jpg'; //for testing
import axios from "axios"; //for api requests
import authHeader from '../api_services/authHeader.js';
import { Button } from 'react-bootstrap';
//slet posts_arr = [];

const API_URL = "http://localhost:3005/";  //api url for getting posts


const Posts = () => {
    function addPost() {

        window.location.replace('/addPost');

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

    //for testing
    // const [posts, setPosts] = useState([
    //     {
    //         id: 1,
    //         creator: 'daudiCoox',
    //         createdAt: '3hours ago',
    //         title: "Please see my great Lasagna meal I made!It's time to put your braiding skills to good use!",
    //         postImage: lasagna,
    //         commentCount: 46,
    //         likesCount: 1902
    //     },
    //     {
    //         id: 2,
    //         creator: 'RealRamsey',
    //         createdAt: '1hour ago',
    //         title: "Please see my great Hamburger meal I made!It's time to put your braiding skills to good use! Challah is an egg enriched loaf that's traditionally braided and makes the most beautiful presentation. Similar to brioche, the bread is slightly sweet and wonderfully soft inside",
    //         postImage: '',
    //         commentCount: 1467,
    //         likesCount: 29289
    //     },
    //     {
    //         id: 3,
    //         creator: 'HLectarMan',
    //         createdAt: ' 12min ago',
    //         title: "In a small bowl or measuring cup, combine lukewarm water, yeast, and 1 teaspoon sugar. Let sit until foamy, about 5 minutes.",
    //         postImage: '',
    //         commentCount: 23,
    //         likesCount: 183
    //     }

    // ]);
    
    return (
        <div className="posts-list">
            {posts.map(post => (
                <PostItem id={post.id} creator={post.creator} createdAt={post.createdAt} postTitle={post.title} 
                postImage={post.postImage} commentCount={post.commentCount} likesCount={post.likesCount} />
            ))}
            <Button onClick={addPost} variant="primary" type="submit" className="add-post-button" block>
                Add Post
            </Button>
        </div>
    )
}

export default Posts;


