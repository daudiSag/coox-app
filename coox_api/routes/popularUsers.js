var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');  //to encrypt passwords
const checkAuth = require('../authServices/check-auth'); //for checking if user is logged in
var User = require('../models/user.js');
var Fan = require('../models/fan.js');


//edit user data - more than one user
router.put('/', checkAuth, (req, res) => {

});



//get popular users list
router.get('/', checkAuth, (req, res) => {
    // find users with the most liked posts
    let username = req.query.username;
    let usersArray = [];
    // console.log(username);
    User.find({ user: { $ne: username }, postLikes: { $gt: 0 } }, { pwd: 0 }).sort({ postLikes: 'desc' }).limit(7).exec(function (err, docs) {
        if (err) {
            console.log(err)
        } else {
            // console.log(docs);
            docs.map(doc => {

                Fan.find({ fanId: username, faveId: doc.user }).exec(function (err, results) {
                    if (results.length > 0) {

                        doc.push({ fave: true });

                    } else {
                        doc.push({ fave: false });
                    }
                    usersArray.push(doc);
                });

            });

            res.status(200).json(usersArray);
        }
    });


});



module.exports = router;