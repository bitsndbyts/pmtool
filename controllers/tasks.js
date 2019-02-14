const tasks = require('../models/tasks')
const jwt = require('jsonwebtoken')


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
                "startdate": req.body.startdate,
                "enddate": req.body.enddate,
                "assignedto": req.body.assignedto
            })
            console.log(taskData)
            taskData.save((err) => {
                if (err) {
                    res.send(err).status(400)
                }
                else{
                    res.send("task added").status(200)
                }
            
        })
    }
})
}