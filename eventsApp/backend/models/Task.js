// File: eventsApp/backend/models/Task.js

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sql7731579', 'sql7731579', '4QiUGFnWPL', {
  host: 'sql7.freesqldatabase.com',
  dialect: 'mysql',
  port: 3306,
  logging: false,
});

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  priority: {
    type: DataTypes.ENUM,
    values: ['low', 'medium', 'high'],
    defaultValue: 'low',
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  assignedTo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'Tasks',
  timestamps: false,
});

sequelize.sync()
  .then(() => console.log("Tasks table has been successfully created, if one doesn't exist"))
  .catch(error => console.log("This error occurred: ", error));

module.exports = Task;
