//Imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

//Import database
const db = require('./db/index');

//Config
const app = express();
const port = process.env.PORT || 3000;

//Imports différentes routes
const usersRouter = require('./routes/users');

//Différentes routes
app.use('/users', usersRouter);

//Port
app.listen(port, () => {
    console.log(`run on port ${port}`);
})

module.exports = app;
