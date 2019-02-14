const express = require('express')
const Router = express.Router()
const user = require('../controllers/user')
const task = require('../controllers/tasks')


Router.post('/create', user.CreateAccount)
Router.get('/activate', user.Activate)
Router.post('/login', user.Login)
Router.post('/addtask', task.AddTask)
Router.put('/update', user.update)
Router.delete('/delete', user.delete)
module.exports = Router 