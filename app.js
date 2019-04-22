const express = require('express')
const bodyParser = require('body-parser')
const user = require('./routes/user')
const EventEmitter = require("./controllers/tasks").emitter

var app = express();
var http = require('http')
var server = http.createServer(app);
var io = require('socket.io')(server);


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/user', user)
app.use(function (req, res, next) {
    res.io = io;
    next();
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})
EventEmitter.on("CTL001", function () {
    console.log("CTL001 socket called")
})
EventEmitter.on("CTL002", function () {
    console.log("CTL002 socket called")
})
io.sockets.on('to server', function (data) {
    console.log(data)
})
io.sockets.emit('to server')
io.sockets.emit("connection")
server.listen(8000, () => {
    console.log('server is running on port 8000')
})
module.exports = { io: io, app: app, server: server }