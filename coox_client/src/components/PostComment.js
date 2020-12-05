import React from 'react';
// import lasagna from '../images/lasagnaImage.jpg';
import CommentReaction from './CommentReaction.js';
import { FaUserCircle } from 'react-icons/fa';
import Moment from 'react-moment';
// import 'moment-timezone';
let image;

const API_URL = "http://localhost:3005/";  //api url 

const PostComment = (props) => {
    if (props.imageUrl) {

        image = <img src={props.imageUrl} className="post-image" alt="Post Image" />

    } else {

        image = <div></div>  //no image

    }


    return (
        <div key={props.id} className="post">
            <div className="creator-thumb">
                <FaUserCircle />
                {/* {props.creatorThumb} */}
            </div>
            <div className="post-info">
                <div className="post-creator-info">
                    <b className="creator-name"> {props.createdBy}</b> &nbsp; <b className="divider">.</b> &nbsp;
                    <b className="created-at"><Moment fromNow>{props.createdAt}</Moment> </b>
                </div>
                <div className="post-title">{props.title}</div>
                {/* <br></br> */}
                <div>
                    {image}
                </div>
                <CommentReaction commentId={props.id} creator={props.createdBy} />
            </div>
        </div>

    );

}

export default PostComment;