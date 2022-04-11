const Model = require('../models/User');
const TaskModel = require('../models/TodoTask');
const {body, validationResult } = require('express-validator');

exports.validate = (method) => {
    switch (method) {
        case 'createUser' : {
            return [
                body('firstName', 'firstName is not String').isString(),
                body('firstName', 'firstName is not defined').exists(),
            ];
      }
        case 'updatebyid' : {
            return [
                body('firstName', 'firstName is not String').isString(),
                body('firstName', 'firstName is not defined').exists()
            ];
        }
    }
};

// POST Method
exports.postUser = async (req, res) => {
    try{
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
          }
        const data = new Model({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            email: req.body.email
        });

        const dataToSave = data.save();
        res.send(`Task ${data} has been Added..`);
    }
    catch(error){
        res.status(400).json({message: error.message});
    }
};

// Get All Method
exports.getAllUsers = async (req, res) => {
    try{
        const data = await Model.find().populate('tasks');
        res.json(data);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

//Get by ID Method
exports.getOneUser = async(req, res) => {
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

//Update by ID Method
exports.updateUserById = async (req, res) => {
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
