const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const routes = require('../routes/api');

const routeNotFound = require('../middleware/routeNotFound');
const validationError = require('../middleware/validationError');
require('dotenv').config();

//connect to mongodb
mongoose.connect(process.env.DATABSE_URL);

const app = express();
app.use(cors());

app.use(express.json());

app.use('/api', routes);

app.use(validationError);

//Middleware to handle requests which didnt end up in any of the routes in
//route handler.
app.use(routeNotFound);

app.listen(process.env.PORT,()=>{
    console.log(`listening @ ${process.env.PORT}`)
})

