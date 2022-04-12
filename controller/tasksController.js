const express = require('express');
const Model = require('../models/TodoTask');
const UserModel = require('../models/User');
const {body, validationResult } = require('express-validator');

exports.validate = (method) => {
    switch (method) {
        case 'createTask' : {
            return [
                body('taskName', 'Task Name is not String').isString(),
                body('taskName', 'Task Name is not defined').exists(),
            ];
      }
        case 'updatebyid' : {
            return [
                body('taskName', 'Task Name is not String').isString(),
                body('taskName', 'Task Name is not defined').exists()
            ];
        }
    }
};

// POST Method
exports.postTask = async (req, res) => {
    try{
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
          }
        const data = new Model({
            taskName: req.body.taskName
        });
        const taskId = data.id;
        const newTask = await data.save();

        const updateUser = await UserModel.findByIdAndUpdate(
            '62541c09cd0d8717c90d754e',
            {
                $push :{ tasks : taskId}
            },
            { new: true, useFindAndModify: false},
        );
        res.send(`Task ${data} has been Added..`);
        //res.status(200).json(dataToSave);
    }
    catch(error){
        res.status(400).json({message: error.message});
    }
};

// Get All Method
exports.getAllTasks = async (req, res) => {
    try{
        const data = await Model.find();

        res.json(data);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

//Get by ID Method
exports.getOneTask = async(req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
          }

        const data = await Model.findById(req.params.id);

        res.json(data);


    }catch(error){
        res.status(404);
        res.send({
            code: 404,
            message: "Not found"
        });
    }
};

//Get by Name Method
exports.getTaskByName = async (req, res) => {

    try{
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
          }
        const {taskName} = req.params;
        const data = await Model.find();

        const task = data.filter(task => taskName == task.taskName);

        if(!task.length){
            res.status(404);
            res.send({
                code: 404,
                message: "Not found"
            });
        }else {
            res.send(task);
        }
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

//Update by ID Method
exports.updateTaskById = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        };

        const {id} = req.params;
        const updatedData = req.body;
        const options = { new : true};

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        );

        res.send(result);
    }catch (error) {
        res.status(404);
        res.send({
            code: 404,
            message: "Not found"
        });
    }
};

//Delete by ID Method
exports.deleteTaskById =  async (req, res) => {
    try {
        const {id} = req.params;
        const data = await Model.findByIdAndDelete(id);
        const updateUser = await UserModel.findByIdAndUpdate(
            '62541c09cd0d8717c90d754e',
            {
                $pull :{ tasks: id}
            },
            { new: true, useFindAndModify: false},
        );
        res.send(`Task ${data.taskName} has been deleted..`);
    }
    catch (error) {
        res.status(404);
        res.send({
            code: 404,
            message: "Not found"
        });
    }
};

// Filter Tasks
exports.getFiltered = async (req, res) => {
    try{
        const {filter} = req.params;
        const data = await Model.find();

        if(filter == 'active'){
            const task = data.filter(task => false == task.completed);
            res.send(task);
        }else if(filter == 'completed'){
            const task = data.filter(task => true == task.completed);
            res.send(task);
        }else if(filter == 'all') {
            res.send(data);
        }else {
            res.status(404);
            res.send({
                code: 404,
                message: "Filter Not found"
            });
        }
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

exports.markAllCompleted = async (req, res) => {
    try {
        const data = await Model.find();

        const taskTrue = data.filter(task => true == task.completed);

        const taskFalse = data.filter(task => false == task.completed);

        if(data.length == taskTrue.length){
            let options = { completed : false};
            let updatedData = await Model.updateMany(options);
            res.send(updatedData);
        }else {
            let options = { completed : true};
            let updatedData = await Model.updateMany(options);
            res.send(updatedData);
        }
    }catch (error) {
        console.log(error)
        res.status(400).json({ message : error.message });
    }
};

exports.removeCompleted = async (req, res) => {
    try {
        const data = await Model.find();

        const taskTrue = data.filter(task => true == task.completed);

        let options = { completed : true};
        await Model.deleteMany(options);
        res.send(taskTrue);
    }catch (error) {
        res.status(400).json({ message : error.message });
    }
};