const user = require('../models/user')
const mail = require('../helpers/mail')
const jwt = require('jsonwebtoken')
const time = require('time')
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

exports.CreateAccount = (req, res) => {
    if (!req.body.email || !mail.validateEmail(req.body.email)) {
        res.send("please enter valid email").status(500)
    }

    var isEmailTaken
    user.findOne({ "mail": req.body.email }, (err, res) => {
        if (err) {
            res.send(err)
        }
        else {
            isEmailTaken = res
        }
    })
    if (isEmailTaken) {
        res.send('This email is already taken').status(400)
    }

    var insertData = new user({
        "name": req.body.name,
        "id": req.body.id,
        "email": req.body.email,
        "password": req.body.password,
        "jobTitle": req.body.jobTitle,
        "avatarColor": req.body.avatarColor,
        "role": req.body.role,
        "status": "PENDING"
    })
    payload = {
        "id": req.body.id,
        "firstname": req.body.firstname,
        "lastname": req.body.lastname,
        "email": req.body.password
    }
    const token = jwt.sign({ data: payload }, "rgukt123", { expiresIn: 60 * 60 })

    insertData.save((err) => {
        if (err) {
            res.send(err).status(400)
        }
        else {
            console.log(token)
            err = mail.sendingMail(req.body.id, req.body.email, token)
            if (err) {
                res.send(err).status(400)
            }
            else {
                res.send("Activation link sent to your mail").status(200)
            }
        }
    })


}

exports.Activate = (req, res) => {
    params = req.query
    jwt.verify(params.token, "rgukt123", (err, data) => {
        if (err) {
            res.send(err).status(400)
        }
        else {
            user.updateOne({ "id": params.id }, { $set: { "status": "ACTIVE" } }, (err, data) => {
                if (err) {
                    res.send(err).status(400)
                }
                else {
                    res.send('Your account is activated please login').status(200)
                }
            })
        }
    })
}

exports.Login = (req, res) => {

    id = req.body.id
    pwd = req.body.password
    user.findOne({ "id": id }, (err, data) => {
        if (err) {
            res.send(err).status(400)
        }
        else {
            const token = jwt.sign({ data: data }, pwd, { expiresIn: 60*60 })
            console.log(time.Date())
            io.on('connection', function (socket) {
                io.on(id,function(val){
                    console.log(id+"socket"+val)
                })
            });
               
            res.send(token).status(200)
        }
    })
}

exports.update = (req, res) => {
    user.update({ "id": req.body.id }, { $set: req.body }, (err, data) => {
        if (err) {
            res.status(400).send(err)
        }
        else {
            res.send('updated successfully').status(200)
        }
    })
}

exports.delete = (req, res) => {
    user.remove({ "id": req.body.id }, (err, data) => {
        if (err) {
            res.send(err).status(400)
        }
        else {
            res.send("deleted successfully").status(200)
        }
    })
}