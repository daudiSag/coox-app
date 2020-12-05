var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');  //to encrypt passwords
const checkAuth = require('../authServices/check-auth'); //for checking if user is logged in
var User = require('../models/user.js');
var Fan = require('../models/fan.js');



//add fan
router.post('/', checkAuth, (req, res) => {


});

//edit fan
router.put('/', checkAuth, (req, res) => {

    Fan.findOneAndDelete({ fanId: req.body.fanId, faveId: req.body.faveId },
        function (err, docs) {
            if (err) {
                console.log(err)
            }
            else {
                console.log("Updated fan: ", docs);
                res.status(200).json('Success');
            }
        });


});



//get fans list
router.get('/', checkAuth, (req, res) => {
    User.find({}, function (err, docs) {
        if (err) {
            console.log(err)
        } else {
            // console.log(docs);
            res.status(200).json(docs);
        }
    });


});



module.exports = router;