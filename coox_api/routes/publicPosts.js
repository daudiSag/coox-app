
//api returns public posts
var express = require('express');
var router = express.Router();
var Post = require('../models/post.js');

//get posts list
router.get('/', (req, res) => {

    Post.find({}, function (err, docs) {
        if (err) {
            console.log(err)
        } else {
            // console.log(docs);
            res.status(200).json(docs);
        }
    });

});

module.exports = router;