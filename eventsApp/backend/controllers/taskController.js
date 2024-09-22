// 'eventsApp/backend/controllers/taskController.js'

const sequelize = require('sequelize');
const Task = require('../models/Task');
const nodemailer = require('nodemailer');

const db = new sequelize('sql7731579', 'sql7731579', '4QiUGFnWPL', {
  host: 'sql7.freesqldatabase.com',
  dialect: 'mysql',
  port: 3306,
});

exports.createTask = async (req, res) => {
  try {
    const { text, assignedTo, deadline, priority } = req.body;
    const newTask = await Task.create({ text, assignedTo, deadline, priority });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, assignedTo, deadline, priority, completed } = req.body;
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    task.text = text;
    task.assignedTo = assignedTo;
    task.deadline = deadline;
    task.priority = priority;
    task.completed = completed;
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    await task.destroy();
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};

exports.sendTaskNotifications = async () => {
  try {
    const tasks = await Task.findAll({
      where: {
        deadline: {
          [sequelize.Op.lte]: new Date(Date.now() + 60 * 60 * 1000), // Tasks due in the next hour
        },
        completed: false,
      },
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
      },
    });

    tasks.forEach((task) => {
      const mailOptions = {
        from: 'your-email@gmail.com',
        to: task.assignedTo,
        subject: 'Task Reminder',
        text: `Reminder: The task "${task.text}" is due soon.`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(`Failed to send email to ${task.assignedTo}`, error);
        } else {
          console.log(`Email sent to ${task.assignedTo}: ${info.response}`);
        }
      });
    });
  } catch (error) {
    console.error('Failed to send task notifications', error);
  }
};

setInterval(exports.sendTaskNotifications, 60000);
