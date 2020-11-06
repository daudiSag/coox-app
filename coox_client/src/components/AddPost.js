
import React, { useState } from 'react';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { SiCodechef } from 'react-icons/si';
import { MdCloudUpload } from 'react-icons/md';


const API_URL = "http://localhost:3005/";

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
// This is still incomplete. The upload does not work yet!!!
// Work in Progress
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////



const AddPost = () => { 
    const [title, setPostTitle]     = useState('');
    const [postImage, setPostImage] = useState('');

    function uploadWidget() {
        window.cloudinary.openUploadWidget({ cloud_name: 'dgowl1p3x', upload_preset: 'preset', tags: ['xmas'] },
            function (error, result) {
                console.log(result);
            });
    }

    function cancelPost() {

        window.location.replace('/posts');
       
    }

    const handleSubmit = (event) => {

    }


    return (

            <div className="add-post">
                <div className="add-post-inner">
                    <h3 className="add-post-title"><SiCodechef className="header-icon" /> Add Post</h3>

                        <FormControl className="post-description-input" as="textarea" rows={3} placeholder="Enter Post Description" value={title} onChange={e => setPostTitle(e.target.value)} />
                        <div className="upload">
                            <Button onClick={uploadWidget} variant="link" className="upload-button">
                                <MdCloudUpload className="image-upload" /> Attach Image
                            </Button>
                        </div>
                         <div className="add-post-buttons">          
                            <Button className="save-post-button" variant="primary" type="submit" block>
                                Save
                            </Button>
                        <Button className="cancel-post-button" variant="outline-secondary" type="cancel" onClick={cancelPost} block>
                                Cancel
                        </Button>
                        </div>
                </div>
            </div>

    );
}


export default AddPost;