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
    newRule.save((err, data) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(newRule);
        }
    })
};

const putExistingRule = (req, res) => {
    const {id} = req.params;
    const content = req.body.content;
    const debutDate = req.body.debutDate;
    const endDate = req.body.endDate;
    ruleModel.findByIdAndUpdate(id, {'content': content, 'debutDate': debutDate, 'endDate': endDate}, (err, data) =>{
        if (err){
            res.send(err);
        }
        else{
            res.send(data);
        }
    });
}

const deleteExistingRule = (req, res) => {
    const {id} = req.params;
    ruleModel.findByIdAndDelete(id, (err, data) =>{
        if (err){
            res.send(err);
        }
        else{
            res.send(data);
        }
    });
}


module.exports = {
    getAllRules,
    postNewRule,
    putExistingRule,
    deleteExistingRule,
}