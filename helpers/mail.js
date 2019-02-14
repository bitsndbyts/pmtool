const nodemailer = require('nodemailer')

exports.validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase())
}

exports.sendingMail = (id, mail,token, cb) => {

  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'prashanthjangam1@gmail.com',
      pass: 'badripavani12345'
    }
  });

  const url = "http://localhost:8000"
  const text = `
Hi,
Thank you for choosing me! 
You are just one click away from completing your account registration.

Confirm your email:\n
${url}/user/activate?token=${token}&id=${id}
`
  var mailOptions = {
    from: "prashanthjangam1@gmail.com",
    to: mail,
    text: text,
    subject: 'Please complete your registration'
  }
  transporter.sendMail(mailOptions, function (error, info) {

    if (error) {
      console.log(error);
      cb(error)
    } else {
      console.log('Email sent: ' + info.response);
      cb(nil)
    }
  });
} 