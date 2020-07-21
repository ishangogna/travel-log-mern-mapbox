function routeNotFound (req,res,next) {
    res.send({'message' : 'this route does not exist.'})
}

module.exports = routeNotFound;