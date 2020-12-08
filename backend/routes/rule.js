const express = require('express');
const router = express.Router();

const ruleModel = require('.././models/ruleModel');

const Joi = require('joi');

const userAuth = require('.././auth/authValidation'); 

const schema = Joi.object({
    content: Joi.string().required().max(500),
    debutDate: Joi.date(),
    endDate: Joi.date(),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
})

//CRUD
router.get('/', userAuth, (req, res) => {
    ruleModel.find((err, data) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    })
})

router.post('/', userAuth, (req, res) => {
    const rule = req.body;

    const newRule = new ruleModel(rule);
    newRule.save((err, date) => {
        res.status(200).send(newRule);
    })
    res.send(rule);
})

module.exports = router;