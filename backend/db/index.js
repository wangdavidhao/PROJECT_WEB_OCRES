const mongoose = require('mongoose');
require('dotenv').config();

//e0L37GH6i1w8WMhu
//mongodb+srv://david:e0L37GH6i1w8WMhu@cluster0.hblym.mongodb.net/<dbname>?retryWrites=true&w=majority

const db_url = process.env.DATABASE_URL;
mongoose.connect(db_url, {
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
});
//Deprecated

const db = mongoose.connection;

db.once('open', () => {
    console.log('Connexion réussie');
});

module.exports = db;