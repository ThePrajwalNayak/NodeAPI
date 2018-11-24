const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Activity = require('./models/activity.js');

const dbConnection = "mongodb://accountUser:password@localhost:27017/chitchat";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next){
    console.log('We are the router, move next');
    next();
});

app.get('/', function(req, res){
    res.json({ message : 'You did a great job!'});
});

app.get('/api/activities', function(req, res){
    console.log('Get Activity');
    Activity.find({}).then(eachOne => {
        res.json(eachOne);
    });
});

app.post('/api/activities', function(req, res){
    console.log('Post Activity');
    Activity.create({
        activity_name : req.body.activity_name,
        quantity : req.body.quantity
    }).then( activity => {
        res.json(activity);
    })
});

app.get('/api/activities/:activity_id', function(req, res){
    console.log('Get Activity By Id');
    Activity.findById(req.params.activity_id).then(function(err, Activity){
        if(err){
            res.send(err);
        }
        res.send(Activity);
    });
});

app.put('/api/activities/:activity_id', function(req, res){
    console.log('Put Activity');
    Activity.findOneAndUpdate({
        activity_name : req.body.activity_name,
        quantity : req.body.quantity
    }).then(activity => {
        res.json(activity);
    });
});

app.delete('/api/activities/:activity_id', function(req, res){
    console.log('Delete Activity By Id');
    Activity.findOneAndRemove({
        activity_name : req.body.activity_name,
        quantity : req.body.quantity
    }).then(activity => {
        res.json(activity);
    })
});

mongoose.Promise = require('bluebird');
mongoose.connect(dbConnection);

app.listen(3000);
console.log('Starting application');