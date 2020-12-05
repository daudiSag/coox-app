//for each post details
var express = require('express');
var router = express.Router();
const checkAuth = require('../authServices/check-auth'); //for checking if user is logged in
var Post = require('../models/post.js');

//get details of one post
router.get('/', checkAuth, (req, res) => { 
    // console.log(req.query.postId);
    Post.findById(req.query.postId, function (err, result) {
        if (err) {
            console.log(err);
        } else {
        // console.log(result);
         res.status(200).json(result);
        }
    });
  
});


//delete a post
router.put('/', checkAuth, (req, res) => {
    // console.log(req.body.postId);
    Post.findByIdAndDelete(req.body.postId, function (err, docs) {
        if (err) {
            console.log(err)
        }
        else {
            console.log("Deleted : ", docs);
            res.status(200).json('Success');
        }
    });


  
});


module.exports = router;