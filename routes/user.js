const express = require('express')
const Router = express.Router()
const user = require('../controllers/user')
const task = require('../controllers/tasks')

/**
* @api {get} /keys/seed To get seeds for generate keys.
* @apiName getSeeds
* @apiGroup Sentinel-Tendermint
* @apiSuccessExample Response:
{
* garden sunset night final child popular fall ostrich amused diamond lift stool useful brisk very half rice evil any behave merge shift ring chronic
* }
*/
Router.post('/create', user.CreateAccount)
Router.get('/activate', user.Activate)
Router.post('/login', user.Login)
Router.delete('/delete', user.delete)
Router.put('/update', user.update)

Router.post('/addtask', task.AddTask)
Router.put('/complete',task.CompleteTask)


module.exports = Router 
