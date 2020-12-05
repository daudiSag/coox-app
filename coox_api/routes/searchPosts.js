//api returns users' posts
var express = require('express');
var router = express.Router();
const checkAuth = require('../authServices/check-auth'); //for checking if user is logged in
var Post = require('../models/post.js');
var User = require('../models/user.js');

//get posts list
router.get('/', checkAuth, (req, res) => {
    // console.log(req.query.searchTerm);
    let regex = new RegExp(req.query.searchTerm, 'i');

    Post.aggregate([
       
        { $match: { title: regex } }
    ], function (err, posts) {
        
            if (err) {
                console.log(err)
            } else {
                // console.log(docs);
                res.status(200).json(posts);
            }

    });

});

module.exports = router;