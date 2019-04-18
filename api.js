const express = require('express');
const mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const app = express();
const ObjectID = require('mongodb').ObjectID;

mongo.connect(url, (err, client) => {
    if (err) {
        console.error(err);
        return 0;
    }
    const db = client.db('test');
    const users = db.collection('users');


    app.set('json spaces', 2);

    app.get('/users', function (req, res) {
        users.find().toArray((err, items) => {
            if (err) {
                res.send(err);
            }
            res.json(items);
        });
    });

    app.post('/users', function (req, res) {
        let item = req.body;
        users.save(item, function (err, item) {
            if(err){
                res.send(err);
            }
            res.send(item);
        })
    });

    app.get('/users/:id', function (req, res) {
        let id = req.params.id;
        users.findOne({_id: ObjectID(id) }, (err, item) => {
            if (err) {
                res.send(err);
            }
            res.json(item);
        })
    });

    app.delete('/users/:id', function (req, res) {
        let id = req.params.id;
        users.remove({_id: ObjectID(id) }, (err, item) => {
            if (err) {
                res.send(err);
            }
            res.json(item);
        })
    });

    app.put('/users/:id', function (req, res) {
        let updTask = req.body;
        let id = req.params.id;
        users.update({_id: ObjectID(id) }, updTask, (err, item) => {
            if (err) {
                res.send(err);
            }
            res.json(item);
        })
    });

    app.listen(3000, function () {
        console.log('REST api is listening on port 3000!');
    });
});

