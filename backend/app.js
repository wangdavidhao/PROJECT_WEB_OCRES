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
const port = process.env.PORT || 3000;

//Middlewares
app.use(cors());
app.use(morgan('common'));
app.use(helmet());

//Imports différentes routes
const userRouter = require('./routes/user');

//Différentes routes
app.use('/user', userRouter);

//Port
app.listen(port, () => {
    console.log(`run on port ${port}`);
})

module.exports = app;
