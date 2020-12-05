
//api returns users' posts
var express = require('express');
var router = express.Router();
const checkAuth = require('../authServices/check-auth'); //for checking if user is logged in
var Post = require('../models/post.js');
var User = require('../models/user.js');


//create a new post
router.post('/', checkAuth, (req, res) => {
   
    User.findOne({ user: req.username }, function (err, result) {
        if (err) console.log(err);
        else {
      //  user = result.toObject();
        const post = new Post({
                title: req.body.title,
                imageUrl: req.body.postImageUrl,
                createdBy: req.body.createdBy,
                user: result.toObject()
        });
        post.save(function (err) {
            if (err) {

                console.log(err);

            } else {

                res.status(200).json('Success');

            }

         });

       }
       
    });

    
});


//edit post data - more than one post
router.put('/', checkAuth, (req, res) => {
    // console.log(req.body);

    Post.findByIdAndUpdate(req.body.postId, req.body.postInfo,
        function (err, docs) {
            if (err) {
                console.log(err)
            }
            else {
                console.log("Updated post: ", docs);
                res.status(200).json('Success');
            }
        });      
    
});



//get posts list
router.get('/', checkAuth, (req, res) => {
    //console.log('wks')
    Post.find({ }, function (err, docs) { 
        if (err) { 
            console.log(err)
        } else {
           // console.log(docs);
            res.status(200).json(docs);
        }
    });

});

module.exports = router;