var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://daudi_dev:1SoemAz3m9Xplz4q@cluster0.7sgqr.mongodb.net/cooking_db?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
var bcrypt = require('bcryptjs');  //to encrypt passwords
//var jwt = require('jsonwebtoken'); //to create and verify tokens
const checkAuth = require('./check-auth'); //for checking if user is logged in

//create a new user
router.post('/', (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        } else {

            let data = {

                user: req.body.username,
                pwd: hash,
                roles: [{role: 'User', db: 'cooking_db'}],
                customData: {
                    email: req.body.email,
                    deleted: false,
                    createdAt: new Date(),
                    modifiedAt: new Date()
                },

            }
           
            client.connect(err => {
                if (err) throw err;
                const collection = client.db("cooking_db").collection("users");
                collection.createUser(data);  //data comes from an api call
                res.status(200).json({
                        message: "Success"
                });
                client.close();
            });
        }

    });


});


//edit user data - more than one user
router.put('/', checkAuth, (req, res) => {
    let keyQuery = req.body.userIds;
    let data = req.body.data;
    client.connect(err => {
        if (err) throw err;
        const collection = client.db("cooking_db").collection("users");
        collection.updateMany(keyQuery, { $set: data }, { multi: true, upsert: true });  //data comes from an api call
        res.status(200).json();
        client.close();
    });
});



//get users list
router.get('/', checkAuth, (req, res) => {
//router.get('/', (req, res) => { //for testing
    let keyQuery = req.body.request_params;

    client.connect(err => {
        if (err) throw err;
        const collection = client.db("cooking_db").collection("users");
        collection.find({}, keyQuery).toArray(function (err, result) {
            // collection.find({}).toArray(function (err, result) { //for testing
            if (err) throw err;
            res.status(200).json(result);

        });
        client.close();
    });

});



module.exports = router;
