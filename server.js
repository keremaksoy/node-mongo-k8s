const express = require('express');
const app = express();
const config = require('./db');
const PORT = 4000;
var MongoClient = require('mongodb').MongoClient;
var db;

MongoClient.connect(config.DB, function (err, database) {
    if (err) {
        console.log(`connection string : ${config.DB}`)
        console.log(`error on database connection : ${err}`)
    }
    else {
        db = database;
        console.log('connected !!!');
        app.listen(PORT);
        console.log(`Listening on port ${PORT}`);

        db.collection('mycollection').insertOne({ text: "Hello World !" }, function (error, response) {
            if (error) {
                console.log('Error while insert operation');
            } else {
                console.log('inserted : ', response.ops[0]);
            }
        });
    }
});

app.get("/", function (req, res) {
    db.collection('mycollection').findOne().then(function (data) {
        res.send(data["text"]);
    }).catch((err) => {
        res.send(JSON.stringify(err));
    });
});