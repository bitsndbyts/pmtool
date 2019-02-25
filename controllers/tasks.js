const express = require('express')
const tasks = require('../models/tasks')
const jwt = require('jsonwebtoken')
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
            var taskData = new tasks({
                "name": req.body.name,
                "addedby": decoded.data.id,
                "startdate": Date(req.body.startdate),
                "enddate": Date(req.body.enddate),
                "assignedto": req.body.assignedto
            })
            taskData.save((err) => {
                if (err) {
                    res.send(err).status(400)
                }
                else {
                    ee.addListener("First event", function (data) {
                        console.log("first listener")
                    })
                    for (let i = 0; i < req.body.assignedto.length; i++) {
                        ee.emit(req.body.assignedto[i])
                    }
                    res.send("task added").status(200)
                }

            })
        }
    })
}

module.exports.emitter = ee