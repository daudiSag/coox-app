//signup
var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');  //to encrypt passwords
var jwt = require('jsonwebtoken'); //to create and verify tokens
var secret = process.env.SECRET;
var User = require('../models/user.js');



//create a new user
router.post('/', (req, res) => {
   // console.log(req.body);
    var username = req.body.username;
    var pssword = req.body.password;

    bcrypt.hash(pssword, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        } else {

             //db code
            const user = new User({ 
                user: username,
                pwd: hash,
                roles: [{ role: 'User', db: 'cooking_db' }],
                customData: {
                    email: req.body.email,
                    deleted: false,
                    createdAt: new Date(),
                    modifiedAt: new Date()
                }

             });
            user.save(function (err) {
                if (err) 
                {
                    res.status(409).json(err.message);
                } else {

                    const token = jwt.sign(
                        {
                            username: username
                        }, secret,
                        {
                            expiresIn: "24h" //let token only last for a day
                        }
                    );

                    var data = {
                        accessToken: token,
                        username: username
                    };

                    res.status(200).json(data);

                }


            });

            
        }

    });


});

module.exports = router;

