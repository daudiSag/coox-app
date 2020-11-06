
//api returns users' posts
var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://daudi_dev:1SoemAz3m9Xplz4q@cluster0.7sgqr.mongodb.net/cooking_db?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
const checkAuth = require('./check-auth'); //for checking if user is logged in


//create a new post
router.post('/', checkAuth, (req, res) => {
    let data = req.body.data;
    client.connect(err => {
        if (err) throw err;
        const collection = client.db("cooking_db").collection("posts");
        collection.insertOne(data);  //data comes from an api call
        res.status(200).json();
       // client.close();
    });


});


//edit post data - more than one post
router.put('/', checkAuth, (req, res) => {
    let keyQuery = req.body.postIds;
    let data = req.body.data;
    client.connect(err => {
        if (err) throw err;
        const collection = client.db("cooking_db").collection("posts");
        collection.updateMany(keyQuery, { $set: data }, {multi: true, upsert: true});  //data comes from an api call
        res.status(200).json();
      //  client.close();
    });
});



//get posts list
router.get('/', checkAuth, (req, res) => {
//router.get('/', (req, res) => {  
    //let keyQuery = req.body.request_params;
    console.log('works');

    client.connect(err => {
        if (err) throw err;
        const collection = client.db("cooking_db").collection("posts");
         // collection.find(keyQuery).toArray(function(err, result){
          collection.find({}).toArray(function (err, result) { //for testing'
            //console.log(result);
            if (err) throw err;
            res.status(200).json(result);
       
        });
       // client.close();
    });
   
});

module.exports = router;