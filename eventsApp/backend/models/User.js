// File: eventsApp/backend/models/User.js

const { Sequelize, DataTypes } = require('sequelize');

// Database credentials
const sequelize = new Sequelize('sql7731579', 'sql7731579', '4QiUGFnWPL', {
  host: 'sql7.freesqldatabase.com',
  dialect: 'mysql',
  port: 3306
});

// Define User model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Add any additional fields here
}, {
  tableName: 'users',
  timestamps: false // Disable timestamps
});

module.exports = User;
