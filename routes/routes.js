const express = require('express');
const Model = require('../models/TodoTask');
const Controller = require('../controller/tasksController');

const router = express.Router();

// POST Method
router.post('/post',
Controller.validate('createTask'),
Controller.postTask);

// Get All Method
router.get('/getall', Controller.getAllTasks);
//Get by ID Method
router.get('/getone/:id', Controller.getOneTask);

//Get by Name Method
router.get('/getbyname/:taskName', Controller.getTaskByName);

//Update by ID Method
router.patch('/update/:id',
Controller.validate('updatebyid'),
Controller.updateTaskById);

//Delete by ID Method
router.delete('/delete/:id', Controller.deleteTaskById);

//Delete Completed
router.delete('/deletecompleted/', Controller.removeCompleted);

//Get Completed Tasks
router.get('/filterTasks/:filter', Controller.getFiltered);

//add router for filtering the tasks by status
router.get('/getByStatus', Controller.getByStatus);

//Mark all tasks as completed
router.patch('/markAll/', Controller.markAllCompleted);

module.exports = router;