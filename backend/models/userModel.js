const mongoose = require('mongoose');

//On crée un objet required pour les String car on va l'utiliser plusieurs fois par la suite
const requiredString = {
    type:String,
    required:true,
    trim:true,
}

//Schema de user
const user = mongoose.Schema({
    mail: {
        ...requiredString,
        lowercase:true,
        unique :true,
        
    },
    password: requiredString,
    order:{
        type:Number,
        required: true,
    }
}, {
    collection: 'users'
});

const userModel = mongoose.model('users', user); 

module.exports = userModel;