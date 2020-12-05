
//api returns users' postcomments
var express = require('express');
var router = express.Router();
const checkAuth = require('../authServices/check-auth'); //for checking if user is logged in
var Postcomment = require('../models/postcomment.js');

//create a new postcomment
router.post('/', checkAuth, (req, res) => {

            const comment = new Postcomment({
                title: req.body.title,
                imageUrl: req.body.imageUrl,
                createdBy: req.body.createdBy,
                postId: req.body.postId
            });
            //  console.log(comment);
            comment.save(function (err, result) {
                if (err) {

                    console.log(err);

                } else {
                    //  console.log(result);

                    res.status(200).json('Success');

                }

            });


});


//delete a postcomment
router.put('/', checkAuth, (req, res) => {
    console.log(req.body.commentId);
    Postcomment.findByIdAndDelete(req.body.commentId, function (err, docs) {
        if (err) {
            console.log(err)
        }
        else {
            console.log("Deleted : ", docs);
            res.status(200).json('Success');
        }
    }); 

    
});



//get postcomments list
router.get('/', checkAuth, (req, res) => {
    Postcomment.find({postId: req.query.postId}, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            // console.log(result);
            res.status(200).json(result);
        }
    });

  

});

module.exports = router;