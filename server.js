var express = require('express');
var app  = express();
//var MongoClient = require('mongodb').MongoClient;
//var url = 'mongodb://localhost:27017/questnetz';
var mongojs = require('mongojs');
var db = mongojs('contacts', ['contacts']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.get('/contacts', function(req, res){
    //var temp_res;
    //MongoClient.connect(url, function(err, db) {
    //    if (err) console.log(err);
    //    console.log("Connected correctly to server");
    //        var collection  = db.collection('users');
    //        collection.find({}, function(err, docs){
    //            if (err) {
    //                console.log(err);
    //                db.close();
    //            }
    //            console.log(docs);
    //            temp_res  = docs;
    //        });
    //    db.close();
    //});
    //res.json(temp_res);
    console.log("Received a GET request")
    db.contacts.find( function(err, docs) {
        console.log(docs);
        res.json(docs);
        })

});
app.post('/contacts', function(req, res){

    db.contacts.insert(req.body, function(err, doc) {
        res.json(doc);

    });
});

app.delete('/contacts/:id', function(req,res){
    var id = req.params.id;
    console.log(id);
    db.contacts.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
        console.log("is removed")
        res.json(doc);
    });

});


app.get('/contacts/:id', function(req, res) {
    var id = req.params.id;
    console.log(id);
    db.contacts.findOne({_id:mongojs.ObjectId(id)}, function(err, docs){
        res.json(docs);

    } );
});

app.put('/contacts/:id', function(req, res){
    var id = req.params.id;
    console.log(req.body.name);
    db.contacts.findAndModify({query:{_id:mongojs.ObjectId(id)},
            update:{$set: {name: req.body.name, email: req.body.email, phone: req.body.phone}},
            new :true}, function(err, doc) {

            res.json(doc);
    });
});

app.listen(3000);
console.log("server running on 3000");
