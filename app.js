const express = require('express')
const bodyParser = require('body-parser')
const user = require('./routes/user')
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/user',user)
app.listen(8000,()=>{
    console.log('server is running on port 8000')
})