const Model = require('../models/User');
const TaskModel = require('../models/TodoTask');
const {body, validationResult } = require('express-validator');



exports.validate = (method) => {
    switch (method) {
        case 'createUser' : {
            return [
                body('addUser.firstName', 'firstName is not String').isString(),
                body('addUser.firstName', 'firstName is not defined').exists(),
                body('addUser.lastName', 'lastName is not String').isString(),
                body('addUser.lastName', 'lastName is not defined').exists(),
                body('addUser.email', 'email is not String').isEmail(),
                body('addUser.email', 'email is not defined').exists(),
                body('addUser.phone', 'phone is not String').isString(),
                body('addUser.phone', 'phone is not defined').exists(),
                body('addUser.password', 'phone is not String').isString(),
                body('addUser.password', 'phone is not defined').exists(),
                body('addUser.email').custom((value) => {
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

// POST Method
exports.postUser = async (req, res) => {
    try{
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
          }

        const data = new Model({
            firstName: req.body.addUser.firstName,
            lastName: req.body.addUser.lastName,
            phone: req.body.addUser.phone,
            email: req.body.addUser.email,
            password: req.body.addUser.password
        });

        const dataToSave = data.save();
        res.send(`User ${data} has been Added..`);
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
