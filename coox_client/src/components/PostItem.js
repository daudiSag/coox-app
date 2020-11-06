import React from 'react';
// import lasagna from '../images/lasagnaImage.jpg';
import PostReaction from './PostReaction.js';
import { FaUserCircle } from 'react-icons/fa';
let image;



const PostItem = (props) => {
    if(props.postImage) {

       image = <img src={props.postImage} className="post-image" alt="Post Image" />

    } else {

        image = <div></div>  //no image

    }

    function goToPost(e) {
        e.preventDefault();
         const postId = props.id;
         //build URL
         
    }

    return (
        <div key={props.id} className="post" onClick={goToPost}>
            <div className="creator-thumb">
                <FaUserCircle />
                {/* {props.creatorThumb} */}
            </div>
            <div className="post-info">
                <div className="post-creator-info">
                    <b className="creator-name"> {props.creator}</b> &nbsp; <b className="divider">.</b> &nbsp;
                    <b className="created-at">{props.createdAt} </b>
                </div>
                <div className="post-title">{props.postTitle}</div>
                {image}
                <PostReaction commentCount={props.commentCount} likesCount={props.likesCount} />
            </div>
        </div>

    );

}

export default PostItem;