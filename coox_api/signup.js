//signup
var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://daudi_dev:1SoemAz3m9Xplz4q@cluster0.7sgqr.mongodb.net/cooking_db?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
var bcrypt = require('bcryptjs');  //to encrypt passwords
//var jwt = require('jsonwebtoken'); //to create and verify tokens


//create a new user
router.post('/', (req, res) => {
   // console.log(req.body);
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        } else {

            let data = {

                user: req.body.username,
                pwd: hash,
                roles: [{ role: 'User', db: 'cooking_db' }],
                customData: {
                    email: req.body.email,
                    deleted: false,
                    createdAt: new Date(),
                    modifiedAt: new Date()
                },

            }

           
            ///connect to db
                client.connect(err => {
                    if (err) throw err;

                    const collection = client.db("cooking_db").collection("users");
                    async function main() {
                        await collection.insertOne(data);
                        res.status(200).json('Success');
                       // client.close();
                    }

                    main().catch(console.error);
           
                    
                });
        
            
        }

    });


});

module.exports = router;

