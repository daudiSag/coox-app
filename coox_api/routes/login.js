
var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');  //to encrypt passwords
var jwt = require('jsonwebtoken'); //to create and verify tokens
var secret = process.env.SECRET;
var User = require('../models/user.js');


/* http POST to login user. */
router.post("/", (req, res, next) => {
    var username = req.body.username;
    var pssword = req.body.password;
    User.findOne({ user: username }, function (err, result) {
        if (err) throw err;
        let obj = result.toObject();

        bcrypt.compare(pssword, obj.pwd, function (err, rez) {
            if (err) {
                // handle error
                return res.status(403).json({
                    message: err
                });
            } else {

                if (rez) {
                    console.log(rez);
                    const token = jwt.sign(
                        {
                            username: obj.user
                        }, secret,
                        {
                            expiresIn: "24h" //let token only last for a day
                        }
                    );

                    var data = {
                        accessToken: token,
                        username: result.user
                    };

                    res.status(200).json(data);

                } else {
                    return res.status(401).json({
                        message: "Authentication Failed!"
                    });
                }    

            }
                   
         
        });


    });
                   

});

module.exports = router;
