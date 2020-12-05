var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');  //to encrypt passwords
const checkAuth = require('../authServices/check-auth'); //for checking if user is logged in
var User = require('../models/user.js');


//delete user
router.put('/', checkAuth, (req, res) => {
    User.findByIdAndDelete(req.body.userId, function (err, docs) {
        if (err) {
            console.log(err)
        }
        else {
            console.log("Deleted : ", docs);
            res.status(200).json('Success');
        }
    });

    
});



//get users list
router.get('/', checkAuth, (req, res) => {
    User.find({}, { pwd: 0 }, function (err, docs) {
        if (err) {
            console.log(err)
        } else {
            // console.log(docs);
            res.status(200).json(docs);
        }
    });
    

});



module.exports = router;
