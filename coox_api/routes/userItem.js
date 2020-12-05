//for each user details
var express = require('express');
var router = express.Router();
const checkAuth = require('../authServices/check-auth'); //for checking if user is logged in
var User = require('../models/user.js');


//get details of one user
router.get('/', checkAuth, (req, res) => {
    // console.log(req.username);
    User.findOne({ user: req.username }, { pwd: 0 }, function (err, result) {
        let data = result.toObject();
        res.status(200).json(data);
     });
 
});

//edit user data 
router.put('/', checkAuth, (req, res) => {
    // console.log(req.body.userId);
    // console.log(req.body.userInfo);
    User.findByIdAndUpdate(req.body.userId, req.body.userInfo,
        function (err, docs) {
            if (err) {
                console.log(err)
            }
            else {
                console.log("Updated user: ", docs);
                res.status(200).json('Success');
            }
        });   
  
});

module.exports = router;