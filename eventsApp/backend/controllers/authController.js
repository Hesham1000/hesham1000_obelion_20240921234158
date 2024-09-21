// eventsApp/backend/controllers/authController.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { Op } = require('sequelize');
const User = require('../models/User');
const db = require('../db'); // Assuming you have a db file that initializes Sequelize with the provided SQL credentials

// JWT Secret key
const JWT_SECRET = 'your_jwt_secret_key';

// Login function
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Logout function
exports.logout = (req, res) => {
  // Invalidate the token (blacklisting, etc. can be done as per your strategy)
  res.json({ message: 'Logged out successfully' });
};

// Password recovery function
exports.passwordRecovery = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const resetToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'your_email@gmail.com',
        pass: 'your_email_password'
      }
    });

    const mailOptions = {
      from: 'your_email@gmail.com',
      to: email,
      subject: 'Password Recovery',
      text: `Please use the following token to reset your password: ${resetToken}`
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Password recovery email sent' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
