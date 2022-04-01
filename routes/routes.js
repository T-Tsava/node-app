const express = require('express');
const Model = require('../models/TodoTask');
const Controller = require('../controller/tasksController');

const router = express.Router();

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

module.exports = router;