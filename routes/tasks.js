var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('localhost:27017/mytasklist_pavan', ['tasks']);

//Get All Tasks
router.get('/tasks', function(req, res, next){
    db.tasks.find(function(err, tasks){
        if(err) {
            res.send("Oops Something went wrong!!!");
        }
        res.json(tasks);
    });
});

//Get only one task
router.get('/task/:id', function(req, res, next){
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)},function(err, task){
        if(err) {
            res.send("Oops Something went wrong!!!");
        }
        res.json(task);
    });
});

//delete a task
router.delete('/task/:id', function(req, res, next){
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)},function(err, task){
        if(err) {
            res.send("Oops Something went wrong!!!");
        }
        res.json(task);
    });
});

//Save a task
router.post('/task', function(req, res, next){
    var task = req.body;
    if(!task.title || task.isDone + '') {
        res.status(400);
        res.json({
            "error" : "Bad Data"
        });
    } else {
        db.tasks.save(task,function(err, task){
            if(err) {
                res.send("Oops Something went wrong!!!");
            }
            res.json(task);
        });
    }
});

//Update a task
router.put('/task', function(req, res, next){
    var task = req.body;
    var updateTask = {};

    db.tasks.update({_id: mongojs.ObjectId(req.params.id)},updateTask,{},function(err, task){
        if(err) {
            res.send("Oops Something went wrong!!!");
        }
        res.json(task);
    });
});
module.exports = router;