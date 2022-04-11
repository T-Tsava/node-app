const express = require('express');
const Controller = require('../controller/usersController');

const router = express.Router();

//follow REST API conventions
//A resource can be a singleton or a collection. Use nouns to represent resources
//For example, “tasks” is a collection resource and “task” is a singleton resource.
// review: https://restfulapi.net/resource-naming/

// POST Method
router.post('/',
Controller.validate('createUser'),
Controller.postUser);

// Get All Tasks
router.get('/', Controller.getAllUsers);

//Get Task by ID
router.get('/:id', Controller.getOneUser);

//Update by ID Method
router.patch('/:id',
Controller.validate('updatebyid'),
Controller.updateUserById);

module.exports = router;