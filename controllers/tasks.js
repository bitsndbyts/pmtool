const express = require('express')
const tasks = require('../models/tasks')
const jwt = require('jsonwebtoken')
var moment = require('moment');

const EventEmitter = require("events").EventEmitter;
var ee = new EventEmitter();

exports.AddTask = (req, res) => {
    token = req.headers['token']
    pwd = req.headers['password']
    jwt.verify(token, pwd, (err, data) => {
        if (err) {
            res.send(err).status(400)
        }
        else {
            decoded = jwt.decode(token)
            date = Date(req.body.startdate)
            var taskData = new tasks({
                "name": req.body.name,
                "addedby": decoded.data.id,
                "startdate":Date(req.body.startdate),
                "enddate": Date(req.body.enddate),
                "assignedto": req.body.assignedto
            })
            taskData.save((err) => {
                if (err) {
                    res.send(err).status(400)
                }
                else {
                    for (let i = 0; i < req.body.assignedto.length; i++) {
                        ee.emit(req.body.assignedto[i])
                    }
                    res.send("task added").status(200)
                }

            })
        }
    })
}

exports.CompleteTask = (req,res) =>{
    token = req.headers['token']
    pwd = req.headers['password']
    jwt.verify(token, pwd, (err, data) => {
        if (err) {
            res.send(err).status(400)
        }
        else {
            decoded = jwt.decode(token)
           tasks.updateOne({"name":req.body.name},{$set:{"status":"Completed"}},(err, data) => {
               if (err){
                   res.send(err).status(400)
               }
               else{
                   res.send("Task completed").status(200)
               }
           })
        }
    })
}

module.exports.emitter = ee