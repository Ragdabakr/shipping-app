const nodemailer = require('nodemailer');
import env from '../env';
import dotenv from 'dotenv';
dotenv.config();
// import Logger from '../services/logger_service';
// const logger = new Logger('sendMail');

const sendEmail = (to,subject,body)=>{    
var transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: process.env.HOTMAIL,
    pass: process.env.PASS
  }
});

var mailOptions = {
  from: process.env.HOTMAIL,
  to: to,
  subject: subject,
  text: body
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});  
}

export {
    sendEmail
}