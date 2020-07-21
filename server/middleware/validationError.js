function validationError(err,req,res,next){
    res.send({'message' : err.message});
} 

module.exports = validationError;