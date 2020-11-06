//for each post details
var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://daudi_dev:1SoemAz3m9Xplz4q@cluster0.7sgqr.mongodb.net/cooking_db?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
const checkAuth = require('./check-auth'); //for checking if user is logged in

//get details of one post
router.get('/', checkAuth, (req, res) => {
    let keyQuery = req.body.postId;
    client.connect(err => {
        if (err) throw err;
        const collection = client.db("cooking_db").collection("posts");
        collection.findOne({}, keyQuery).toArray(function (err, result) {
            if (err) throw err;
            res.status(200).json(result);
        })
        client.close();
    });
});


//edit post data - just one post
router.put('/', checkAuth, (req, res) => {
    let keyQuery = req.body.postId;
    let data     = req.body.data;
    client.connect(err => {
        if (err) throw err;
        const collection = client.db("cooking_db").collection("posts");
        collection.updateOne(keyQuery, { $set: data });  //data comes from an api call
        res.status(200).json();
        client.close();
    });
});


module.exports = router;