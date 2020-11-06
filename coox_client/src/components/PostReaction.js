//for the small buttons underneath each post showing comment button, like, and share
import React from 'react';
import { Button } from 'react-bootstrap';
import { FaRegComment } from 'react-icons/fa';
import { BsHeart } from 'react-icons/bs';
import { IoIosShareAlt } from 'react-icons/io';


const PostReaction = (props) => {

    return (
        <div>
          <div className="reaction-buttons">
                <div><FaRegComment /> <b>{props.commentCount}</b> </div>
                <div><BsHeart /> <b>{props.likesCount}</b> </div>
                <div><IoIosShareAlt /><b> Share</b></div>
          </div>
        </div>
    );
}
export default PostReaction;