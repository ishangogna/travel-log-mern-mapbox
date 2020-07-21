const express = require('express');

const router = express.Router();

router.get('/',(req,res)=>{
    res.send({'type' : 'GET'});
})

router.post('/',(req,res)=>{
    res.send({'type' : 'POST'});
})
