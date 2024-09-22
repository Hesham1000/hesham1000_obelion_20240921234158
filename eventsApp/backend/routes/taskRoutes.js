// file path: 'eventsApp/backend/routes/taskRoutes.js'
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Create a new task
router.post('/tasks', taskController.createTask);

// Get all tasks
router.get('/tasks', taskController.getAllTasks);

// Get a single task by ID
router.get('/tasks/:id', taskController.getTaskById);

// Update a task by ID
router.put('/tasks/:id', taskController.updateTask);

// Delete a task by ID
router.delete('/tasks/:id', taskController.deleteTask);

// Get tasks with filters (status, search query, etc.)
router.get('/tasks/filter', taskController.getFilteredTasks);

// Send notifications and reminders for tasks
router.post('/tasks/notify', taskController.sendNotifications);

module.exports = router;
