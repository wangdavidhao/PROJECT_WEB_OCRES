const mongoose = require('mongoose');
require('dotenv').config();


const db_url = process.env.DATABASE_URL;
mongoose.connect(db_url, {
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify: false,
});
//Deprecated

const db = mongoose.connection;

db.once('open', () => {
    console.log('Connexion database réussie');
});

module.exports = db;