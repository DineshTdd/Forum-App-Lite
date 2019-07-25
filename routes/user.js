const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();
console.log("hi from user route");

router.post('/api/user/signup', userController.createUser);

router.post('/api/user/login', userController.userLogin);


module.exports = router;
