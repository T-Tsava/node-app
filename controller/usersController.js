const Model = require('../models/User');
const TaskModel = require('../models/TodoTask');
const {body, validationResult } = require('express-validator');



exports.validate = (method) => {
    switch (method) {
        case 'createUser' : {
            return [
                body('firstName', 'firstName is not String').isString(),
                body('firstName', 'firstName is not defined').exists(),
                body('lastName', 'lastName is not String').isString(),
                body('lastName', 'lastName is not defined').exists(),
                body('email', 'email is not String').isEmail(),
                body('email', 'email is not defined').exists(),
                body('phone', 'phone is not String').isString(),
                body('phone', 'phone is not defined').exists(),
                body('password', 'phone is not String').isString(),
                body('password', 'phone is not defined').exists(),
                body('email').custom((value) => {
                    return Model.findOne({email:value}).then(user => {
                        if(user){
                            return Promise.reject('Email Already Exists.');
                        }
                    });
                }),
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

// User Login
exports.userLogin = async(req, res) => {
    try {
        const { email } = req.body.loginCredentials;
        const { password } = req.body.loginCredentials;
        const data = await Model.findOne({email:email,password:password});

        if (!data) {
            res.status(400).json({ errors: errors.array() });
            return;
          }
        res.json(data);


    }catch(error){
        console.log('here');
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
