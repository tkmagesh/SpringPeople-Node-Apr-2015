var path = require('path'),
    fs = require('fs');

var staticResourceExtns = [".html", ".txt", ".js", ".jpg",".png",".ico",".css"]
function isStatic(resource){
    var resourceExtn = path.extname(resource);
    return staticResourceExtns.indexOf(resourceExtn) !== -1;
}
module.exports = {
    addStaticResourceExtn : function(extn){
        staticResourceExtns.push(extn);
    },
    process : function(req, res, next){
        if (isStatic(req.url.pathname)){
            console.log('serveStatic');
            var resource = path.join(__dirname , req.url.pathname);
            if (fs.existsSync(resource)){
                fs.createReadStream(resource, {encoding : "utf8"}).pipe(res);
            } else {
                res.statusCode = 404;
                res.end()
            }
        } else {
            next();
        }
    }
};
