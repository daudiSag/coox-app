//for each user details
var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://daudi_dev:1SoemAz3m9Xplz4q@cluster0.7sgqr.mongodb.net/cooking_db?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
const checkAuth = require('./check-auth'); //for checking if user is logged in


//get details of one user
router.get('/', checkAuth, (req, res) => {
    let keyQuery = {user: req.body.username};
    client.connect(err => {
        if (err) throw err;
        const collection = client.db("cooking_db").collection("users");
        collection.findOne(keyQuery, function (err, result) {
            if (err) throw err;
            res.status(200).json(result);
        })
        client.close();
    });
});

//edit user data - just one user
router.put('/', checkAuth, (req, res) => {
    let keyQuery = {user: req.body.username};
    let data     = req.body.data;
    client.connect(err => {
        if (err) throw err;
        const collection = client.db("cooking_db").collection("users");
        collection.updateUser(keyQuery, { $set: data });  //data comes from an api call
        res.status(200).json();
        client.close();
    });
});

module.exports = router;