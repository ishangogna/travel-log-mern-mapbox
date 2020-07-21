const express = require('express');
const routes = require('../routes/api');
const routeNotFound = require('../middleware/routeNotFound');

require('dotenv').config();


const app = express();

app.use(express.json());

app.use('/api', routes);

//Middleware to handle requests which didnt end up in any of the routes in
//route handler.
app.use(routeNotFound);

app.listen(process.env.PORT,()=>{
    console.log(`listening @ ${process.env.PORT}`)
})

