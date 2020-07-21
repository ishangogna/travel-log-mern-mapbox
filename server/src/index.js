const express = require('express');
const mongoose = require('mongoose')
const routes = require('../routes/api');

const routeNotFound = require('../middleware/routeNotFound');
require('dotenv').config();

//connect to mongodb
mongoose.connect(process.env.DATABSE_URL);

const app = express();

app.use(express.json());

app.use('/api', routes);

//Middleware to handle requests which didnt end up in any of the routes in
//route handler.
app.use(routeNotFound);

app.listen(process.env.PORT,()=>{
    console.log(`listening @ ${process.env.PORT}`)
})

