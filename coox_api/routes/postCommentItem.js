//for each postComment details
var express = require('express');
var router = express.Router();
const checkAuth = require('../authServices/check-auth'); //for checking if user is logged in
var Postcomment = require('../models/postcomment.js');


//get details of one postComment
router.get('/', checkAuth, (req, res) => {
    Postcomment.findById(req.query.commentId, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            // console.log(result);
            res.status(200).json(result);
        }
    });
   
});

//edit postComment data - just one postComment
router.put('/', checkAuth, (req, res) => {
    // console.log(req.body);

    Postcomment.findByIdAndUpdate(req.body.commentId, req.body.commentInfo,
        function (err, docs) {
            if (err) {
                console.log(err)
            }
            else {
                console.log("Updated comment: ", docs);
                res.status(200).json('Success');
            }
        });

   
});

module.exports = router;