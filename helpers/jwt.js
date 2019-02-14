// const jwt = require('jsonwebtoken')
// const user =  require('../models/user')
// const bcrypt =  require('bcrypt')
// exports.signup = (id, firstname, lastname, password)=> {
//     const user = user.findById(id)
//     const common = {
//       firstname,
//       lastname,
//       name: `${firstname} ${lastname}`,
//       avatarColor: randomChoice(avatarColors),
//       password: await bcrypt.hash(password, 10),
//       status: 'Active'
//     }
//     await user.save()
//     const token = jwt.sign({id: user.id, email: user.email},"rgukt123")
//     return {token, user}
//   }
//  // obj = jwt.signup(req.body.id,req.body.firstname,req.body.lastname,req.body.password)