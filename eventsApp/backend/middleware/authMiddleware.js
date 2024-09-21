// eventsApp/backend/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { User } = require('../models/User');
const { Op } = require('sequelize');

const secret = 'your_jwt_secret_key'; // Replace with your actual secret key
const tokenExpiration = '1h';

const authenticateUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: tokenExpiration });
        return res.json({ token });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const logoutUser = (req, res) => {
    // Invalidate the token (optional, depending on your implementation)
    return res.json({ message: 'Logged out successfully' });
};

const recoverPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: '15m' });
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'your_email@gmail.com', // Replace with your email
                pass: 'your_email_password' // Replace with your email password
            }
        });

        const mailOptions = {
            from: 'your_email@gmail.com', // Replace with your email
            to: user.email,
            subject: 'Password Recovery',
            text: `Please use the following token to reset your password: ${token}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ message: 'Email sending failed' });
            }
            return res.json({ message: 'Password recovery email sent' });
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    authenticateUser,
    logoutUser,
    recoverPassword
};
