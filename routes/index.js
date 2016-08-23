

var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');
var Movie = require('../app/controllers/movie');

module.exports = function(app){
    //预处理
    app.use(function(req,res,next){
        var _user = req.session.user;
        app.locals.user = _user;
        return next();
    });
    app.use('/',Index);  //主页
    app.use('/',User);  //用户相关
    app.use('/',Movie); //电影相关
}





