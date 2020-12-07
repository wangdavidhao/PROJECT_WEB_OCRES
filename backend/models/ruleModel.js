const mongoose = require('mongoose');


const rule = mongoose.Schema({
    content : String,


},{
    timestamps: true,
}
, {
    collection:'rules',
});

const Rule = mongoose.model('rule', rule);
module.exports = Rule;