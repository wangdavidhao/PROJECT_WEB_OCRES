const mongoose = require('mongoose');

//e0L37GH6i1w8WMhu
//mongodb+srv://david:e0L37GH6i1w8WMhu@cluster0.hblym.mongodb.net/<dbname>?retryWrites=true&w=majority

const db_url = 'mongodb+srv://david:e0L37GH6i1w8WMhu@cluster0.hblym.mongodb.net/dashboard_db?retryWrites=true&w=majority';
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