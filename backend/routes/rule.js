const express = require('express');
const router = express.Router();

const userAuth = require('.././auth/authValidation'); 

const ruleController = require('../controllers/ruleController');

//CRUD
router.get('/', ruleController.getAllRules);

router.post('/', userAuth, ruleController.postNewRule);

router.put('/:id', ruleController.putExistingRule);

router.delete('/:id', userAuth, ruleController.deleteExistingRule);

module.exports = router;