const mongoose = require('mongoose');


const rule = mongoose.Schema({
    content : String,
    debutDate: Date,
    endDate: Date,
},{
    timestamps: true, //Pour createdAt et updatedAt
}
, {
    collection:'rules',
});

const Rule = mongoose.model('rule', rule);
module.exports = Rule;