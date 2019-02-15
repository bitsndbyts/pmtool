const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/PM', (err, db) => {
    if (err) {
        console.log("DB error", err)
    }
    else {
        console.log("db connection strarted")
    }
})
module.exports = mongoose