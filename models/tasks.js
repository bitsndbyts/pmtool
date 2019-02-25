const mongoose = require('./mongo')
const time = require('time')

const TaskDetails = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    addedby: {
        type: String,
        required: true,
    },
    assignedto: {
        type: Array,
        required: true,
    },
    startdate: {
        type: Date,
        required: true,
    },
    enddate: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model("tasks", TaskDetails)