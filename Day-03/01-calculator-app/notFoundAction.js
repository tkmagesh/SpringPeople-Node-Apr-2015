module.exports = function(req, res, next){
    console.log("not found action");
    res.statusCode = 404;
    res.end();
};
