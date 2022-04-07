const express = require('express');
const Model = require('../models/TodoTask');
const Controller = require('../controller/tasksController');

const router = express.Router();

//follow REST API conventions
//A resource can be a singleton or a collection. Use nouns to represent resources
//For example, “tasks” is a collection resource and “task” is a singleton resource.
// review: https://restfulapi.net/resource-naming/

// POST Method
router.post('/tasks',
Controller.validate('createTask'),
Controller.postTask);

// Get All Tasks
router.get('/tasks', Controller.getAllTasks);

//Get Task by ID
router.get('/tasks/:id', Controller.getOneTask);

//Get by Name
router.get('/task/:taskName', Controller.getTaskByName);

//Update by ID Method
router.patch('/tasks/:id',
Controller.validate('updatebyid'),
Controller.updateTaskById);

//Delete by ID Method undefined
router.delete('/tasks/:id', Controller.deleteTaskById);

//Delete Completed
router.delete('/tasks/', Controller.removeCompleted);

//Filter Tasks
router.get('/tasks/filter/:filter', Controller.getFiltered);

//Mark all tasks as completed
router.patch('/tasks/', Controller.markAllCompleted);

module.exports = router;