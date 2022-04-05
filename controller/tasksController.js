const express = require('express');
const Model = require('../models/TodoTask');
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
            res.status(422).json({ errors: errors.array() });
            return;
          }
        const data = new Model({
            taskName: req.body.taskName
        });

        const dataToSave = data.save();
        res.status(200).json(dataToSave);
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
            res.status(422).json({ errors: errors.array() });
            return;
          }

        const data = await Model.findById(req.params.id);
        res.json(data);


    }catch(error){
        res.status(500).json({message: error.message});
    }
};

//Get by Name Method
exports.getTaskByName = async (req, res) => {
    try{
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
          }
        const {taskName} = req.params;
        const data = await Model.find();

        const task = data.filter(task => taskName == task.taskName);
        res.send(task);
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
            res.status(422).json({ errors: errors.array() });
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
        res.status(400).json({ message : error.message});
    }
};

//Delete by ID Method
exports.deleteTaskById =  async (req, res) => {
    try {
        const {id} = req.params;
        const data = await Model.findByIdAndDelete(id);
        res.send(`Document with ${data.name} has been deleted..`);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get Completed
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
        }else {
            res.send(data);
        }
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

exports.getByStatus = async (req, res) => {
    try{
        const data = await Model.find();

        const task = data.filter(task => true == task.status);

        res.send(task);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

exports.markAllCompleted = async (req, res) => {
    try {
        const data = await Model.find();

        const task = data.filter(task => true == task.completed);

        if(data.length != task.length){
            let options = { completed : true};
            const result = await Model.updateMany(
                options
            );
            res.send(result);
        }else {
            let options = { completed : false};
            const result = await Model.updateMany(
                options
            );
            res.send(result);
        }
    }catch (error) {
        res.status(400).json({ message : error.message});
    }
};

exports.removeCompleted = async (req, res) => {
    try {
        let options = { completed : true};
        const result = await Model.deleteMany(
            options
        );
        res.send(result);
    }catch (error) {
        res.status(400).json({ message : error.message});
    }
};