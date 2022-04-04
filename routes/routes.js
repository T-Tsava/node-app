const express = require('express');
const Model = require('../models/TodoTask');
const Controller = require('../controller/tasksController');

const router = express.Router();

//follow REST API conventions
//A resource can be a singleton or a collection. Use nouns to represent resources
//For example, “tasks” is a collection resource and “task” is a singleton resource.
// review: https://restfulapi.net/resource-naming/

// POST Method
router.post('/post', Controller.postTask);

// Get All Method
router.get('/getall', Controller.getAllTasks);
//Get by ID Method
router.get('/getone/:id', Controller.getOneTask);

//Get by Name Method
router.get('/getbyname/:taskName', Controller.getTaskByName);

//Update by ID Method
router.patch('/update/:id', Controller.updateTaskById);

//Delete by ID Method
router.delete('/delete/:id', Controller.deleteTaskById);

//add router for completedTask
//add router for filtering the tasks by status
//add router for mark all tasks as completed

module.exports = router;