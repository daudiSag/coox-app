var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');  //to encrypt passwords
const checkAuth = require('../authServices/check-auth'); //for checking if user is logged in

var Post = require('../models/post.js');
var Fan = require('../models/fan.js');



//get posts, fans, & faves
router.get('/', checkAuth, (req, res) => {
    let data = {};

    Post.find({ createdBy: req.username }).exec(function (err, results) {
        data.postsCount = results.length;

        Fan.find({ faveId: req.username }).exec(function (err, results) {
            data.fansCount = results.length;

            Fan.find({ fanId: req.username }).exec(function (err, results) {
                data.favesCount = results.length;
                //  console.log(data)
                res.status(200).json(data);
            });

        });

    });







    //   }

    // run();
    // .then(console.log())
    //    let fansCount  = Fan.find({ faveId: req.username }).count();
    //    let favesCount = Fan.find({ fanId: req.username }).count();

    //    let data = {
    //         postsCount: postsCount,
    //         fansCount: fansCount,
    //         favesCount: favesCount
    //     }



    // res.status(200).json(data);


});



module.exports = router;