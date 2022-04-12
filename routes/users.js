const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Controller = require('../controller/usersController');

const router = express.Router();

//follow REST API conventions
//A resource can be a singleton or a collection. Use nouns to represent resources
//For example, “tasks” is a collection resource and “task” is a singleton resource.
// review: https://restfulapi.net/resource-naming/

// POST Method
// router.post('/',
// Controller.validate('createUser'),
// Controller.postUser);

router.post(
    '/signup',
    passport.authenticate('signup', { session: false }),
    async (req, res, next) => {
      res.json({
        message: 'Signup successful',
        user: req.user
      });
    }
  );

// router.post(
// '/login',
// async (req, res, next) => {
//     passport.authenticate(
//     'login',
//     async (err, user, info) => {
//         try {
//         if (err || !user) {
//             const error = new Error('An error occurred.');

//             return next(error);
//         }

//         req.login(
//             user,
//             { session: false },
//             async (error) => {
//             if (error) return next(error);

//             const body = { _id: user._id, email: user.email };
//             const token = jwt.sign({ user: body }, 'TOP_SECRET');

//             return res.json({ token });
//             }
//         );
//         } catch (error) {
//         return next(error);
//         }
//     }
//     )(req, res, next);
// }
// );
// Get All Users
router.get('/',
Controller.getAllUsers);

//Get User by ID
router.get('/:id', Controller.getOneUser);

// //Login User
// router.post('/login/', Controller.userLogin);

//Update by ID Method
router.patch('/:id',
Controller.validate('updatebyid'),
Controller.updateUserById);

module.exports = router;