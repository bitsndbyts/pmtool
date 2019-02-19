const mongoose = require('./mongo')

const UserDetails = new mongoose.Schema({
  name: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
  },
  jobTitle: {
    type: String,
    default: ''
  },
  avatarColor: String,
  role: String,
  status: String
})

module.exports = mongoose.model("users", UserDetails)