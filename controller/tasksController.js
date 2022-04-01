const express = require('express');
const Model = require('../models/TodoTask');
// POST Method
exports.postTask = async (req, res) => {
    const data = new Model({
        taskName: req.body.taskName
    });

    try{
        const dataToSave = data.save();
        res.status(200).json(dataToSave)
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
};

// Get All Method
exports.getAllTasks = async (req, res) => {
    try{
        const data = await Model.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
};
//Get by ID Method
exports.getOneTask = async(req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data);
    }catch(error){
        res.status(500).json({message: error.message})
    }
};

//Get by Name Method
exports.getTaskByName = async (req, res) => { 
    try{
        const {taskName} = req.params
        const data = await Model.find();
        
        
        //const responseTemp = res.json(data);
        const task = data.filter(task => taskName == task.taskName)

         res.send(task)

    }
    catch(error){
        res.status(500).json({message: error.message})
    }
};

//Update by ID Method
exports.updateTaskById = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new : true};

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result);
    }catch (error) {
        res.status(400).json({ message : error.message})
    }
};

//Delete by ID Method
exports.deleteTaskById =  async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
};