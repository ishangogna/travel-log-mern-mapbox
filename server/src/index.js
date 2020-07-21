const express = require('express');
const router = require('../routes/api');
require('dotenv').config();


const app = express();

app.use(express.json());

app.use('/api', router);

app.listen(process.env.PORT,()=>{
    console.log(`listening @ ${process.env.PORT}`)
})

