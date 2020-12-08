const RuleModel = require('../models/ruleModel');

const ruleModel = require('.././models/ruleModel');

const Joi = require('joi');

const schema = Joi.object({
    content: Joi.string().required().max(500),
    debutDate: Joi.date(),
    endDate: Joi.date(),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
})


const getAllRules = (req, res) => {
    ruleModel.find((err, data) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    })
};

const postNewRule = (req, res) => {
    const rule = req.body;

    const newRule = new ruleModel(rule);
    newRule.save((err, date) => {
        res.status(200).send(newRule);
    })
    res.send(rule);
};

module.exports = {
    getAllRules,
    postNewRule,
}