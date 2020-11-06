
var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://daudi_dev:1SoemAz3m9Xplz4q@cluster0.7sgqr.mongodb.net/cooking_db?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
var bcrypt = require('bcryptjs');  //to encrypt passwords
var jwt = require('jsonwebtoken'); //to create and verify tokens
var config = require('./auth.config');

/* http POST to login user. */
router.post("/", (req, res, next) => {
    var username = req.body.username;
    var pssword = req.body.password;
    

    client.connect(err => {
        if (err) throw err;
        const collection = client.db("cooking_db").collection("users");
       // async function main() {
             collection.findOne({user: username}, function (err, result) {
                if (err) throw err;

                const comparison = bcrypt.compare(pssword, result.pwd);
                if (comparison) {

                    const token = jwt.sign(
                        {
                            username: result.username
                        },
                        config.secret,
                        {
                            expiresIn: "24h" //let token only last for a day
                        }
                    );

                    var data = {
                        accessToken: token,
                        username: result.username
                    };

                    res.status(200).json(data);

                } else {
                    return res.status(401).json({
                        message: "Authentication Failed!"
                    });
                }

                //  client.close();

            });   

        //    client.close();

     //   }

        // main().catch(console.error);

    });

});

module.exports = router;
