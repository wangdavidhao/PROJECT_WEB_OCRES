//Imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

//ENV
require('dotenv').config();

//Import database
const db = require('./db/index');

//Config
const app = express();
const port = process.env.PORT || 9000;

//Middlewares
// app.use(cors()); test plus tard avec React
app.use(morgan('common'));
app.use(helmet());

app.use(bodyParser.json()); //Format JSON dans le body

//Imports différentes routes
const userRouter = require('./routes/user');
const ruleRouter = require('./routes/rule');

//Différentes routes
app.use('/user', userRouter);
app.use('/rule', ruleRouter);

//Port
app.listen(port, () => {
    console.log(`run on port ${port}`);
})

module.exports = app;
