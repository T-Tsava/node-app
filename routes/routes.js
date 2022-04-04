const express = require('express');
const Model = require('../models/TodoTask');
const Controller = require('../controller/tasksController');

const router = express.Router();

// POST Method
router.post('/tasks',
Controller.validate('createTask'),
Controller.postTask);

// Get All Method
router.get('/tasks', Controller.getAllTasks);
//Get by ID Method
router.get('/tasks/:id', Controller.getOneTask);

//Get by Name Method
router.get('/task/:taskName', Controller.getTaskByName);

//Update by ID Method
router.patch('/tasks/:id',
Controller.validate('updatebyid'),
Controller.updateTaskById);

//Delete by ID Method
router.delete('/tasks/:id', Controller.deleteTaskById);

//Delete Completed
router.delete('/tasks/', Controller.removeCompleted);

//Filter Tasks
router.get('/tasks/filter/:filter', Controller.getFiltered);

//Mark all tasks as completed
router.patch('/tasks/mark/', Controller.markAllCompleted);

module.exports = router;