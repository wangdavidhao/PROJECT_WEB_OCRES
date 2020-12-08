const express = require('express');
const router = express.Router();
const userController = require('.././controllers/userController');

//CRUD
router.get('/', userController.getAllUser);

//Register user
router.post('/register', userController.createUser);

//Connexion user
router.post('/login', userController.connectUser);


module.exports = router;
