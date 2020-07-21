const express = require('express');
const LogEntry = require('../models/logEntry');

const router = express.Router();

router.get('/',(req,res,next)=>{
    LogEntry.find({})
    .then(logs => res.send(logs))
    .catch(next)
})

router.post('/',(req,res,next)=>{
    LogEntry.create(req.body)
    .then(log => res.send(log))
    .catch(next)
})

module.exports = router;
