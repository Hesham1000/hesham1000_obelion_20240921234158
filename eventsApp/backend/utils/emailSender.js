// eventsApp/backend/utils/emailSender.js
const nodemailer = require('nodemailer');

// Email configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'youremail@gmail.com', // your email
    pass: 'yourpassword', // your email password
  },
});

// Send email function
const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: 'youremail@gmail.com', // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: text, //  body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = { sendEmail };
