var express = require('express');
var app  = express();
//var MongoClient = require('mongodb').MongoClient;
//var url = 'mongodb://localhost:27017/questnetz';
var mongojs = require('mongojs');
var db = mongojs('questnetz', ['surveys']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
//app.use();
app.get('/getsurveys', function(req, res){
    console.log("Received a GET request")
    db.surveys.find( function(err, docs) {
        console.log(docs);
        res.json(docs);
        })

});
app.post('/getsurveys', function(req, res){
    db.surveys.insert(req.body, function(err, doc) {
        res.json(doc);

    });
});

app.delete('/getsurveys/:id', function(req,res){
    var id = req.params.id;
    console.log(id);
    db.surveys.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
        console.log("is removed")
        res.json(doc);
    });


});


app.get('/getsurveys/:id', function(req, res) {
    var id = req.params.id;
    console.log(id);
    db.surveys.findOne({_id:mongojs.ObjectId(id)}, function(err, docs){
        res.json(docs);

    } );
});

app.put('/getsurveys/:id', function(req, res){
    var id = req.params.id;
    console.log(req.body.name);
    db.surveys.findAndModify({query:{_id:mongojs.ObjectId(id)},
            update:{$set: {IDcode: req.body.IDcode, name: req.body.name, region: req.body.region, active: req.body.active}},
            new :true}, function(err, doc) {

            res.json(doc);
    });
});

app.listen(3000);
console.log("server running on 3000");
